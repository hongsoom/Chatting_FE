import React from "react";
import { Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
