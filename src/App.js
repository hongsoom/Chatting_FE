import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import GlobalStyles from "./components/share/GlobalStyles";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
