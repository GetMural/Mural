import React from 'react';
import { shallow } from 'enzyme';
import { ContentBlockSelector } from './ContentBlockSelector';

describe('ContentBlockSelector', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ContentBlockSelector />);
    expect(wrapper).toMatchSnapshot();
  });
});
