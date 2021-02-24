import React, { useEffect } from "react";
import { authService, dbService } from "../firebase";
import { useHistory } from "react-router-dom";
import useInput from "hooks/useInput";

export default ({ userObj, refreshUser }) => {
  const history = useHistory();
  const newDisplayName = useInput(userObj.displayName);
  const onLogOut = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyWeets = async () => {
    const myWeets = await dbService
      .collection("weets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(myWeets.docs.map((doc) => doc.data()));
  };
  useEffect(getMyWeets, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName.value) {
      await userObj.updateProfile({ displayName: newDisplayName.value });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input {...newDisplayName} type="text" placeholder="Display name" />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOut}>Log out</button>
    </>
  );
};
