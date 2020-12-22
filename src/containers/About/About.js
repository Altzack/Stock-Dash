import React from 'react';
import styled from 'styled-components/macro';
import { useResponsive } from '../common/responsiveComponents';

const ContentContainer = styled.div`
  flex-direction: column;
  font-weight: 200;
  display: flex;
  align-items: center;
  margin: auto;
  @media (max-width: 480px) {
    font-size: 20px;
    padding: 10px;
  }

  @media (min-width: 750px) {
    font-size: 20px;
    max-width: 650px;
    padding: 10px;
  }

  @media (min-width: 1023px) {
    max-width: 900px;
    font-size: 30px;
    padding: 10px;
  }
  @media (min-width: 1023px) {
    max-width: 900px;
    font-size: 30px;
    padding: 10px;
  }
`;

const PageContainer = styled.div`
  padding-top: 42px;
  font-family: Rubik;
  padding: 15px;
  display: flex;
  font-size: 28px;
  color: #fff;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 300;
  text-align: left;
  letter-spacing: 3px;
  text-transform: capitalize;
  color: #fff;
  margin-bottom: 10px;
  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

export default function LandingPage() {
  const { isTabletOrMobile } = useResponsive();
  return (
    <PageContainer mobile={isTabletOrMobile}>
      <Title>About Stock-Dash</Title>
      <br />
      <ContentContainer>
        Stock-Dash was built as my second full stack capstone for Bloc.
        <br />
        <br />
        The idea for Stock-Dash came from my interest in trading stocks. The
        dashboard allows you to get the latest news and pricing for a symbol, as
        well as see the past month's price data visualized. With the watchlist
        feature you can easily navigate to your top 5 and keep an eye on your
        favorite tickers.
        <br />
        <br />
      </ContentContainer>
    </PageContainer>
  );
}
