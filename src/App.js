import './App.css';
import styled from 'styled-components/macro';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { message } from 'antd';
import moment from 'moment';
import FourOhFour from './containers/common/FourOhFour';
import { useResponsive } from './containers/common/responsiveComponents';
import Footer from './containers/common/Footer';
import Header from './containers/common/Header';
import AppContext from './AppContext';
import LandingPage from './containers/LandingPage/LandingPage';
import config from './config';
import About from './containers/About/About';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: rgba(232, 230, 227, 0.85);
  background-color: rgb(27, 29, 30);
  ${({ isMobile }) => isMobile && 'overflow-x: hidden;'}
  max-width: 100%;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding-top: 64px;
  min-height: 100vh;
`;

const AppWrapper = withRouter(({ children }) => {
  const { isTabletOrMobile } = useResponsive();
  return (
    <AppContainer isMobile={isTabletOrMobile}>
      <Header />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </AppContainer>
  );
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      loading: true,
      closePrice: [],
      watchList: [],
      editing: false,
      graphTicker: '',
      graphData: [],
      graphTickerPrice: {},
    };
  }

  setNews = (news) => {
    this.setState({
      news: news.articles,
      error: null,
    });
  };

  setClosePrice = (price) => {
    const newPrices = {
      price: price['Global Quote']['05. price'],
      symbol: price['Global Quote']['01. symbol'],
      change: price['Global Quote']['10. change percent'],
      previousClose: price['Global Quote']['08. previous close'],
    };

    this.setState({
      closePrice: [newPrices, ...this.state.closePrice],
    });
  };

  setEditing = () => {
    this.setState({
      editing: true,
    });
  };

  editingOff = () => {
    this.setState({
      editing: false,
    });
  };

  setWatchlist = (watchList) => {
    this.setState({
      watchList: watchList.reverse(),
      error: null,
    });
  };

  addSymbol = (symbol) => {
    this.setState({
      watchList: [...this.state.watchList, symbol],
    });
  };

  deleteSymbol = (id) => {
    const newSymbols = this.state.watchList.filter((d) => d.id !== id);
    this.setState({
      watchList: newSymbols,
    });
  };

  setGraphTicker = (symbol) => {
    this.setState({
      graphTicker: symbol,
    });
  };

  setGraphTickerPrice = (price) => {
    this.setState({
      graphTickerPrice: price['Global Quote'],
    });
  };

  setGraphData = (data) => {
    const timeSeries = data['Time Series (Daily)'];
    const dateKeys = Object.keys(data['Time Series (Daily)']);
    const graphArray = [];
    let graphObj = {};
    for (let i = 0; i < 50; i++) {
      graphObj = {
        price: parseFloat(timeSeries[dateKeys[i]]['4. close']),
        date: moment(dateKeys[i]).format('MM/DD'),
      };
      graphArray.push(graphObj);
    }

    this.setState({
      graphData: graphArray.reverse(),
      loading: false,
    });
  };

  getGraphData = (selectedTicker) => {
    const tickerArr = selectedTicker.split('|');
    const filteredSymbol = tickerArr[0].trim();
    fetch(
      `${config.GRAPH_DATA_API_ENDPOINT}&symbol=${filteredSymbol}&apikey=${config.DATA_API_KEY}`,
      {
        method: 'GET',
        headers: {},
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setGraphData)
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
  };

  getGraphTickerPrice = (symbol) => {
    fetch(
      `${config.DATA_API_ENDPOINT}&symbol=${symbol}&apikey=${config.DATA_API_KEY}`,
      {
        method: 'GET',
        headers: {},
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setGraphTickerPrice)
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
  };

  handleSelect = (selectedTicker) => {
    const tickerArr = selectedTicker.split('|');
    const filteredSymbol = tickerArr[0].trim();
    const filteredSecurityName = tickerArr[1].trim();
    const regexFilteredTicker = filteredSecurityName.replace(/[,.]/g, '');
    const filterSpacesTicker = regexFilteredTicker.replace(/  +/g, ' ');
    fetch(
      `${config.NEWS_API_ENDPOINT}/search?q=${filterSpacesTicker}&lang=en&sortby=publishedAt&country=us&token=${config.NEWS_API_KEY}`,
      {
        method: 'GET',
        headers: {},
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setNews)
      .then(
        this.setState({
          graphTicker: filteredSymbol,
        })
      )
      .then(this.getGraphData(selectedTicker))
      .then(this.getGraphTickerPrice(filteredSymbol))
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
  };

  getClosePrice = () => {
    const watchListSymbols = this.state.watchList;
    for (let i = 0; i < watchListSymbols.length; i++) {
      const searchSymbols = watchListSymbols[i].symbol;
      fetch(
        `${config.DATA_API_ENDPOINT}&symbol=${searchSymbols}&apikey=${config.DATA_API_KEY}`,
        {
          method: 'GET',
          headers: {},
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.status);
          }
          return res.json();
        })
        .then(this.setClosePrice)
        .catch((err) => {
          message.error(`Please try again later: ${err}`);
        });
    }
  };

  getNews = () => {
    fetch(
      `${config.NEWS_API_ENDPOINT}/top-headlines?topic=business&lang=en&country=us&token=${config.NEWS_API_KEY}`,
      {
        method: 'GET',
        headers: {},
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setNews)
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
  };

  getWatchlist = () => {
    fetch(`${config.API_ENDPOINT}/watchlist`, {
      method: 'GET',
      headers: {},
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setWatchlist)
      .then(this.getClosePrice)
      .then(() => {
        const watchListSymbol = this.state.watchList[0].symbol;
        this.getGraphData(watchListSymbol);
        this.setGraphTicker(watchListSymbol);
        this.getGraphTickerPrice(watchListSymbol);
      })
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
  };

  componentDidMount() {
    this.getWatchlist();
  }

  render() {
    const contextValues = {
      loading: this.state.loading,
      news: this.state.news || [],
      closePrice: this.state.closePrice || [],
      setNews: this.setNews,
      handleSelect: this.handleSelect,
      watchList: this.state.watchList,
      editing: this.state.editing,
      addSymbol: this.addSymbol,
      setEditing: this.setEditing,
      editingOff: this.editingOff,
      deleteSymbol: this.deleteSymbol,
      getWatchlist: this.getWatchlist,
      setClosePrice: this.setClosePrice,
      getClosePrice: this.getClosePrice,
      graphTicker: this.state.graphTicker,
      graphData: this.state.graphData,
      setGraphTicker: this.setGraphTicker,
      getGraphData: this.getGraphData,
      setGraphTickerPrice: this.setGraphTickerPrice,
      graphTickerPrice: this.state.graphTickerPrice || {},
    };
    return (
      <AppContext.Provider value={contextValues}>
        <>
          <Router>
            <QueryParamProvider ReactRouterRoute={Route}>
              <AppWrapper>
                <Switch>
                  <Route exact path="/">
                    <LandingPage />
                  </Route>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route>
                    <FourOhFour />
                  </Route>
                </Switch>
              </AppWrapper>
            </QueryParamProvider>
          </Router>
        </>
      </AppContext.Provider>
    );
  }
}

export default App;
