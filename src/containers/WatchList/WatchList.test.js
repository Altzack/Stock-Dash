import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import WatchList from './WatchList';

it('renders a Watchlist by default', () => {
  const wrapper = shallow(<WatchList />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
