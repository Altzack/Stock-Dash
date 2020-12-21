import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { message } from 'antd';
import config from '../../config';

const WatchListContainer = styled.div`
  padding: 10px;
  font-family: Rubik;
  margin-bottom: 10px;
  color: #fff;
  font-size: 15px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  @media (min-width: 900px) {
    justify-content: space-evenly;
  }
  :hover {
    background-color: rgb(40, 47, 51);
    cursor: pointer;
  }
`;

const WatchListItems = styled.div`
  text-align: left;
`;

function WatchListItem() {
  const context = useContext(AppContext);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const listOnSelect = (e) => {
    e.preventDefault();
    const selectedSymbol = e.currentTarget.id;

    fetch(
      `${config.NEWS_API_ENDPOINT}/search?q=${selectedSymbol}&lang=en&sortby=publishedAt&country=us&token=${config.NEWS_API_KEY}`,
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
      .then(context.setNews)
      .then(context.setGraphTicker(selectedSymbol))
      .then(context.getGraphData(selectedSymbol))
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });

    fetch(
      `${config.DATA_API_ENDPOINT}&symbol=${selectedSymbol}&apikey=${config.DATA_API_KEY}`,
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
      .then(context.setGraphTickerPrice)
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
  };

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
        message.success('Symbol successfully deleted!');
        window.location.reload();
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
          <div key={symbol.id} id={symbol.symbol}>
            {context.editing ? (
              <WatchListContainer key={symbol.id} id={symbol.symbol}>
                <RiDeleteBin2Fill
                  onClick={onDelete}
                  id={symbol.id}
                  style={{
                    cursor: 'pointer',
                    fontSize: 20,
                    outline: 'none',
                    backgroundColor: 'rgb(27, 29, 30)',
                    border: 'none',
                    padding: 0,
                  }}
                />
                <WatchListItems>{symbol.symbol}</WatchListItems>
              </WatchListContainer>
            ) : (
              <WatchListContainer
                onClick={listOnSelect}
                key={symbol.id}
                id={symbol.symbol}
              >
                <WatchListItems>{symbol.symbol}</WatchListItems>
                {context.closePrice.map((price) => {
                  return price.symbol === symbol.symbol ? (
                    <>
                      <div>
                        <WatchListItems>
                          {price.previousClose > price.price ? (
                            <div style={{ color: 'red' }}>
                              {formatter.format(price.price)}
                            </div>
                          ) : (
                            <div style={{ color: 'rgb(40, 199, 145)' }}>
                              {formatter.format(price.price)}
                            </div>
                          )}
                        </WatchListItems>
                      </div>
                      <div>
                        <WatchListItems>
                          {price.previousClose > price.price ? (
                            <div style={{ color: 'red' }}>
                              {price.change.slice(0, 5)}%
                            </div>
                          ) : (
                            <div style={{ color: 'rgb(40, 199, 145)' }}>
                              +{price.change.slice(0, 4)}%
                            </div>
                          )}
                        </WatchListItems>
                      </div>
                    </>
                  ) : (
                    ''
                  );
                })}
              </WatchListContainer>
            )}
          </div>
        );
      })}
    </>
  );
}
export default WatchListItem;
