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
import FourOhFour from './containers/common/FourOhFour';
import { useResponsive } from './containers/common/responsiveComponents';
import Footer from './containers/common/Footer';
import Header from './containers/common/Header';
import AppContext from './AppContext';
import LandingPage from './containers/LandingPage/LandingPage';
import config from './config';
import About from './containers/About/About';
import { message } from 'antd';

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
      data: [],
      watchList: [],
      editing: false,
    };
  }

  setNews = (news) => {
    this.setState({
      news: news.articles,
      error: null,
      loading: false,
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
      watchList,
      error: null,
      loading: false,
    });
  };

  addSymbol = (symbol) => {
    this.setState({
      watchList: [...this.state.watchList, symbol],
    });
  };

  deleteSymbol = (id) => {
    let newSymbols = this.state.watchList.filter((d) => d.id !== id);
    this.setState({
      watchList: newSymbols,
    });
  };

  handleSelect = (selectedTicker) => {
    const tickerArr = selectedTicker.split('|');
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
      .then(console.log(filterSpacesTicker))
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
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
      .catch((error) => this.setState({ error }));
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
      .catch((error) => this.setState({ error }));
  };

  componentDidMount() {
    this.getNews();
    this.getWatchlist();
  }

  render() {
    const contextValues = {
      loading: this.state.loading,
      news: this.state.news,
      data: this.state.data || [],
      getNews: this.getNews,
      setNews: this.setNews,
      handleSelect: this.handleSelect,
      watchList: this.state.watchList,
      editing: this.state.editing,
      addSymbol: this.addSymbol,
      setEditing: this.setEditing,
      editingOff: this.editingOff,
      deleteSymbol: this.deleteSymbol,
      getWatchlist: this.getWatchlist,
    };
    return (
      <AppContext.Provider value={contextValues}>
        <>
          <Router>
            <QueryParamProvider ReactRouterRoute={Route}>
              <AppWrapper tickers={this.state.tickers}>
                <Switch>
                  <Route exact path="/">
                    <LandingPage />
                  </Route>
                  <Route exact path="/about">
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
