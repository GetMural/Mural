import { types, getRoot, destroy } from 'mobx-state-tree';

const NavItem = types.model({
  title: types.string,
});

const StoryItem = types.model({
  type: 'imagebackground',
  title: types.string,
  subtitle: types.string,
  body: types.string,
  // image: types.optional(types.string),
  // id: types.identifier(types.number),
});

const StoryTree = types.model({
  // rootPath: uploads fir for story
  items: types.array(StoryItem),
  nav: types.array(NavItem),
});

export { StoryItem };

export default StoryTree;
