import { createGlobalStyle } from "styled-components";
import Background from "../assets/backgroundimg.jpg";

export const Vars = {};

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body{
    height: 100%;
    background-image: url(${Background});
    background-size: cover;
  }
`;
