import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NewsList from './NewsList';

it('renders a Newslist by default', () => {
  const wrapper = shallow(<NewsList />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
