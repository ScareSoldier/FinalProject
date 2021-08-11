import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import usePasswordValidator from "./usePasswordValidator";
import { validateEmail } from "./utils";
import { NavLink, useHistory } from "react-router-dom";
import { CurrentUserContext } from "./UserContext";

const SignUpPage = () => {
  const history = useHistory();

  const handleUrl = () => {
    if (!email) {
      setEmailError("enter email");
    }
    if (!confirmPassword) {
      setConfirmPassword("enter password");
    } else {
      return history.push("/signup-success-page");
    }
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { email1, password1, setEmail1, setPassword1 } =
    useContext(CurrentUserContext);

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

  useEffect(() => {
    if (!confirmPassword || !password) {
      setConfirmPasswordError("");
    } else {
      if (password !== confirmPassword) {
        setConfirmPasswordError("The passwords must match.");
      } else {
        setConfirmPasswordError("");
      }
    }
  }, [password, confirmPassword]);

  const createAccount = (email1, password1) => {
    console.log(email1);
    fetch("/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email1, password: password1 }),
    })
      .then((response) => response.json())
      .then((data) => {});
  };

  return (
    <Wrapper>
      <form
        onSubmit={() => {
          createAccount(email1, password1);
          handleUrl(email1, password1);
        }}
      >
        <Heading>Sign Up</Heading>
        <StyledInput
          value={email1}
          onChange={(e) => setEmail1(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <Error>{emailError}</Error>

        <StyledInput
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Error>{passwordError}</Error>

        <StyledInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
        />
        <Error>{confirmPasswordError}</Error>
        <StyledButton type="submit">Create</StyledButton>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  font-family: "Roboto", sans-serif;
  width: 100vw;
  margin: 32px auto;
  offset: 32px;
  max-width: 400px;
  padding: 24px;
  background-image: linear-gradient(
    109.6deg,
    rgba(255, 207, 84, 1) 11.2%,
    rgba(255, 158, 27, 1) 91.1%
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
  color: black;
  margin-bottom: 10px;
  height: 8px;
  font-size: 15px;
`;

// const StyledLink = styled(NavLink)`
//   text-decoration: none;
// `;

export default SignUpPage;
