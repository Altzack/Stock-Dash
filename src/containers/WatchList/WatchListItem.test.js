import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import WatchListItem from './WatchListItem';

it('renders a WatchlistItem by default', () => {
  const wrapper = shallow(<WatchListItem />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
