import React from 'react';

const AppContext = React.createContext({
  news: [],
  getNews: () => {},
  data: [],
  loading: true,
  setNews: () => {},
  handleSelect: () => {},
  watchList: [],
});

export default AppContext;
