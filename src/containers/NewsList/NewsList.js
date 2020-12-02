import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import AppContext from '../../AppContext';
import Loader from '../common/Loader/Loader';
import '../../App.css';
import moment from 'moment';

const NewsContainer = styled.article`
  align-items: center;
  justify-content: center;
  padding: 50px;
  display: flex;
  margin: -1px -24px;
  border-bottom: 1px solid #000;
  padding: 8px 10px;
  :hover {
    background-color: #eee;
  }
  @media (min-width: 300px) {
    width: 300px;
  }
  @media (min-width: 600px) {
    width: 500px;
  }
  @media (min-width: 900px) {
    width: 600px;
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

const NewsTitle = styled.div`
  border-bottom: 1px solid #000;
  padding: 10px;
  @media (min-width: 300px) {
    width: 300px;
    font-size: 20px;
  }
  @media (min-width: 600px) {
    width: 500px;
    font-size: 25px;
  }
  @media (min-width: 900px) {
    font-size: 27px;
    width: 600px;
  }
`;

const Title = styled.div`
  font-family: Rubik;
  font-weight: 300;
  text-align: left;
  font-size: 16px;
  text-transform: capitalize;
  color: #000;
  margin-bottom: 10px;
  @media (min-width: 300px) {
    font-size: 10px;
    width: 200px;
  }
  @media (min-width: 600px) {
    font-size: 12px;
    width: 350px;
  }
  @media (min-width: 900px) {
    font-size: 15px;
    width: 600px;
  }
`;

const SubTitle = styled.div`
  font-family: Rubik;
  color: #000;
  font-weight: 400;
  text-align: left;
  max-width: 500px;
  margin-top: 5px;
  font-size: 10px;
  margin-bottom: 10px;
  @media (min-width: 300px) {
    font-size: 8px;
  }
  @media (min-width: 600px) {
    font-size: 11px;
  }
  @media (min-width: 900px) {
    font-size: 13px;
  }
`;

const NewsImg = styled.img`
  width: 100px;
  margin-left: 10px;
  @media (min-width: 300px) {
    width: 80px;
  }
`;

const Modified = styled.div`
  margin-top: 10px;
  @media (min-width: 300px) {
    font-size: 8px;
  }
  @media (min-width: 600px) {
    font-size: 11px;
  }
  @media (min-width: 900px) {
    font-size: 13px;
  }
`;

export default class NewsList extends React.Component {
  static contextType = AppContext;

  render() {
    if (this.context.loading === true)
      return (
        <div style={{ marginTop: 150 }}>
          <Loader />
        </div>
      );

    const list = this.context.news.map((newsObj) => {
      return (
        <a href={newsObj.url}>
          <NewsContainer className="drink" id={newsObj.source.id}>
            <Title>
              <SubTitle>{newsObj.author}</SubTitle>
              {newsObj.title}
              <Modified>
                {moment(newsObj.publishedAt).format('MMM Do YY')}
              </Modified>
            </Title>
            <div>
              <NewsImg alt="cover" src={newsObj.urlToImage} />
            </div>
          </NewsContainer>
        </a>
      );
    });
    return (
      <PageContainer className="newslist">
        <NewsTitle>News</NewsTitle>
        {list}
      </PageContainer>
    );
  }
}
