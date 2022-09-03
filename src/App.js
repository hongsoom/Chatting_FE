import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./redux/modules/user";
import { Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage";

function App() {
  const dispatch = useDispatch();

  const myInfo = useSelector((state) => state.user.myinfo);

  useEffect(() => {
    dispatch(userActions.myInfoDB());
  }, []);

  return (
    <div className="App" style={{ position: "relative" }}>
      <Routes>
        <Route path="/mypage" element={<MyPage myInfo={myInfo} />} />
      </Routes>
    </div>
  );
}

export default App;
