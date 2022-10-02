import './App.css';
import React from 'react';
import { Default } from './layout/Default';

function App() {
  const AppContext = React.createContext();

  return (
    <div className="App">
      <Default />
    </div>
  );
}

export default App;
