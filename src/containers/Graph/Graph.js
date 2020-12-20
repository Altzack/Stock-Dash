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
    height: 250px;
  }
  @media (min-width: 350px) {
    height: 300px;
  }
  @media (min-width: 600px) {
    height: 350px;
  }
`;

const GraphTitle = styled.div`
  padding: 10px;
  color: #e8e6e3;

  @media (min-width: 300px) {
    width: 320px;
    font-size: 20px;
  }
  @media (min-width: 600px) {
    width: 550px;
    font-size: 25px;
  }
  @media (min-width: 900px) {
    font-size: 27px;
    width: 800px;
  }
`;

export default function Graph() {
  const context = useContext(AppContext);

  const data = [
    { year: '1991', price: 3 },
    { year: '1992', price: 4 },
    { year: '1993', price: 3.5 },
    { year: '1994', price: 5 },
    { year: '1993', price: 6 },
    { year: '1994', price: 8 },
    { year: '1995', price: 10 },
    { year: '1996', price: 6 },
    { year: '1997', price: 8 },
    { year: '1998', price: 12 },
    { year: '1999', price: 10 },
  ];
  const config = {
    data,
    padding: 'auto',
    xField: 'year',
    autoFit: 'true',
    yField: 'price',

    color: 'rgb(40, 199, 145)',
    // point: {
    //   size: 5,
    // },
  };

  return (
    <PageContainer>
      <GraphTitle>
        {context.graphTicker.length !== 0 ? (
          context.graphTicker
        ) : (
          <GraphTitle>AAPL</GraphTitle>
        )}
      </GraphTitle>
      <Line className="lineGraph" {...config} />
    </PageContainer>
  );
}
