const express = require("express");
const cors = require("cors");
const tweets = require("./controllers/tweets");
const retweets = require("./controllers/retweets");
const knex = require("knex");

const psqlDB = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgres",
    database: "twitter",
  },
});

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());

// Would add middleware with express-valditator to validate the data has been sent by the client
app.get("/tweets", (req, res) => {
  tweets.handleGetTweets(req, res, psqlDB);
});
app.post("/tweets", (req, res) => {
  tweets.handleInsertNewTweet(req, res, psqlDB);
});

app.post("/tweets/likes/:id", (req, res) => {
  tweets.handleInsertLike(req, res, psqlDB);
});

app.post("/tweets/retweet/:id", (req, res) => {
  tweets.handleInsertNewRetweet(req, res, psqlDB);
});

app.get("/retweets", (req, res) => {
  retweets.handleGetRetweets(req, res, psqlDB);
});

app.listen(PORT, () => {
  console.log(`app is runing on port ${PORT}`);
});
