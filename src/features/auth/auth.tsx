import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import Button from "../../components/Button";
import Input from "../../components/Input";

import Wrapper from "../../components/Wrapper";
import { authAsync, selectError } from "./authSlice";

import styles from "./auth.module.css";

const Auth = () => {
  const [email, setEmail] = useState("borgoth@mordos.com"); //TODO: delete default
  const [password, setPassword] = useState("12bindthem");
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  const handleAuth = () => {
    const body = { email, password };

    dispatch(authAsync(body)).then(() => {
      setEmail("");
      setPassword("");
      history("/");
    });
  };
  return (
    <Wrapper>
      <h1>Authorization</h1>
      <Input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <Button type="submit" onClick={handleAuth} value="Auth" />
      {error && <p className={styles.error}>{error}</p>}
    </Wrapper>
  );
};

export default Auth;
