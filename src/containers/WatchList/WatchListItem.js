import React from 'react';
import styled from 'styled-components/macro';

const WatchListContainer = styled.div`
  padding: 10px;
  font-family: Rubik;
  margin-bottom: 20px;
  color: #fff;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const WatchListItems = styled.div``;

export default function WatchListItem() {
  return (
    <WatchListContainer>
      <WatchListItems>test stock</WatchListItems>
      <WatchListItems>test</WatchListItems>
      <WatchListItems>test</WatchListItems>
    </WatchListContainer>
  );
}
