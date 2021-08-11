import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// import LoginButton from "./LoginButton";
// import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  //   const { user, isAuthenticated, isLoading } = useAuth0();
  //   console.log(isAuthenticated);
  return (
    <Fragment>
      <Title>Track Calories</Title>
      <Wrapper>
        <StyledLink exact to="/calorie-tracker">
          <Button>GET STARTED!</Button>
        </StyledLink>
      </Wrapper>
    </Fragment>
  );
};

const Wrapper = styled.div`
  text-align: center;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 85vh;
`;

const Title = styled.h1`
  text-align: center;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #febe10;
  font-size: 3em;
  background: linear-gradient(
    90deg,
    rgba(1, 0, 14, 1) 0%,
    rgba(19, 14, 1, 1) 35%,
    rgba(255, 170, 0, 1) 100%
  );
`;

const Button = styled.button`
  background-color: orange;
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: black;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  transition: all 0.2s;
  &:hover {
    border-color: rgba(255, 255, 255, 1);
    color: white;
    cursor: pointer;
    transform: translateY(-15px);
  }
`;

const StyledLink = styled(NavLink)``;

export default HomePage;
