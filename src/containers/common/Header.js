import styled from 'styled-components/macro';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, AutoComplete } from 'antd';
import { DesktopOnly, MobileOnly } from './responsiveComponents';
import { MenuOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../App.css';
import { AiOutlineSearch } from 'react-icons/ai';
import config from '../../config';
import AppContext from '../../AppContext';
import symbols from '../../symbols';
import { message } from 'antd';

const AppHeaderContainer = styled.div`
  padding: 8px 12px;
  text-align: center;
  min-height: 60px;
  position: fixed;
  width: 100vw;
  font-family: Rubik;
  z-index: 99;
  background-color: rgb(27, 29, 30);
`;

const StyledButton = styled.button`
  background: none;
  padding: 5px;
  font-size: 14px;
  font-weight: 400;
  max-width: 360px;
  padding-left: 10px;
  padding-right: 10px;
  outline: none;
  margin-left: 10px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  border: 1px solid rgb(40, 199, 145);
  color: rgb(40, 199, 145);
  :hover {
    transition: all 0.1s ease-in-out;
    background-color: rgb(48, 240, 176);
    color: #000;
    cursor: pointer;
  }
  @media (max-width: 1025px) {
    width: 50px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  width: 33%;
`;

const HeaderContentContainer = styled.div`
  font-family: Rubik;
  font-weight: 300;
  max-width: 1200px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  height: 44px;
`;

const StyledHeader = styled.h3`
  color: #e8e6e3;
  margin-bottom: 0;
  padding: 10px;
  :hover {
    color: rgb(48, 240, 176);
  }
`;

const LogoLink = styled.a`
  align-self: center;
  color: rgb(40, 199, 145);
  :hover {
    color: rgb(40, 199, 145);
  }
  display: flex;
  font-size: 15px;
  @media (min-width: 350px) {
    font-size: 20px;
  }
  @media (min-width: 600px) {
    font-size: 25px;
  }
`;

export default function Header() {
  const context = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [clicked, setClicked] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSearch = (searchText) => {
    const filteredTickers = symbols.filter(
      (symbol) =>
        symbol.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
        symbol['Security Name'].toLowerCase().includes(searchText.toLowerCase()) // TODO: Update this so it's smarter or something
    );

    setOptions(
      filteredTickers.map((ticker) => {
        return {
          value:
            ticker.symbol +
            ' | ' +
            ticker['Security Name'].replace(/[,.]/g, ''),
        };
      })
    );
  };
  const addToWatchlist = (e) => {
    e.preventDefault();

    const symbol = document.getElementById('autoComplete').value;

    const tickerArr = symbol.split('|');
    const filteredTicker = tickerArr[0].trim();

    const getSymbol = {
      symbol: filteredTicker,
    };
    const found = (arr) => arr.symbol === filteredTicker;

    filteredTicker.length === 0 ||
    context.watchList.length >= 5 ||
    context.watchList.some(found) === true ||
    !symbol.includes('|')
      ? message.error('Symbol already in list, nothing selected, or list full')
      : fetch(`${config.API_ENDPOINT}/watchlist`, {
          method: 'POST',
          body: JSON.stringify(getSymbol),
          headers: { 'content-type': 'application/json' },
        })
          .then((watchlistRes) => {
            if (!watchlistRes.ok)
              return watchlistRes.json().then((e) => Promise.reject(e));
            return watchlistRes.json();
          })
          .then((watchlistRes) => {
            context.addSymbol(watchlistRes);
            message.success(
              `${filteredTicker} successfully added to watchlist!`
            );
            window.location.reload();
          })
          .catch((err) => {
            message.error(`Please try again later: ${err}`);
          });
  };

  return (
    <AppHeaderContainer>
      <DesktopOnly>
        <HeaderContentContainer>
          <HeaderSection style={{ justifyContent: 'flex-start' }}>
            <Link style={{ textDecoration: 'none', color: '#000' }} to="/">
              <StyledHeader>Home</StyledHeader>
            </Link>
            <Link style={{ textDecoration: 'none', color: '#000' }} to="/about">
              <StyledHeader>About</StyledHeader>
            </Link>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'center' }}>
            <LogoLink to="/">Stock-Dash</LogoLink>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'flex-end' }}>
            <label htmlFor="autoComplete">Symbol: </label>
            <AutoComplete
              options={options}
              style={{
                width: 170,
                marginLeft: 10,
              }}
              id="autoComplete"
              dropdownMatchSelectWidth={300}
              onSelect={context.handleSelect}
              onSearch={handleSearch}
              placeholder="AAPL, TSLA, FSLY..."
              allowClear
            />
            <StyledButton onClick={addToWatchlist}>Add to top 5</StyledButton>
          </HeaderSection>
        </HeaderContentContainer>
      </DesktopOnly>
      <MobileOnly>
        <HeaderContentContainer>
          <HeaderSection style={{ justifyContent: 'flex-start' }}>
            <Button
              style={{
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                color: '#e8e6e3',
              }}
              ype="text"
              onClick={showDrawer}
            >
              <MenuOutlined />
            </Button>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'center' }}>
            <LogoLink to="/">{clicked ? '' : 'Stock-Dash'}</LogoLink>
          </HeaderSection>
          {clicked === true ? (
            <HeaderSection
              className="searchContainer"
              style={{ justifyContent: 'flex-end', width: '80%' }}
            >
              <label style={{ fontSize: 12 }} htmlFor="autoComplete">
                Symbol:{' '}
              </label>
              <AutoComplete
                options={options}
                style={{
                  width: 150,
                  marginLeft: 10,
                }}
                id="autoComplete"
                dropdownMatchSelectWidth={250}
                onSelect={context.handleSelect}
                onSearch={handleSearch}
                placeholder="AAPL, TSLA, FSLY..."
                allowClear
              />
              <StyledButton onClick={addToWatchlist}>Add</StyledButton>
            </HeaderSection>
          ) : (
            <HeaderSection
              className="searchContainer"
              style={{ justifyContent: 'flex-end' }}
            >
              <AiOutlineSearch onClick={() => setClicked(true)} />
            </HeaderSection>
          )}
        </HeaderContentContainer>
        <Drawer
          placement="left"
          closable="true"
          onClose={onClose}
          visible={visible}
          key="AppHeader-left-drawer"
        >
          <Link
            onClick={onClose}
            style={{ textDecoration: 'none', color: '#000' }}
            to="/"
          >
            <h3>Home</h3>
          </Link>
          <Link
            onClick={onClose}
            style={{ textDecoration: 'none', color: '#000' }}
            to="/about"
          >
            <h3>About</h3>
          </Link>
        </Drawer>
      </MobileOnly>
    </AppHeaderContainer>
  );
}
