import {
  types,
  getEnv,
  onSnapshot,
  destroy,
  getParent,
} from 'mobx-state-tree';
import { promisedComputed } from 'computed-async-mobx';

const electron = require('electron');
const mime = require('mime-types');
const uuidv4 = require('uuid/v4');
const { convertMediaToDataurl } = require('../utils/dataurl');
// Renderer process has to get `app` module via `remote`.
const USER_DATA_PATH = (electron.app || electron.remote.app).getPath(
  'userData',
);

const UuidItem = types
  .model({
    id: '',
  })
  .actions(self => ({
    afterCreate() {
      self.id = uuidv4();
    },
  }));

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
  { w: 282, h: 0, scale: 1 },
  { w: 282, h: 0, scale: 2 },
];

// For landscape images
const landscapeRenditions = [
  { w: 320, h: 0, scale: 1 },
  { w: 320, h: 0, scale: 2 },
  { w: 375, h: 0, scale: 1 },
  { w: 375, h: 0, scale: 2 },
  { w: 768, h: 0, scale: 1 },
  { w: 768, h: 0, scale: 2 },
  { w: 1280, h: 0, scale: 1 },
  { w: 1280, h: 0, scale: 2 },
  { w: 1920, h: 0, scale: 1 },
  { w: 1920, h: 0, scale: 2 },
];

const Media = types
  .model({
    path: '',
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
const LandscapeImageViews = generateImageViews(landscapeRenditions);
const FeatureImageViews = generateImageViews(featureRenditions);

const ImageCredits = types
  .model({
    alt: '',
    credits: '',
  })
  .actions(self => ({
    changeAlt(alt) {
      self.alt = alt;
    },
    changeCredits(credits) {
      self.credits = credits;
    },
  }));

const ContentImage = types.compose(
  Media,
  ImageCredits,
  ContentImageViews,
  UuidItem,
);

const LandscapeImage = types.compose(
  Media,
  ImageCredits,
  LandscapeImageViews,
  UuidItem,
);

const FeatureImage = types.compose(
  Media,
  FeatureImageViews,
  UuidItem,
);

export const TextImageItem = types.compose(
  types
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
    })),
  UuidItem,
);

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

const RemovableStoryItem = types.model().actions(self => ({
  remove() {
    getParent(self, 2).removeItem(self);
  },
}));

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
  UuidItem,
  RemovableStoryItem,
);

export const ImageBackground = types.compose(
  types.model({
    type: types.literal('ImageBackground'),
    image: types.optional(FeatureImage, {}),
    audio: types.optional(Media, {}),
  }),
  GeneralWrittenItem,
  UuidItem,
  RemovableStoryItem,
);

export const ImageParallax = types.compose(
  types.model({
    type: types.literal('ImageParallax'),
    image: types.optional(FeatureImage, {}),
  }),
  HeaderItem,
  UuidItem,
  RemovableStoryItem,
);

export const HorizontalSlideshow = types.compose(
  types
    .model({
      type: types.literal('HorizontalSlideshow'),
      slides: types.array(LandscapeImage),
    })
    .actions(self => ({
      addSlide() {
        self.slides.push(LandscapeImage.create());
      },
    })),
  UuidItem,
  RemovableStoryItem,
);

const StoryModel = types
  .model({
    items: types.array(
      types.union(
        ImageBackground,
        ImageParallax,
        CentredText,
        HorizontalSlideshow,
      ),
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
    removeItem(item) {
      destroy(item);
    },
  }));

export default StoryModel;
