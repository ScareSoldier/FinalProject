const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 5000;
const dotenv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");
const morgan = require("morgan");
const user = require("./routes/user");

dotenv.config();
connectDB();
app.use(express.json());

app.use(cors());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("tiny"));
app.use(express.static("./server/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

//requests for static files are routed to the public folder
app.use(express.static("public"));
app.use("/users", user);
//////////////////////////////////////////////////////

//handle jibberish search term queries

const APP_ID = "d6ce1c61";
const APP_KEY = "6f6668f6021dca4b33e8aed63afe75ae";

const FOOD_ID = "730c63eb";
const FOOD_KEY = "4d9a2b5b1a46088000af71f4721640e6";
//Routes

app.post("/foods", async (req, res) => {
  const response1 = await fetch(
    `https://api.edamam.com/auto-complete?app_id=${FOOD_ID}&app_key=${FOOD_KEY}&q=${req.body.searchTerm}`
  );
  const data = await response1.json();
  console.log(data);
  res.send({ suggestions: data });
});

app.get("/nutrition", async (req, res) => {
  const response = await fetch(
    `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&nutrition-type=logging&ingr=${req.query.searchTerm}`
  );
  const data = await response.json();
  //   console.log(data);
  res.send({ calories: data.calories });
});

app.get("/leave", (req, res) => {
  res.send("GoodBye World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.use("/api/users", userRoutes);

// app.use(notFound);
// app.use(errorHandler);
