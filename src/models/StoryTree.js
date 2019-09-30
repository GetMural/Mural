import { types, getRoot, destroy } from 'mobx-state-tree';
import { promisedComputed } from 'computed-async-mobx';

const mime = require('mime-types');
const { convertMediaToDataurl } = require('../utils/dataurl');

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
