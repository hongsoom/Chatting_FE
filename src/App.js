import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import GlobalStyles from "./components/share/GlobalStyles";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
