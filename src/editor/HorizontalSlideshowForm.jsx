import React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@bootstrap-styled/v4';
import ImageCreditsForm from './ImageCreditsForm';
import { NavEntry, ButtonPanel } from './bites';
import FormLayout from './FormLayout';

const HorizontalSlideshowForm = ({ draftItem, onSave }) => {
  return (
    <FormLayout draftItem={draftItem}>
      <NavEntry />
      {draftItem.slides.map(slide => (
        <ImageCreditsForm image={slide} />
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
    </FormLayout>
  );
};

export default observer(HorizontalSlideshowForm);
