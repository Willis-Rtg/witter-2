import React, { useEffect, useState } from "react";
import Router from "./Router";
import { authService } from "../firebase";
import styled from "styled-components";

const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else setIsLoggedIn(false);
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <AppWrapper>
      <Router
        isLoggedIn={isLoggedIn}
        userObj={userObj}
        refreshUser={refreshUser}
      />
      <footer>&copy; {new Date().getFullYear()} Witter</footer>
    </AppWrapper>
  );
}

export default App;
