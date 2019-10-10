import { types, getEnv, onSnapshot } from 'mobx-state-tree';
import { promisedComputed } from 'computed-async-mobx';

const electron = require('electron');
const mime = require('mime-types');
const { convertMediaToDataurl } = require('../utils/dataurl');
// Renderer process has to get `app` module via `remote`.
const USER_DATA_PATH = (electron.app || electron.remote.app).getPath(
  'userData',
);

const EditorSettings = types.model({
  previewWidth: 4,
});

const ThumborSettings = types
  .model({
    host: '',
    key: '',
  })
  .actions(self => ({
    changeHost(host) {
      self.host = host;
    },
    changeKey(key) {
      self.key = key;
    },
  }));

export const WorkspaceSettings = types
  .model({
    thumbor: types.optional(ThumborSettings, {}),
    editor: types.optional(EditorSettings, {}),
    currentStory: '',
  })
  .actions(self => ({
    changeStory(story) {
      self.currentStory = story;
    },
    afterCreate() {
      const { fileManager } = getEnv(self);
      onSnapshot(self, fileManager.write.bind(fileManager));
    },
  }));

// For responsive feature images.
const featureRenditions = [
  { w: 320, h: 568, scale: 1 },
  { w: 320, h: 568, scale: 2 },
  { w: 375, h: 667, scale: 1 },
  { w: 375, h: 667, scale: 2 },
  { w: 768, h: 1024, scale: 1 },
  { w: 768, h: 1024, scale: 2 },
  { w: 1280, h: 800, scale: 1 },
  { w: 1280, h: 800, scale: 2 },
  { w: 1920, h: 1080, scale: 1 },
  { w: 1920, h: 1080, scale: 2 },
];

// For images within text
const contentRenditions = [
  { w: 360, h: 0, scale: 1 },
  { w: 360, h: 0, scale: 2 },
];

const Media = types
  .model({
    path: '',
    credits: '',
  })
  .actions(self => ({
    uploadFile(systemPath, name) {
      const { fileManager } = getEnv(self);
      const uploadPath = fileManager.importMedia(systemPath, name);
      self.path = uploadPath;
    },
  }))
  .views(self => {
    const dataUrlPromise = promisedComputed('', async () => {
      const response = await convertMediaToDataurl(self.path);
      return response;
    });
    return {
      get mimeType() {
        return mime.lookup(self.path);
      },
      get preview() {
        if (self.mimeType) {
          return dataUrlPromise.get();
        }
        return '';
      },
    };
  });

function generateImageViews(imageRenditions) {
  return types.model({}).views(self => ({
    get renditions() {
      if (self.path === '') {
        return [];
      }
      const thumbor = getEnv(self).thumbor;
      return imageRenditions.map(rendition => {
        const thumborUrl = thumbor
          .setImagePath(self.path.substr(USER_DATA_PATH.length + 1))
          .resize(
            rendition.w * rendition.scale,
            rendition.h * rendition.scale,
          )
          .smartCrop()
          .buildUrl();

        return { ...rendition, thumborUrl };
      });
    },
  }));
}
const ContentImageViews = generateImageViews(contentRenditions);
const FeatureImageViews = generateImageViews(featureRenditions);

const ContentImage = types.compose(
  Media,
  ContentImageViews,
);

const FeatureImage = types.compose(
  Media,
  FeatureImageViews,
);

export const TextImageItem = types
  .model({
    title: '',
    body: '',
    image: types.optional(ContentImage, {}),
    align: types.optional(
      types.enumeration(['left', 'center', 'right']),
      'left',
    ),
  })
  .actions(self => ({
    changeAlignment(align) {
      self.align = align;
    },
    changeTitle(title) {
      self.title = title;
    },
    changeBody(body) {
      self.body = body;
    },
  }));

const HeaderItem = types
  .model({
    title: '',
    subtitle: '',
  })
  .actions(self => ({
    changeTitle(title) {
      self.title = title;
    },
    changeSubtitle(subtitle) {
      self.subtitle = subtitle;
    },
  }));

const GeneralWrittenItem = types.compose(
  types
    .model({
      body: '',
    })
    .actions(self => ({
      changeBody(body) {
        self.body = body;
      },
    })),
  HeaderItem,
);

export const CentredText = types.compose(
  types
    .model({
      type: types.literal('CentredText'),
      light: true,
      snippets: types.array(TextImageItem),
    })
    .actions(self => ({
      toggleLight() {
        self.light = !self.light;
      },
      addSnippet() {
        self.snippets.push(TextImageItem.create());
      },
    })),
  GeneralWrittenItem,
);

export const ImageBackground = types.compose(
  types.model({
    type: types.literal('ImageBackground'),
    image: types.optional(FeatureImage, {}),
    audio: types.optional(Media, {}),
  }),
  GeneralWrittenItem,
);

export const ImageParallax = types.compose(
  types.model({
    type: types.literal('ImageParallax'),
    image: types.optional(FeatureImage, {}),
  }),
  HeaderItem,
);

const StoryModel = types
  .model({
    items: types.array(
      types.union(ImageBackground, ImageParallax, CentredText),
    ),
  })
  .actions(self => ({
    afterCreate() {
      const { fileManager } = getEnv(self);
      onSnapshot(self, fileManager.write.bind(fileManager));
    },
    addItem(item) {
      self.items.push(item);
    },
  }));

export default StoryModel;
