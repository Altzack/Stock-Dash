import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LandingPage from '../About/About';

it('renders a landingpage by default', () => {
  const wrapper = shallow(<LandingPage />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
