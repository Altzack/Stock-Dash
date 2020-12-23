import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import WatchListContainer from '../WatchList/WatchListItem';
import AppContext from '../../AppContext';
import Loader from '../common/Loader/Loader';

const WatchListDiv = styled.div`
  height: calc(100% - 200px);
  overflow-y: auto;
  padding: 2px;
  position: fixed;
  margin-bottom: 10px;
  margin-top: 10px;
  border: 1px solid #fff;
  background-color: rgb(27, 29, 30);
  scrollbar-width: none;
  top: 95px;
  display: block;
  width: 323.77778px;
  @media (min-width: 300px) {
    width: 300px;
    height: calc(100% - 400px);
    position: static;
  }
  @media (min-width: 330px) {
    width: 340px;
    position: static;
  }
  @media (min-width: 600px) {
    width: 550px;
    height: calc(100% - 100px);
  }
  @media (min-width: 900px) {
    width: 800px;
    height: calc(100% - 100px);
  }
  @media (min-width: 1025px) {
    width: 800px;
    height: calc(100% - 100px);
  }
  @media (min-width: 1543px) {
    width: 323px;
    position: fixed;
    margin-left: 50px;
    height: calc(100% - 550px);
  }
  @media (min-width: 1700px) {
    width: 323px;
    position: fixed;
    margin-left: 110px;
    height: calc(100% - 570px);
  }
`;

const SubTitle = styled.div`
  font-family: Rubik;
  color: #e8e6e3;
  font-weight: 400;
  text-align: center;
  margin-top: 5px;
  font-size: 10px;
  @media (min-width: 300px) {
    font-size: 10px;
  }
  @media (min-width: 600px) {
    font-size: 12px;
  }
  @media (min-width: 900px) {
    font-size: 13px;
  }
`;

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media (max-width: 1543px) {
    justify-content: center;
    align-items: center;
  }
`;
const StyledButton = styled.button`
  background: none;
  font-size: 14px;
  width: 80px;
  padding-left: 10px;
  padding-right: 10px;
  outline: none;
  font-weight: 400;
  height: 32px;
  margin-top: 15px;
  margin-right: 10px;
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
  @media (min-width: 655px) {
    margin-top: 13px;
    margin-right: 10px;
  }
`;

const StyledTitle = styled.h1`
  color: #e8e6e3;
  font-family: Rubik;
  @media (min-width: 300px) {
    font-size: 18px;
    letter-spacing: 2px;
    display: flex;
    align-items: flex-end;
    margin-left: 13px;
  }
  @media (min-width: 650px) {
    font-size: 20px;
    margin-left: 10px;
  }
`;

export default function WatchList() {
  const context = useContext(AppContext);

  return (
    <PageContainer>
      <WatchListDiv>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: 60,
            borderBottom: '1px solid #fff',
            marginBottom: 10,
            width: '100%',
          }}
        >
          <StyledTitle>Your top 5</StyledTitle>
          {context.editing ? (
            <StyledButton onClick={context.editingOff}>Done</StyledButton>
          ) : (
            <StyledButton onClick={context.setEditing}>Edit</StyledButton>
          )}
        </div>
        {context.loading ? (
          <div style={{ marginTop: 150 }}>
            <Loader />
          </div>
        ) : (
          <>
            <WatchListContainer />
            {context.editing ? (
              ''
            ) : (
              <SubTitle>click symbol to get news/data</SubTitle>
            )}
          </>
        )}
      </WatchListDiv>
    </PageContainer>
  );
}
