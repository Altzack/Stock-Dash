import React from 'react';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';
import Loader from '../common/Loader/Loader';
import '../../App.css';
import moment from 'moment';
import { message } from 'antd';

const NewsContainer = styled.article`
  align-items: center;
  justify-content: center;
  padding: 50px;
  display: flex;
  margin: -1px -24px;
  border-bottom: 1px solid #e8e6e3;
  padding: 8px 10px;
  :hover {
    background-color: rgb(40, 47, 51);
  }
  @media (min-width: 300px) {
    width: 320px;
  }
  @media (min-width: 600px) {
    width: 550px;
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
  background-color: rgb(27, 29, 30);
`;

const NewsTitle = styled.div`
  border-bottom: 1px solid #e8e6e3;
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

const Title = styled.div`
  font-family: Rubik;
  font-weight: 300;
  text-align: left;
  font-size: 16px;
  text-transform: capitalize;
  color: #e8e6e3;
  margin-bottom: 10px;
  @media (min-width: 300px) {
    font-size: 11px;
    width: 200px;
  }
  @media (min-width: 600px) {
    font-size: 13px;
    width: 350px;
  }
  @media (min-width: 900px) {
    font-size: 14px;
    width: 600px;
  }
`;

const SubTitle = styled.div`
  font-family: Rubik;
  color: #e8e6e3;
  font-weight: 400;
  text-align: left;
  max-width: 500px;
  margin-top: 5px;
  font-size: 10px;
  margin-bottom: 10px;
  @media (min-width: 300px) {
    font-size: 12px;
  }
  @media (min-width: 600px) {
    font-size: 14px;
  }
  @media (min-width: 900px) {
    font-size: 15px;
  }
`;

const NewsImg = styled.img`
  width: 100px;
  margin-left: 10px;
  @media (min-width: 300px) {
    width: 80px;
  }
`;

const StyledButton = styled.button`
  color: #fff;
  font-weight: 500;
  height: 33px;
  outline: none;
  background-color: rgb(40, 199, 145);
  width: 120px;
  margin-left: 10px;
  transition: all 0.1s ease-in-out;
  border: 1px solid rgba(0, 0, 0, 0.21);
  border-bottom: 4px solid rgba(0, 0, 0, 0.21);
  border-radius: 4px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  :hover {
    transition: all 0.1s ease-in-out;
    background-color: rgb(48, 240, 176);
    cursor: pointer;
  }
`;

const Modified = styled.div`
  margin-top: 10px;
  color: #e8e6e3;

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

export default class NewsList extends React.Component {
  static contextType = AppContext;

  noNewsFound = () => {
    message.error(`No news found for selected symbol`);
    this.context.getNews();
  };

  render() {
    if (this.context.loading === true)
      return (
        <div style={{ marginTop: 150 }}>
          <Loader />
        </div>
      );

    const list = this.context.news.map((newsObj) => {
      return (
        <a href={newsObj.url} target="_blank" rel="noopener noreferrer">
          <NewsContainer className="drink">
            <Title>
              <SubTitle>{newsObj.source.name}</SubTitle>
              {newsObj.title}
              <Modified>
                {moment(newsObj.publishedAt).format('MMM Do YY')}
              </Modified>
            </Title>
            {newsObj.image ? (
              <div>
                <NewsImg alt="cover" src={newsObj.image} />
              </div>
            ) : (
              <div>
                <NewsImg alt="cover" src="/placeholderchart-min.jpg" />
              </div>
            )}
          </NewsContainer>
        </a>
      );
    });

    return (
      <PageContainer className="newslist">
        <NewsTitle>News</NewsTitle>
        {this.context.news.length !== 0 ? (
          list
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ padding: 10, color: '#fff' }}>
              No news found for that symbol...
            </h1>
            <StyledButton onClick={this.context.getNews}>
              General News
            </StyledButton>
          </div>
        )}
      </PageContainer>
    );
  }
}
