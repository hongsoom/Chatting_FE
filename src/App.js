import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Main from "./pages/Main";
import Signup from "./components/landingpage/Signup";
import GlobalStyles from "./components/share/GlobalStyles";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
