import React from 'react';
import { shallow } from 'enzyme';
import { New } from './New';

describe('New', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<New />);
    expect(wrapper).toMatchSnapshot();
  });
});
