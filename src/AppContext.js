import React from 'react';

const AppContext = React.createContext({
  news: [],
  getNews: () => {},
  data: [],
  loading: true,
  setNews: () => {},
  handleSelect: () => {},
  watchList: [],
  addSymbol: () => {},
  editing: false,
  setEditing: () => {},
  deleteSymbol: () => {},
  editingOff: () => {},
  getWatchlist: () => {},
  closePrice: [],
  setClosePrice: () => {},
  getClosePrice: () => {},
  graphTicker: '',
  graphData: [],
  setGraphTicker: () => {},
  getGraphData: () => {},
  setGraphTickerPrice: () => {},
  graphTickerPrice: {},
});

export default AppContext;
