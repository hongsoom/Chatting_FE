import React, { useState } from "react";
import Signup from "../components/landingpage/Signup";

function LandingPage() {
  const [isClient, setIsClient] = useState(false);
  const checkClient = () => {
    setIsClient(!isClient);
  };
  return (
    <>
      {!isClient ? (
        <div></div>
      ) : (
        <div>
          <Signup checkClient={checkClient} />
        </div>
      )}
    </>
  );
}

export default LandingPage;
