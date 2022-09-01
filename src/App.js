import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "./redux/module/user";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.myInfoDB());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
