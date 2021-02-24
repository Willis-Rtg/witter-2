import React, { useState } from "react";
import useInput from "hooks/useInput";
import { authService } from "../firebase";

export const AuthForm = () => {
  const email = useInput("");
  const password = useInput("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      newAccount
        ? (data = await authService.createUserWithEmailAndPassword(
            email.value,
            password.value
          ))
        : (data = await authService.signInWithEmailAndPassword(
            email.value,
            password.value
          ));
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value=""
          {...email}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value=""
          {...password}
          placeholder="Password"
          required
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign in"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
    </>
  );
};
