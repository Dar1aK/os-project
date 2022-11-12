import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import Button from "../../components/Button";
import Input from "../../components/Input";

import Wrapper from "../../components/Wrapper";
import { authAsync, selectError } from "./authSlice";

import styles from "./auth.module.css";

const Auth = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState("");
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClientError("");

    if (!login) {
      return setClientError("Login is required");
    }

    if (!password) {
      return setClientError("Password is required");
    }

    if (login.length < 10) {
      return setClientError("Login must be at least 6 characters");
    }

    if (password.length < 6) {
      return setClientError("Password must be at least 6 characters");
    }

    const body = { login, password };
    dispatch(authAsync(body)).then(() => {
      setLogin("");
      setPassword("");
      history("/");
    });
  };

  const commonError = clientError || error;

  return (
    <div className={styles.auth}>
      <Wrapper withoutHeader>
        <form className={styles.form} onSubmit={handleAuth}>
          <h1 className={styles.h1}>Authorization</h1>

          <Input
            placeholder="Login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value.trim())}
            className={styles.input}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            className={styles.input}
          />
          <Button type="submit" value="Auth" className={styles.button} />
          {commonError && <p className={styles.error}>{commonError}</p>}
        </form>
      </Wrapper>
    </div>
  );
};

export default Auth;
