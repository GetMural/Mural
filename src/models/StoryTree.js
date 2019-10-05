import { types, getRoot, destroy } from 'mobx-state-tree';
import { promisedComputed } from 'computed-async-mobx';

const electron = require('electron');
const mime = require('mime-types');
const Thumbor = require('thumbor');
const { convertMediaToDataurl } = require('../utils/dataurl');
// Renderer process has to get `app` module via `remote`.
const USER_DATA_PATH = (electron.app || electron.remote.app).getPath(
  'userData',
);

const renditions = [
  { w: '320', h: '568', scale: 1 },
  { w: '320', h: '568', scale: 2 },
  { w: '375', h: '667', scale: 1 },
  { w: '375', h: '667', scale: 2 },
  { w: '768', h: '1024', scale: 1 },
  { w: '768', h: '1024', scale: 2 },
  { w: '1280', h: '800', scale: 1 },
  { w: '1280', h: '800', scale: 2 },
  { w: '1920', h: '1080', scale: 1 },
  { w: '1920', h: '1080', scale: 2 },
];

const NavItem = types.model({
  title: types.string,
});

const StoryItem = types.model({
  type: 'imagebackground',
  title: types.string,
  subtitle: types.string,
  body: types.string,
  image: types.optional(types.string, ''),
});

const Media = types
  .model({
    path: '',
  })
  .views((self) => {
    const dataUrlPromise = promisedComputed('', async () => {
      const response = await convertMediaToDataurl(
        self.path,
        mime.lookup(self.path),
      );
      return response;
    });
    return {
      get preview() {
        const mimeType = mime.lookup(self.path);
        if (mimeType) {
          return dataUrlPromise.get();
        }
        return '';
      },
    };
  });

const ImageViews = types.model({}).views((self) => ({
  get renditions() {
    const thumbor = new Thumbor('', 'http://localhost:8888');

    return renditions.map((rendition) => {
      const thumborUrl = thumbor
        .setImagePath(self.path.substr(USER_DATA_PATH.length + 1))
        .resize(rendition.w * rendition.scale, rendition.h * rendition.scale)
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

const ImageBackgroundDraft = types.model({
  type: 'imagebackground',
  title: types.string,
  subtitle: types.string,
  body: types.string,
  image: types.optional(Image, {}),
  audio: types.optional(Media, {}),
});

const StoryTree = types.model({
  items: types.array(StoryItem),
  nav: types.array(NavItem),
});

export { StoryItem, ImageBackgroundDraft };

export default StoryTree;
