import React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@bootstrap-styled/v4';
import ImageCreditsForm from './ImageCreditsForm';
import { NavEntry, ButtonPanel } from './bites';

const VerticalSlideshowForm = ({ draftItem, onSave }) => {
  return (
    <>
      <NavEntry />
      {draftItem.slides.map(slide => (
        <ImageCreditsForm image={slide} key={slide.id} />
      ))}
      <div>
        <Button
          type="button"
          color="success"
          onClick={draftItem.addSlide}
        >
          Add Slide
        </Button>
      </div>
      <ButtonPanel onSave={onSave} />
    </>
  );
};

export default observer(VerticalSlideshowForm);
