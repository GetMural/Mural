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

const renditions = [
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

const ImageViews = types.model({}).views(self => ({
  get renditions() {
    if (self.path === '') {
      return [];
    }
    const thumbor = getEnv(self).thumbor;
    return renditions.map(rendition => {
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

const Image = types.compose(
  Media,
  ImageViews,
);

export const StoryItem = types
  .model({
    type: 'ImageBackground',
    title: '',
    subtitle: '',
    body: '',
    image: types.optional(Image, {}),
    audio: types.optional(Media, {}),
  })
  .actions(self => ({
    changeTitle(title) {
      self.title = title;
    },
    changeSubtitle(subtitle) {
      self.subtitle = subtitle;
    },
    changeBody(body) {
      self.body = body;
    },
  }));

const StoryModel = types
  .model({
    items: types.array(StoryItem),
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
