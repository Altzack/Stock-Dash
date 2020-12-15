// import React, { useContext } from 'react';
// import styled from 'styled-components/macro';
// import AppContext from '../../AppContext';
// import Loader from '../common/Loader/Loader';
// import '../../App.css';
// import moment from 'moment';
// import { message } from 'antd';

// export default function NewsPage() {
//   const context = useContext(AppContext);

//   if (this.context.loading === true)
//     return (
//       <div style={{ marginTop: 150 }}>
//         <Loader />
//       </div>
//     );

//   const list = this.context.news.map((newsObj) => {
//     return (
//       <a href={newsObj.url} target="_blank" rel="noopener noreferrer">
//         <NewsContainer className="drink">
//           <Title>
//             <SubTitle>{newsObj.source.name}</SubTitle>
//             {newsObj.title}
//             <Modified>
//               {moment(newsObj.publishedAt).format('MMM Do YY')}
//             </Modified>
//           </Title>
//           {newsObj.image ? (
//             <div>
//               <NewsImg alt="cover" src={newsObj.image} />
//             </div>
//           ) : (
//             <div>
//               <NewsImg alt="cover" src="/placeholderchart-min.jpg" />
//             </div>
//           )}
//         </NewsContainer>
//       </a>
//     );
//   });

//   return (
//     <PageContainer className="newslist">
//       <NewsTitle>News</NewsTitle>
//       {this.context.news.length !== 0 ? (
//         list
//       ) : (
//         <div style={{ textAlign: 'center' }}>
//           <h1 style={{ color: '#fff' }}>No news found for that symbol...</h1>
//           <StyledButton onClick={this.context.getNews}>
//             General News
//           </StyledButton>
//         </div>
//       )}
//     </PageContainer>
//   );
// }
