import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SignUpSuccessPage = () => {
  return (
    <Wrapper>
      <Heading>Thank You For Joining FitX</Heading>
      <StyledLink exact to="/">
        <div style={{ fontSize: "15px", margin: "10px" }}>[ Back ]</div>
      </StyledLink>
    </Wrapper>
  );
};

export default SignUpSuccessPage;

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

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: blue;
  &:hover {
    color: red;
  }
`;
