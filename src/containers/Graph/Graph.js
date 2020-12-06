import React from 'react';
import styled from 'styled-components/macro';

const GraphContainer = styled.div`
  align-items: center;
  justify-content: center;
  padding: 200px;
  display: flex;
  background-color: #333;
  margin-bottom: 30px;
  margin-top: 30px;
  :hover {
    background-color: #333;
  }
  @media (min-width: 300px) {
    width: 320px;
    padding: 120px;
  }
  @media (min-width: 600px) {
    width: 500px;
    padding: 200px;
  }
  @media (min-width: 900px) {
    width: 800px;
  }
`;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
`;

export default function Graph() {
  return (
    <PageContainer>
      <GraphContainer></GraphContainer>
    </PageContainer>
  );
}