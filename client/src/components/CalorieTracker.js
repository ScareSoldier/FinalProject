import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { TrackerContext } from "./TrackerContext";

const APP_ID = "d6ce1c61";
const APP_KEY = "6f6668f6021dca4b33e8aed63afe75ae";

const GetNutrition = async (item) => {
  const response = await fetch(
    `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&nutrition-type=logging&ingr=${item}`
  );
  const data = await response.json();
  return data.totalNutrients;
};

const CalorieTracker = () => {
  const { trackerItems } = useContext(TrackerContext);

  let sumEnergy = 0;
  trackerItems.forEach((item) => {
    sumEnergy += item.ENERC_KCAL.quantity;
  });

  let sumProtein = 0;
  trackerItems.forEach((item) => {
    sumProtein += item.PROCNT.quantity;
  });

  let sumCarbs = 0;
  trackerItems.forEach((item) => {
    sumCarbs += item.CHOCDF.quantity;
  });

  let sumFat = 0;
  trackerItems.forEach((item) => {
    sumFat += item.FAT.quantity;
  });

  return (
    <Wrapper>
      <Title>Calorie Tracker</Title>
      <Grid>
        <BreakFast>
          {trackerItems.length > 0 &&
            trackerItems.map((item) => {
              console.log(typeof item);
              return (
                <div>
                  <Macros>
                    <div>Food Name</div>
                    <div>Protein</div>
                    <div>Carbs</div>
                    <div>Fats</div>
                    <div>Calories</div>
                  </Macros>
                  <Values>
                    <FoodName>{item.id}</FoodName>
                    <div> {item.PROCNT.quantity.toFixed(0)} g </div>
                    <div> {item.CHOCDF.quantity.toFixed(0)} g </div>
                    <div> {item.FAT.quantity.toFixed(0)} g </div>
                    <div> {item.ENERC_KCAL.quantity.toFixed(0)} kcals </div>
                  </Values>
                </div>
              );
            })}
          <Totals>
            <div>
              <TotalHeading>Total Protein:</TotalHeading>
            </div>
            <div>
              <TotalHeading> Total Carbs:</TotalHeading>
            </div>
            <div>
              <TotalHeading>Total Fats:</TotalHeading>
            </div>
            <div>
              <TotalHeading>Total Calories:</TotalHeading>
            </div>
          </Totals>
          <TotalNumbers>
            <div>{sumProtein.toFixed(0)} g </div>
            <div> {sumCarbs.toFixed(0)} g </div>
            <div> {sumFat.toFixed(0)} g </div>
            <div> {sumEnergy.toFixed(0)} kcal </div>
          </TotalNumbers>
        </BreakFast>
      </Grid>
      {/* <StyledLink exact to="/community-page">
        <Button>Submit</Button>
      </StyledLink> */}
      <StyledLink exact to="/food-guide:id">
        <Button>Add Food +</Button>
      </StyledLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  font-family: "Roboto", sans-serif;
  width: 100vw;
  margin: 32px auto;
  offset: 32px;
  max-width: 600px;
  padding: 24px;
  background-image: linear-gradient(
    108.5deg,
    rgba(231, 69, 54, 0.82) 11.2%,
    rgba(255, 181, 17, 0.82) 68%
  );
  border-radius: 16px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
`;

const Grid = styled.div`
  font-family: "Roboto", sans-serif;
  box-shadow: lightgray;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  justify-content: space-evenly;
  text-align: center;
  display: grid;
  grid-template-columns: 500px;
  grid-template-rows: 300px;
  gap: 0px 0px;
  grid-template-areas:
    "BreakFast"
    "Lunch"
    "Dinner"
    "Snacks";
`;
const Title = styled.h1`
  color: black;
  text-align: center;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
`;

const BreakFast = styled.div`
  font-size: 12px;
  background: white;
  border-radius: 5px;
  border: 0.5px solid black;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
`;

const Totals = styled.div`
  margin-top: 20px;
  font-size: 15px;
  text-align: left;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 0.1em solid #bbbb;
  border-top: 0.1em solid #bbbb;
  background-color: lemonchiffon;
`;

const Button = styled.button`
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

const StyledLink = styled(NavLink)`
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
`;

const FoodName = styled.h3`
  margin-right: 10px;
  text-transform: capitalize;
  margin-left: 10px;
  font-weight: normal;
`;

const TotalHeading = styled.h4`
  font-weight: bold;
`;

const TotalNumbers = styled.div`
  font-size: 15px;
  text-align: left;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 0.1em solid #bbbb;
  border-top: 0.1em solid #bbbb; ;
`;

const Macros = styled.div`
  margin-top: 20px;
  font-size: 15px;
  text-align: left;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 0.1em solid #bbbb;
  border-top: 0.1em solid #bbbb;
  background-color: lemonchiffon;
`;

const Values = styled.div`
  font-size: 14px;
  text-align: left;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 0.1em solid #bbbb;
  border-top: 0.1em solid #bbbb; ;
`;

export default CalorieTracker;
