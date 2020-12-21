import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import About from './About';

it('renders a About by default', () => {
  const wrapper = shallow(<About />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
