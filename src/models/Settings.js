import { types } from 'mobx-state-tree';

const Editor = types.model({
  previewWidth: 6,
});

const Thumbor = types.model({
  host: '',
});

const Settings = types.model({
  thumbor: types.optional(Thumbor, {}),
  editor: types.optional(Editor, {}),
});

export default Settings;
