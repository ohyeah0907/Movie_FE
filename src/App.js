import './App.css';
import React from 'react';
import { Default } from './layout/Default';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { AdminPage } from './page/admin-page/AdminPage';
function App() {
  // Test component
  return (
    <div className="App">
      <Default />
      {/* <AdminPage /> */}
    </div>
  );
}

export default App;
