import { types } from 'mobx-state-tree';

const Thumbor = types.model({
  host: '',
});

const Settings = types.model({
  thumbor: types.optional(Thumbor, {}),
});

export default Settings;
