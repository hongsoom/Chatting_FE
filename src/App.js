import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./redux/modules/user";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import GlobalStyles from "./components/share/GlobalStyles";

function App() {
  const dispatch = useDispatch();

  const myInfo = useSelector((state) => state.user.myinfo);

  useEffect(() => {
    dispatch(userActions.myInfoDB());
  }, []);

  return (
    <div className="App" style={{ position: "relative" }}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mypage" element={<MyPage myInfo={myInfo} />} />
        <Route path="/main" element={<Main myInfo={myInfo} />} />
      </Routes>
    </div>
  );
}

export default App;
