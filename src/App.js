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
    };
  }

  setNews = (news) => {
    this.setState({
      news: news.articles,
      error: null,
      loading: false,
    });
  };

  handleSelect = (selectedTicker) => {
    fetch(
      `${config.NEWS_API_ENDPOINT}/everything?q=${selectedTicker}&language=en&pageSize=30&apiKey=${config.NEWS_API_KEY}`,
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

  getNews = () => {
    fetch(
      `${config.NEWS_API_ENDPOINT}/top-headlines?sources=the-wall-street-journal,reuters,bloomberg,barrons&pageSize=50&apiKey=${config.NEWS_API_KEY}`,
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
  componentDidMount() {
    this.getNews();
  }
  render() {
    const contextValues = {
      loading: this.state.loading,
      news: this.state.news,
      data: this.state.data || [],
      getNews: this.getNews,
      setNews: this.setNews,
      handleSelect: this.handleSelect,
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
