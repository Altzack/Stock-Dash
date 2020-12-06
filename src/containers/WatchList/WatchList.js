import React from 'react';
import styled from 'styled-components/macro';
import WatchListContainer from '../WatchList/WatchListItem';

const WatchListDiv = styled.div`
  height: calc(100% - 200px);
  overflow-y: auto;
  padding: 24px;
  position: fixed;
  margin-bottom: 30px;
  background-color: #666;
  scrollbar-width: none;
  top: 95px;
  display: block;
  width: 323.77778px;
  @media (min-width: 300px) {
    width: 320px;
    height: calc(100% - 400px);
    position: static;
  }
  @media (min-width: 600px) {
    width: 500px;
    height: calc(100% - 100px);
  }
  @media (min-width: 900px) {
    width: 700px;
    height: calc(100% - 100px);
  }
  @media (min-width: 1025px) {
    width: 323px;
    position: fixed;
    margin-left: 40px;
    height: calc(100% - 200px);
  }
`;

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media (max-width: 1024px) {
    justify-content: center;
    align-items: center;
  }
`;
const StyledButton = styled.button`
  color: #fff;
  font-weight: 500;
  height: 34px;
  background-color: #1c89ff;
  width: 50px;
  transition: all 0.1s ease-in-out;
  border: 1px solid rgba(0, 0, 0, 0.21);
  border-bottom: 4px solid rgba(0, 0, 0, 0.21);
  border-radius: 4px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  :hover {
    transition: all 0.1s ease-in-out;
    background-color: #3e9afc;
    cursor: pointer;
  }
  @media (max-width: 650px) {
    margin-bottom: 15px;
  }
`;

const StyledTitle = styled.h1`
  color: #e8e6e3;
  margin-bottom: 10px;
  font-family: Rubik;
  @media (min-width: 300px) {
    font-size: 17px;
    letter-spacing: 2px;
  }
  @media (min-width: 650px) {
    font-size: 25px;
  }
`;

export default function WatchList() {
  return (
    <PageContainer>
      <WatchListDiv>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: 60,
          }}
        >
          <StyledTitle>Watch List</StyledTitle>
          <StyledButton>Edit</StyledButton>
        </div>
        <WatchListContainer />
        <WatchListContainer />
        <WatchListContainer />
      </WatchListDiv>
    </PageContainer>
  );
}
