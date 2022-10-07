import './App.css';
import React from 'react';
// import { Default } from './layout/Default';
import { Item } from './component/item/Item';

function App() {
  // Test component
  const movie = {
    name: 'Bullet Train',
    poster:
      'https://image.tmdb.org/t/p/original/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg',
    backdrop:
      'https://image.tmdb.org/t/p/original/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg',
    rating: 5,
    star: 5,
    genres: ['action', 'comedy'],
    overview:
      "As a shocking truth about a couple's families emerges, the two lovers discover they are not so different from each other. Tessa is no longer the sweet, simple, good girl she was when she met Hardin — any more than he is the cruel, moody boy she fell so hard for.",
  };
  return (
    <div className="App">
      {/* <Default /> */}
      <div style={{ width: '40%', height: '350px' }}>
        <Item movie={movie} showOverview layoutSecond />
      </div>
    </div>
  );
}

export default App;
