import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NewsList from './NewsList';

it('renders a NewsList by default', () => {
  const wrapper = shallow(<NewsList />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
