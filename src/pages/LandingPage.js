import React, { useState } from "react";
import styled from "styled-components";
import Login from "../components/landingpage/Login";
import Signup from "../components/landingpage/Signup";

function LandingPage() {
  const [isClient, setIsClient] = useState(false);
  const checkClient = () => {
    setIsClient(!isClient);
  };
  return (
    <LandingPageWrap>
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
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 10px #dcdcdc;
  max-width: 400px;
  height: 700px;
  width: 100%;
  top: 100px;
  left: 50%;
  transform: translate(-50%, 0%);
`;

export default LandingPage;
