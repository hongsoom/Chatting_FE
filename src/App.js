import React from "react";
import { Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default App;
