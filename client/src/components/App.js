import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Calories from "./Calories";
import HomePage from "./HomePage";
import GlobalStyle from "./GlobalStyle";
import CalorieTracker from "./CalorieTracker";
import Login from "./Login";
import CommunityPage from "./CommunityPage";
import SignUpPage from "./SignUpPage";
import LoginSuccessPage from "./LoginSuccessPage";
import SignUpSuccessPage from "./SignUpSuccessPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Wrapper>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/food-guide:id">
              <Calories />
            </Route>
            <Route exact path="/calorie-tracker">
              <CalorieTracker />
            </Route>
            <Route exact path="/community-page">
              <CommunityPage />
            </Route>
            <Route exact path="/login-page">
              <Login />
            </Route>
            <Route exact path="/signup-page">
              <SignUpPage />
            </Route>
            <Route exact path="/login-success-page">
              <LoginSuccessPage />
            </Route>
            <Route exact path="/signup-success-page">
              <SignUpSuccessPage />
            </Route>
          </Switch>
        </Wrapper>
      </BrowserRouter>
    </div>
  );
};

export default App;

const Wrapper = styled.div``;
