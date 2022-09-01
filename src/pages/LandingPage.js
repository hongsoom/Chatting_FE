import React, { useState } from "react";
import Login from "../components/landingpage/Login";
import Signup from "../components/landingpage/Signup";

function LandingPage() {
  const [isClient, setIsClient] = useState(false);
  const checkClient = () => {
    setIsClient(!isClient);
  };
  return (
    <>
      {!isClient ? (
        <div>
          <Login checkClient={checkClient} />
        </div>
      ) : (
        <div>
          <Signup checkClient={checkClient} />
        </div>
      )}
    </>
  );
}

export default LandingPage;
