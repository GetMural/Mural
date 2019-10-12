import React from 'react';
import { Fieldset } from '@bootstrap-styled/v4';
import { observer } from 'mobx-react';
import { Body } from './bites';
import Alignment from './bites/Alignment';
import ImageCreditsForm from './ImageCreditsForm';

const TextImageItemForm = ({ item }) => {
  return (
    <Fieldset>
      <Alignment
        value={item.align}
        changeAlignment={item.changeAlignment}
        uuid={item.id}
      />
      <ImageCreditsForm image={item.image} />
      <Body body={item.body} changeBody={item.changeBody} />
    </Fieldset>
  );
};

export default observer(TextImageItemForm);
