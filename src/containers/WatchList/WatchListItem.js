import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';

const WatchListContainer = styled.div`
  padding: 10px;
  font-family: Rubik;
  margin-bottom: 20px;
  color: #fff;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (min-width: 900px) {
    justify-content: space-around;
  }
`;

const WatchListItems = styled.div``;

export default function WatchListItem() {
  const context = useContext(AppContext);

  return (
    <>
      {context.watchList.map((symbol) => {
        return (
          <WatchListContainer>
            <WatchListItems>{symbol.symbol}</WatchListItems>
          </WatchListContainer>
        );
      })}
    </>
  );
}
