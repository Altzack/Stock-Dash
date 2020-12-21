import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { Line } from '@ant-design/charts';
import '../../App.css';
import AppContext from '../../AppContext';

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex-direction: column;
  margin-bottom: 30px;
  @media (min-width: 300px) {
    height: 275px;
  }
  @media (min-width: 350px) {
    height: 300px;
  }
  @media (min-width: 600px) {
    height: 350px;
  }
`;

const GraphTitle = styled.h1`
  color: #e8e6e3;
  margin-left: 10px;
  margin-bottom: 0px;
  @media (min-width: 300px) {
    font-size: 20px;
  }
  @media (min-width: 400px) {
  }
  @media (min-width: 600px) {
    font-size: 25px;
    margin-left: 20px;
  }
  @media (min-width: 900px) {
    font-size: 27px;
  }
`;

export default function Graph() {
  const context = useContext(AppContext);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const data = context.graphData;
  const config = {
    data,
    padding: 'auto',
    xField: 'date',
    autoFit: 'true',
    yField: 'price',
    xAxis: {
      tickCount: 8,
    },
    color:
      context.graphTickerPrice['08. previous close'] >
      context.graphTickerPrice['05. price']
        ? 'rgb(255,80,0)'
        : 'rgb(40, 199, 145)',
  };

  return (
    <PageContainer>
      <div
        className="graphDiv"
        style={{
          justifyContent: 'left',
          marginTop: 10,
        }}
      >
        <GraphTitle>
          {context.graphTicker ? context.graphTicker : ''}
        </GraphTitle>
        <GraphTitle>
          {context.graphTickerPrice['08. previous close'] >
          context.graphTickerPrice['05. price'] ? (
            <>
              <div style={{ color: 'rgb(255,80,0)' }}>
                {formatter.format(context.graphTickerPrice['05. price'])}
              </div>
              <div className="symbolChange" style={{ color: 'rgb(255,80,0)' }}>
                {formatter.format(context.graphTickerPrice['09. change'])} Today
              </div>
            </>
          ) : (
            <>
              <div style={{ color: 'rgb(40, 199, 145)' }}>
                {formatter.format(context.graphTickerPrice['05. price'])}
              </div>
              <div
                className="symbolChange"
                style={{ color: 'rgb(40, 199, 145)' }}
              >
                +{formatter.format(context.graphTickerPrice['09. change'])}{' '}
                Today
              </div>
            </>
          )}
        </GraphTitle>
      </div>
      <Line className="lineGraph" {...config} />
    </PageContainer>
  );
}
