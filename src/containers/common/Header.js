import styled from 'styled-components/macro';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { DesktopOnly, MobileOnly } from './responsiveComponents';
import 'antd/dist/antd.css';
import '../../App.css';

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
  color: #e8e6e3;
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
    color: #1890ff;
  }
`;

const StyledTitle = styled.h1`
  color: #e8e6e3;
  margin-bottom: 0;
  font-family: Rubik;
  @media (min-width: 300px) {
    font-size: 17px;
    letter-spacing: 2px;
  }
  @media (min-width: 650px) {
    font-size: 25px;
  }
`;

const LogoLink = styled(Link)`
  justify-self: center;
  align-self: center;
  color: #e8e6e3;
  font-size: 15px;
`;

export default function Header() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <AppHeaderContainer>
      <DesktopOnly>
        <HeaderContentContainer>
          <HeaderSection style={{ justifyContent: 'flex-start' }}>
            <Link style={{ textDecoration: 'none', color: '#000' }} to="/about">
              <StyledHeader>About</StyledHeader>
            </Link>
            <FooterSeparator>|</FooterSeparator>
            <Link style={{ textDecoration: 'none', color: '#000' }} to="/news">
              <StyledHeader>News</StyledHeader>
            </Link>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'center' }}>
            <LogoLink to="/">
              <StyledTitle>Stock Dash</StyledTitle>
            </LogoLink>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'flex-end' }}>
            <img style={{ width: '100' }} alt="logo" src="/favicon-32x32.png" />
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
              <StyledTitle>Stock Dash</StyledTitle>
            </LogoLink>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'flex-end' }}>
            <img style={{ width: '100' }} alt="logo" src="/favicon-32x32.png" />
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
            to="/about"
          >
            <h3>About</h3>
          </Link>
          <Link
            onClick={onClose}
            style={{ textDecoration: 'none', color: '#000' }}
            to="/news"
          >
            <h3>News</h3>
          </Link>
        </Drawer>
      </MobileOnly>
    </AppHeaderContainer>
  );
}
