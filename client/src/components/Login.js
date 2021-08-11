import React, { useState, useEffect } from "react";
import styled from "styled-components";
import usePasswordValidator from "./usePasswordValidator";
import { validateEmail } from "./utils";
import { NavLink, useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const handleUrl = () => {
    if (!email) {
      setEmailError("enter email");
    }
    if (!password) {
      setPassword("enter password");
    } else {
      return history.push("/login-success-page");
    }
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword, passwordError] = usePasswordValidator({
    min: 8,
    max: 15,
  });
  useEffect(() => {
    if (!email) {
      setEmailError("");
    } else {
      if (validateEmail(email)) {
        setEmailError("");
      } else {
        setEmailError("Please enter a valid email.");
      }
    }
  }, [email]);

  const submitLogin = (email, password) => {
    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((e) => {});
  };

  return (
    <Wrapper>
      <form
        onSubmit={() => {
          submitLogin(email, password);
          handleUrl(email, password);
        }}
      >
        <Heading>Login</Heading>
        <StyledInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <Error>{emailError}</Error>

        <StyledInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Error>{passwordError}</Error>

        <StyledButton type="submit">Confirm</StyledButton>
        <StyledLink exact to="/signup-page">
          <div style={{ fontSize: "10px", margin: "10px" }}>
            [ Create Account ]
          </div>
        </StyledLink>
      </form>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  text-align: center;
  font-family: "Roboto", sans-serif;
  width: 100vw;
  margin: 32px auto;
  offset: 32px;
  max-width: 400px;
  padding: 24px;
  background-image: radial-gradient(
    circle 534px at 7.8% 17.6%,
    rgba(254, 253, 112, 1) 1.7%,
    rgba(248, 143, 111, 1) 91.8%
  );

  border-radius: 16px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
`;

const Heading = styled.h1`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  color: black;
  text-align: center;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
`;

const StyledInput = styled.input`
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid lightgray;
  margin: 5px;
  margin-bottom: 0px;
  padding: 5px 10px;
  width: 250px;
  height: 30px;
`;

const StyledButton = styled.button`
  display: inline-block;
  padding: 0.5em 1.7em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgb(255, 255, 255);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  background-color: #fbab7e;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
  text-shadow: 0 0.04em 0.04em rgba(255, 255, 255, 0.253);
  text-align: center;
  transition: all 0.2s;
  &:hover {
    color: white;
    background-color: rgb(255, 255, 255);
  }
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
  height: 8px;
  font-size: 15px;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover {
    color: red;
  }
`;
