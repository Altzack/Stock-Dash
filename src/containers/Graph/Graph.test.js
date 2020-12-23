import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Graph from './Graph';

it('renders a graph by default', () => {
  const wrapper = shallow(<Graph />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
