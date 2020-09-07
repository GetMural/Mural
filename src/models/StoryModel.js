/* eslint-env browser */
import {
  types,
  getEnv,
  onSnapshot,
  onAction,
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

const gulp = require('gulp');
// const webpack = require('webpack-stream');
const through2 = require('through2');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

const UuidItem = types
  .model({
    id: '',
  })
  .actions(self => ({
    afterCreate() {
      self.id = uuidv4();
    },
  }));

const AlignableItem = types
  .model({
    align: types.optional(
      types.enumeration(['left', 'center', 'right']),
      'left',
    ),
  })
  .actions(self => ({
    changeAlignment(align) {
      self.align = align;
    },
  }));

const ModifiableItem = types
  .model({
    lastModified: types.optional(types.Date, Date.now()),
  })
  .actions(self => ({
    updateLastModified() {
      self.lastModified = Date.now();
    },
    afterCreate() {
      onAction(self, call => {
        if (call !== 'updateLastModified') {
          self.updateLastModified();
        }
      });
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

const MediaStub = { type: 'local' };

const Media = types
  .model({
    type: types.union(
      types.literal('local'),
      types.literal('remote'),
    ),
    path: '',
  })
  .actions(self => ({
    uploadFile(systemPath, name) {
      const { fileManager } = getEnv(self);
      const uploadPath = fileManager.importMedia(systemPath, name);
      self.path = uploadPath;
    },
    changeType(type) {
      self.type = type;
    },
    changePath(path) {
      self.path = path;
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
        if (self.type === 'local' && self.mimeType) {
          return dataUrlPromise.get();
        }
        if (self.type === 'remote') {
          return self.path;
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

const ImageMetaData = types
  .model({
    alt: '',
    credits: '',
    title: '',
  })
  .views(self => {
    const NULL_DIMENSIONS = {};
    const dimensionsPromise = promisedComputed(
      NULL_DIMENSIONS,
      async () => {
        const src = self.preview;
        return new Promise(function(resolve, reject) {
          const img = new Image();
          img.onload = function() {
            resolve({ w: img.naturalWidth, h: img.naturalHeight });
          };
          img.onerror = function(err) {
            reject(err);
          };
          img.src = src;
        });
      },
    );
    return {
      get dimensions() {
        if (self.preview) {
          return dimensionsPromise.get();
        }
        return NULL_DIMENSIONS;
      },
    };
  })
  .actions(self => ({
    changeAlt(alt) {
      self.alt = alt;
    },
    changeCredits(credits) {
      self.credits = credits;
    },
    changeTitle(title) {
      self.title = title;
    },
  }));

const VideoMetaData = types.model().views(self => {
  const NULL_DIMENSIONS = {};
  const dimensionsPromise = promisedComputed(
    NULL_DIMENSIONS,
    async () => {
      const src = self.preview;
      return new Promise(function(resolve, reject) {
        const video = document.createElement('video');
        video.onloadedmetadata = function() {
          resolve({ w: video.videoWidth, h: video.videoHeight });
        };
        video.onerror = function(err) {
          reject(err);
        };
        video.src = src;
      });
    },
  );
  return {
    get dimensions() {
      if (self.preview) {
        return dimensionsPromise.get();
      }
      return NULL_DIMENSIONS;
    },
    get orientation() {
      const dimensions = self.dimensions;
      if (dimensions) {
        if (dimensions.w / dimensions.h < 1) {
          return 'portrait';
        } else {
          return 'landscape';
        }
      }

      return '';
    },
  };
});

const ContentImage = types.compose(
  Media,
  ImageMetaData,
  ContentImageViews,
  UuidItem,
);

const HorizontalSlide = types.compose(
  Media,
  ImageMetaData,
  LandscapeImageViews,
  UuidItem,
);

const VerticalSlide = types.compose(
  Media,
  ImageMetaData,
  FeatureImageViews,
  UuidItem,
);

const FeatureImage = types.compose(
  Media,
  ImageMetaData,
  FeatureImageViews,
  UuidItem,
);

const Video = types.compose(Media, VideoMetaData);

export const TextImageItem = types.compose(
  types
    .model({
      body: '',
      image: types.optional(
        ContentImage,
        Object.assign({}, MediaStub),
      ),
    })
    .actions(self => ({
      changeBody(body) {
        self.body = body;
      },
    })),
  UuidItem,
  AlignableItem,
);

const HeaderItem = types
  .model({
    title: '',
    subtitle: '',
    isFullPage: false,
  })
  .actions(self => ({
    changeTitle(title) {
      self.title = title;
    },
    changeSubtitle(subtitle) {
      self.subtitle = subtitle;
    },
    toggleIsFullPage() {
      self.isFullPage = !self.isFullPage;
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
    image: types.optional(FeatureImage, Object.assign({}, MediaStub)),
    audio: types.optional(Media, Object.assign({}, MediaStub)),
  }),
  GeneralWrittenItem,
  UuidItem,
  RemovableStoryItem,
  AlignableItem,
);

export const VideoBackground = types.compose(
  types
    .model({
      type: types.literal('VideoBackground'),
      video: types.optional(Video, Object.assign({}, MediaStub)),
      useOffset: false,
      offset: 0,
    })
    .actions(self => ({
      toggleOffsetUse() {
        self.useOffset = !self.useOffset;
      },
      updateOffset(offset) {
        self.offset = offset;
      },
    })),
  GeneralWrittenItem,
  UuidItem,
  RemovableStoryItem,
  AlignableItem,
);

export const VideoFullPage = types.compose(
  types
    .model({
      type: types.literal('VideoFullPage'),
      video: types.optional(Video, Object.assign({}, MediaStub)),
      useOffset: false,
      offset: 0,
      playback: types.union(
        types.literal('loop'),
        types.literal('autoAdvance'),
      ),
    })
    .actions(self => ({
      toggleOffsetUse() {
        self.useOffset = !self.useOffset;
      },
      updateOffset(offset) {
        self.offset = offset;
      },
      changePlayback(playback) {
        self.playback = playback;
      },
    })),
  GeneralWrittenItem,
  UuidItem,
  RemovableStoryItem,
);

export const Youtube = types.compose(
  types
    .model({
      type: types.literal('Youtube'),
      controls: false,
      autoAdvance: false,
      youtubeId: '',
    })
    .actions(self => ({
      toggleControls() {
        self.controls = !self.controls;
      },
      toggleAutoAdvance() {
        self.autoAdvance = !self.autoAdvance;
      },
      changeYoutubeId(youtubeId) {
        self.youtubeId = youtubeId;
      },
    })),
  UuidItem,
  RemovableStoryItem,
);

export const ImageParallax = types.compose(
  types.model({
    type: types.literal('ImageParallax'),
    image: types.optional(FeatureImage, Object.assign({}, MediaStub)),
  }),
  HeaderItem,
  UuidItem,
  RemovableStoryItem,
  AlignableItem,
);

export const HorizontalSlideshow = types.compose(
  types
    .model({
      type: types.literal('HorizontalSlideshow'),
      slides: types.array(HorizontalSlide),
    })
    .actions(self => ({
      addSlide() {
        self.slides.push(HorizontalSlide.create());
      },
    })),
  UuidItem,
  RemovableStoryItem,
);

export const VerticalSlideshow = types.compose(
  types
    .model({
      type: types.literal('VerticalSlideshow'),
      slides: types.array(VerticalSlide),
    })
    .actions(self => ({
      addSlide() {
        self.slides.push(VerticalSlide.create());
      },
    })),
  UuidItem,
  RemovableStoryItem,
);

function generateCSS() {
  return new Promise((resolve, reject) => {
    gulp
      .src([
        'src/client/reset.css',
        'src/client/blueimp-gallery.css',
        'src/client/styles.css',
      ])
      .pipe(concat('styles.css'))
      .pipe(cleanCSS())
      .pipe(
        through2.obj(function(file, enc, callback) {
          const contents = file.contents.toString('utf8');
          this.push(contents);
          return callback();
        }),
      )
      .on('data', resolve)
      .on('error', reject);
  });
}

// function generateJS() {
//   return new Promise((resolve, reject) => {
//     gulp
//       .src('src/client/app.js')
//       .pipe(webpack())
//       .pipe(
//         through2.obj(function(file, enc, callback) {
//           const contents = file.contents.toString('utf8');
//           this.push(contents);
//           return callback();
//         }),
//       )
//       .on('data', resolve)
//       .on('error', reject);
//   });
// }

const StoryModel = types.compose(
  types
    .model({
      items: types.array(
        types.union(
          ImageBackground,
          ImageParallax,
          CentredText,
          HorizontalSlideshow,
          VerticalSlideshow,
          VideoBackground,
          VideoFullPage,
          Youtube,
        ),
      ),
    })
    .views(self => {
      const stylesPromise = promisedComputed('', async () => {
        const response = await generateCSS(self.items);
        return response;
      });

      // const scriptPromise = promisedComputed('', async () => {
      //   const response = await generateJS(self.items);
      //   return response;
      // });
      return {
        get storyStyles() {
          return stylesPromise.get();
        },
        // get storyScript() {
        //   return scriptPromise.get();
        // },
      };
    })
    .actions(self => ({
      afterCreate() {
        const { fileManager } = getEnv(self);
        if (fileManager) {
          onSnapshot(self, fileManager.write.bind(fileManager));
        }
      },
      addItem(item) {
        self.items.push(item);
      },
      removeItem(item) {
        destroy(item);
      },
      moveItem(dragIndex, hoverIndex) {
        const dragged = self.items[dragIndex];

        self.items.splice(dragIndex, 1);
        self.items.splice(hoverIndex, 0, dragged.toJSON());
      },
      renderMuralTemplate() {
        const items = self.items;

        const itemHtml = items.map((item, i) => {
          const type = item.type;
          let render;

          try {
            render = require(`../editor/preview/${type}.template.js`);
          } catch (e) {
            render = function() {
              return '';
            };
          }

          return render(item, i);
        });

        return itemHtml.join('');
      },
    })),
  ModifiableItem,
);

export default StoryModel;
