import React, { useState } from "react";
import Login from "../components/landingpage/Login";

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
        <div></div>
      )}
    </>
  );
}

export default LandingPage;
