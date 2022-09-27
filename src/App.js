import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./redux/modules/user";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";
import MyPage from "./pages/MyPage";
import GlobalStyles from "./components/share/GlobalStyles";

function App() {
  const dispatch = useDispatch();

  const [info, setInfo] = useState(false);

  const myInfo = useSelector((state) => state.user.myinfo);

  useEffect(() => {
    dispatch(userActions.myInfoDB());
  }, [info]);

  return (
    <div className="App" style={{ position: "relative" }}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/mypage"
          element={<MyPage myInfo={myInfo} setInfo={setInfo} />}
        />
        <Route path="/chat" element={<Chat myInfo={myInfo} />} />
        <Route path="/chat/:id" element={<Chat myInfo={myInfo} />} />
      </Routes>
    </div>
  );
}

export default App;
