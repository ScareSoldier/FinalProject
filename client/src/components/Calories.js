import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { TrackerContext } from "./TrackerContext";

const Calories = () => {
  const APP_ID = "d6ce1c61";
  const APP_KEY = "6f6668f6021dca4b33e8aed63afe75ae";

  const [foodCals, setFoodCals] = useState(undefined);
  const [suggestion, setSuggestion] = useState(null);
  const [foodMacro, setFoodMacro] = useState(undefined);

  const { trackerItems, setTrackerItems, handleTrackItem } =
    useContext(TrackerContext);

  useEffect(() => {}, []);

  const suggestionHandler = (ev) => {
    // ev.preventDefault();
    let form = document.forms.searchBTN.elements;
    let fullForm = {};
    for (let i = 0; i < form.length; i++) {
      let key = form[i].name;
      let value = form[i].value;
      fullForm[key] = value;
    }
    console.log(fullForm.searchterm);

    fetch("http://localhost:5000/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchTerm: fullForm.searchterm,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSuggestion(data);
      });
  };
  // console.log(suggestion);
  // console.log(suggestion.suggestions);

  const GetNutrition = async (ev) => {
    ev.preventDefault();
    const searchTerm = ev.target.searchterm.value;
    console.log(searchTerm);
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&nutrition-type=logging&ingr=${searchTerm}`
    );
    const data = await response.json();
    setFoodCals(data.totalNutrients);
    console.log(data.totalNutrients);
  };

  const GetSuggestion = async (searchTerm) => {
    // ev.preventDefault();
    // const searchTerm = ev.target.searchterm.value;
    console.log(searchTerm);
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&nutrition-type=logging&ingr=${searchTerm}`
    );
    const data = await response.json();
    setFoodCals(data.totalNutrients);
    console.log(data.totalNutrients);
    console.log(data);
    setFoodMacro({ id: searchTerm, ...data.totalNutrients });
    //data.totalNutrients gives macros
  };

  return (
    <Wrapper>
      <StyledForm id="searchBTN" onSubmit={GetNutrition}>
        <StyledInput
          onChange={(ev) => {
            suggestionHandler(ev.target.value);
          }}
          type="text"
          name="searchterm"
        />
        {suggestion && (
          <SuggestionTab>
            {suggestion.suggestions.map((item) => {
              return (
                <Suggest
                  onClick={() => {
                    GetSuggestion(item);
                  }}
                >
                  {item}
                </Suggest>
              );
            })}
          </SuggestionTab>
        )}
        <StyledButton type="submit" onClick={suggestionHandler}>
          Search
        </StyledButton>
      </StyledForm>
      {foodCals && (
        <StyledMacros>
          <h3
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              color: "orange",
            }}
          >
            Protein:
          </h3>
          {foodCals.PROCNT ? foodCals.PROCNT.quantity.toFixed(0) : "0"} Grams
          <h3
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              color: "orange",
            }}
          >
            Fat:
          </h3>
          {foodCals.FAT ? foodCals.FAT.quantity.toFixed(0) : "0"} Grams
          <h3
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              color: "orange",
            }}
          >
            Carbs:
          </h3>
          {foodCals.CHOCDF ? foodCals.CHOCDF.quantity.toFixed(0) : "0"} Grams
          <h3
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              color: "orange",
            }}
          >
            Total Calories:
          </h3>
          {foodCals.ENERC_KCAL.quantity.toFixed(0)} calories
        </StyledMacros>
      )}
      <StyledLink
        onClick={() => {
          console.log(foodMacro);
          setTrackerItems([...trackerItems, foodMacro]);
        }}
        exact
        to="/calorie-tracker"
      >
        <Button
          style={{
            marginBottom: "10px",
            marginTop: "20px",
          }}
        >
          Add To Tracker!
        </Button>
      </StyledLink>
    </Wrapper>
  );
};
//button needs an onclick function adding to food tracker

const Wrapper = styled.div`
  text-align: center;
  font-family: "fantasy";
  width: 100vw;
  margin: 32px auto;
  offset: 32px;
  max-width: 400px;
  padding: 24px;
  background-color: black;
  border-radius: 16px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
`;

const StyledForm = styled.form`
  text-align: center;
`;
const StyledInput = styled.input`
  font-family: "Roboto", sans-serif;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-transform: capitalize;
  text-align: center;
  color: black;
  outline: none;
  height: 30px;
  width: 200px;
  background: white;
  border: 2px solid black;
  text-shadow: 0;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    color: black;
    background: whitesmoke;
  }
`;
const StyledButton = styled.button`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  outline: none;
  height: 25px;
  text-align: center;
  width: 80px;
  background: orange;
  border: 2px solid black;
  color: black;
  text-shadow: 0;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    color: white;
    background: orange;
  }
`;
const StyledMacros = styled.div`
  color: white;
  text-align: center;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
`;

const Button = styled.button`
  margin-top: 20px;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  background-color: orange;
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgba(255, 255, 255, 0);
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
  }
`;

const StyledLink = styled(NavLink)``;

const SuggestionTab = styled.div`
  text-align: center;
  background-color: white;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
`;

const Suggest = styled.div`
  font-family: "Roboto", sans-serif;
  color: black;
  text-transform: capitalize;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  margin-bottom: 5px;
  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;

export default Calories;
