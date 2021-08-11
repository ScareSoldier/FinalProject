import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DiAtom } from "react-icons/di";

const Header = () => {
  return (
    <Fragment>
      <StyledHeader>
        <StyledLink
          to="/"
          style={{
            color: "orange",
            textDecoration: "none",
            marginRight: "100px",
          }}
        >
          FitX
          <DiAtom style={{ color: "white", fontSize: "30px" }} />
        </StyledLink>
        <div
          style={{
            width: "600px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            fontFamily: "Roboto",
          }}
        >
          <StyledLinks
            to="/food-guide:id"
            style={{
              color: "orange",
              textDecoration: "none",
              marginRight: "20px",
              marginLeft: "20px",
            }}
          >
            Quick Search
          </StyledLinks>
          <StyledLinks
            to="/calorie-tracker"
            style={{
              color: "orange",
              textDecoration: "none",
              marginRight: "20px",
            }}
          >
            Calorie Tracker
          </StyledLinks>
          <StyledLinks
            to="/community-page"
            style={{
              color: "orange",
              textDecoration: "none",
              marginRight: "20px",
            }}
          >
            Community
          </StyledLinks>
          <StyledLinks
            to="/login-page"
            style={{
              color: "orange",
              textDecoration: "none",
              marginRight: "20px",
            }}
          >
            Login
          </StyledLinks>
        </div>
      </StyledHeader>
    </Fragment>
  );
};

const StyledHeader = styled.header`
  font-family: "Roboto", sans-serif;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100vw;
  font-weight: bold;
  position: sticky;
  top: 0;
  background: linear-gradient(
    90deg,
    rgba(1, 0, 14, 1) 0%,
    rgba(19, 14, 1, 1) 35%,
    rgba(255, 170, 0, 1) 100%
  );
`;

const StyledLink = styled(Link)`
  font-family: "Roboto", sans-serif;
  margin-left: 50px;
  font-size: 40px;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
`;

const StyledLinks = styled(Link)`
  font-family: "Roboto", sans-serif;
  background-color: black;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: white;
  text-align: center;
  transition: all 0.2s;
  &:hover {
    color: #00b0ff;
    background-color: white;
  }
`;

export default Header;
