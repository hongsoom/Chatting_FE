import React, { useState } from "react";
import styled from "styled-components";
import Manual from "../components/share/Manual";
import Login from "../components/landingpage/Login";
import Signup from "../components/landingpage/Signup";

function LandingPage() {
  const [isClient, setIsClient] = useState(false);
  const checkClient = () => {
    setIsClient(!isClient);
  };
  return (
    <LandingPageWrap>
      <ManualWrap>
        <Manual />
      </ManualWrap>
      {!isClient ? (
        <div>
          <Login checkClient={checkClient} />
        </div>
      ) : (
        <div>
          <Signup checkClient={checkClient} />
        </div>
      )}
    </LandingPageWrap>
  );
}

const LandingPageWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const ManualWrap = styled.div`
  height: 100%;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export default LandingPage;
