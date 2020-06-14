import React from 'react';
import { observer } from 'mobx-react';
import {
  CentredTextDraft,
  ImageBackgroundDraft,
  VideoBackgroundDraft,
  ImageParallaxDraft,
  HorizontalSlideshowDraft,
} from './preview/';

const DRAFTS = {
  CentredTextDraft,
  ImageBackgroundDraft,
  VideoBackgroundDraft,
  ImageParallaxDraft,
  HorizontalSlideshowDraft,
};

const DraftItem = ({ item, height, isActive = true }) => {
  const Draft = DRAFTS[`${item.type}Draft`];
  return <Draft item={item} height={height} isActive></Draft>;
};

export default observer(DraftItem);
