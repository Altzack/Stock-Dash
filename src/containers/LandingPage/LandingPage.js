import React from 'react';
import NewsList from '../NewsList/NewsList';
import Graph from '../Graph/Graph';
import WatchList from '../WatchList/WatchList';

function LandingPage() {
  return (
    <div style={{ color: '#000', backgroundColor: 'rgb(27, 29, 30)' }}>
      <div>
        <Graph />
      </div>
      <div>
        <WatchList />
      </div>
      <div>
        <NewsList />
      </div>
    </div>
  );
}

export default LandingPage;
