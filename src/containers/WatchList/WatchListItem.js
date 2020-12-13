import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';
import { TiDelete } from 'react-icons/ti';
import { message } from 'antd';
import config from '../../config';

const WatchListContainer = styled.div`
  padding: 10px;
  font-family: Rubik;
  margin-bottom: 20px;
  color: #fff;
  font-size: 15px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  @media (min-width: 900px) {
    justify-content: space-evenly;
  }
`;

const WatchListItems = styled.div``;

function WatchListItem() {
  const context = useContext(AppContext);

  const onDelete = (e) => {
    e.preventDefault();
    const symbolId = e.currentTarget.id;
    fetch(`${config.API_ENDPOINT}/watchlist/${symbolId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
      })
      .then(() => {
        context.deleteSymbol(symbolId);
        message.success('Symbol successfully deleted');
        context.getWatchlist();
      })
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
  };

  return (
    <>
      {context.watchList.map((symbol) => {
        return (
          <WatchListContainer key={symbol.id}>
            {context.editing ? (
              <button
                id={symbol.id}
                onClick={onDelete}
                style={{
                  fontSize: 20,
                  backgroundColor: 'rgb(27, 29, 30)',
                  outline: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <TiDelete />
              </button>
            ) : (
              ''
            )}
            <WatchListItems>{symbol.symbol}</WatchListItems>
            <WatchListItems>142.18</WatchListItems>
          </WatchListContainer>
        );
      })}
    </>
  );
}
export default WatchListItem;
