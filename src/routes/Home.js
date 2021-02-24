import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";
import Weet from "components/Weet";
import WeetFactory from "components/WeetFactory";
import styled from "styled-components";

const HomeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ({ userObj }) => {
  const [weets, setWeets] = useState([]);
  useEffect(async () => {
    dbService.collection("weets").onSnapshot((snapshot) => {
      const weetObj = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWeets(weetObj);
    });
  }, []);
  return (
    <HomeWrapper>
      <WeetFactory userObj={userObj} />
      <ul>
        {weets.map((weet) => (
          <Weet
            key={weet.id}
            weet={weet}
            isOwner={weet.creatorId === userObj.uid}
          />
        ))}
      </ul>
    </HomeWrapper>
  );
};
