import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./pages/Main";
import GlobalStyles from "./components/share/GlobalStyles";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
