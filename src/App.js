import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "./redux/modules/user";
import Main from "./pages/Main";
import GlobalStyles from "./components/share/GlobalStyles";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.myInfoDB());
  }, [dispatch]);

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
