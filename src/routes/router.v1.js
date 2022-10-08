const express = require("express");

const authRoute = require("./auth.router");
const uploadRoute = require("./upload.route");
const quizRoute = require("./quiz.route");
const questionRoute = require("./question.route");

const flashcardRoute = require("./flashcard.route");
const cardRoute = require("./card.route");
const appRoute = express();

appRoute.get("/home/:token", (req, res) => {
  res.status(200).json({
    message: "new password",
    token: req.params.token,
  });
});

appRoute.use("/auth", authRoute);

appRoute.use("/upload", uploadRoute);

appRoute.use("/quizzes", quizRoute);

appRoute.use("/question", questionRoute);
appRoute.use("/flashcards", flashcardRoute);

appRoute.use("/cards", cardRoute);

module.exports = appRoute;
