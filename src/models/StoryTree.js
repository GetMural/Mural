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
  { w: '1920', h: '1080' },
  { w: '1024', h: '768' },
  { w: '1080', h: '1920' },
  { w: '768', h: '1024' },
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
  // id: types.identifier(types.number),
});

const Image = types
  .model({
    path: types.string,
  })
  .views((self) => {
    const dataUrlPromise = promisedComputed('', async () => {
      const response = await convertMediaToDataurl(
        self.path,
        mime.lookup(self.path),
      );
      return response; // score between 0 and 1000
    });
    return {
      get preview() {
        const mimeType = mime.lookup(self.path);
        if (mimeType) {
          return dataUrlPromise.get();
        }
        return '';
      },
      get renditions() {
        const thumbor = new Thumbor('', 'http://localhost:8888');

        return renditions.map((rendition) => {
          const thumborUrl = thumbor
            .setImagePath(self.path.substr(USER_DATA_PATH.length + 1))
            .resize(rendition.w, rendition.h)
            .smartCrop()
            .buildUrl();

          return { ...rendition, thumborUrl };
        });
      },
    };
  });

const ImageBackgroundDraft = types.model({
  type: 'imagebackground',
  title: types.string,
  subtitle: types.string,
  body: types.string,
  image: Image,
  // id: types.identifier(types.number),
});

const StoryTree = types.model({
  // rootPath: uploads fir for story
  items: types.array(StoryItem),
  nav: types.array(NavItem),
});

export { StoryItem, ImageBackgroundDraft };

export default StoryTree;
