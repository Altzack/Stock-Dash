import styled from 'styled-components/macro';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, AutoComplete } from 'antd';
import { DesktopOnly, MobileOnly } from './responsiveComponents';
import { MenuOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../App.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { GoPlus } from 'react-icons/go';
import config from '../../config';
import AppContext from '../../AppContext';
import symbols from '../../symbols';
import { message } from 'antd';

const AppHeaderContainer = styled.div`
  padding: 8px 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  min-height: 60px;
  position: fixed;
  width: 100vw;
  font-family: Rubik;
  z-index: 99;
  background-color: rgb(27, 28, 29);
`;

const FooterSeparator = styled.span`
  padding: 0 10px;
  margin-top: 2px;
`;

const StyledButton = styled.button`
  color: #fff;
  font-weight: 500;
  height: 33px;
  line-height: 32px;
  background-color: rgb(40, 199, 145);
  width: 40px;
  font-size: 15px;
  outline: none;
  margin-left: 10px;
  transition: all 0.1s ease-in-out;
  border: 1px solid rgba(0, 0, 0, 0.21);
  border-bottom: 4px solid rgba(0, 0, 0, 0.21);
  border-radius: 4px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  :hover {
    transition: all 0.1s ease-in-out;
    background-color: rgb(48, 240, 176);
    cursor: pointer;
  }
  @media (min-width: 1025px) {
    width: 100px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  width: 33%;
  color: #e8e6e3;
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
  :hover {
    color: rgb(48, 240, 176);
  }
`;

const LogoLink = styled(Link)`
  justify-self: center;
  align-self: center;
  color: #e8e6e3;
  font-size: 15px;
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
      ? message.error('Symbol already in watch list or nothing selected')
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
            <FooterSeparator>|</FooterSeparator>
            <Link style={{ textDecoration: 'none', color: '#000' }} to="/about">
              <StyledHeader>About</StyledHeader>
            </Link>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'center' }}>
            <LogoLink to="/">
              <img alt="logo" src="/stockdashlogo.png" className="logoImg" />
            </LogoLink>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'flex-end' }}>
            <AutoComplete
              options={options}
              style={{
                width: 200,
              }}
              id="autoComplete"
              dropdownMatchSelectWidth={300}
              onSelect={context.handleSelect}
              onSearch={handleSearch}
              placeholder="AAPL, TSLA, FSLY..."
              allowClear
            />
            <StyledButton onClick={addToWatchlist}>Add to list</StyledButton>
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
            <LogoLink to="/">
              {clicked ? (
                ''
              ) : (
                <img alt="logo" src="/stockdashlogo.png" className="logoImg" />
              )}
            </LogoLink>
          </HeaderSection>
          <HeaderSection
            className="searchContainer"
            style={{ justifyContent: 'flex-end', width: '65%' }}
          >
            {clicked === true ? (
              <>
                <AutoComplete
                  options={options}
                  style={{
                    width: 150,
                  }}
                  id="autoComplete"
                  dropdownMatchSelectWidth={250}
                  onSelect={context.handleSelect}
                  onSearch={handleSearch}
                  placeholder="AAPL, TSLA, FSLY..."
                />
                <StyledButton onClick={addToWatchlist}>
                  <GoPlus />
                </StyledButton>
              </>
            ) : (
              <AiOutlineSearch onClick={() => setClicked(true)} />
            )}
          </HeaderSection>
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
