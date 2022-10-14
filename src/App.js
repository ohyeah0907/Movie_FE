import "./App.css";
import React from "react";
import { Default } from "./layout/Default";
import { AdminPage } from "./page/admin-page/AdminPage";
import GlobalStyles from "./component/GlobalStyles";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  // Test component
  return (
    <GlobalStyles>
      <div className="App">
        <Default />
        {/* <AdminPage /> */}
      </div>
    </GlobalStyles>
  );
}

export default App;
