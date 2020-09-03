import React from 'react';
import { observer } from 'mobx-react';
import {
  CentredTextDraft,
  ImageBackgroundDraft,
  VideoBackgroundDraft,
  VideoFullPageDraft,
  ImageParallaxDraft,
  HorizontalSlideshowDraft,
  VerticalSlideshowDraft,
  YoutubeDraft,
} from './preview/';

const DRAFTS = {
  CentredTextDraft,
  ImageBackgroundDraft,
  VideoBackgroundDraft,
  VideoFullPageDraft,
  ImageParallaxDraft,
  HorizontalSlideshowDraft,
  VerticalSlideshowDraft,
  YoutubeDraft,
};

const DraftItem = ({ item }) => {
  const Draft = DRAFTS[`${item.type}Draft`];
  return <Draft item={item}></Draft>;
};

export default observer(DraftItem);
