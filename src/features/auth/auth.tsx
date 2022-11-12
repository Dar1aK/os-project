import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import Button from "../../components/Button";
import Input from "../../components/Input";

import Wrapper from "../../components/Wrapper";
import { authAsync, selectError } from "./authSlice";

import styles from "./auth.module.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { email, password };

    dispatch(authAsync(body)).then(() => {
      setEmail("");
      setPassword("");
      history("/");
    });
  };
  return (
    <div className={styles.auth}>
      <Wrapper withoutHeader>
        <form className={styles.form} onSubmit={handleAuth}>
          <h1 className={styles.h1}>Authorization</h1>

          <Input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            className={styles.input}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            className={styles.input}
          />
          <Button type="submit" value="Auth" />
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </Wrapper>
    </div>
  );
};

export default Auth;
