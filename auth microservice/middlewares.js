const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const bodyParse = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

// remove Powered by express
const removePowered = (req, res, next) => {
  res.header("X-Powered-By", "Mohamed");
  next();
};

// handel server errors
const handleErrors = (err, req, res, next) => {
  if (err.message) {
    res.end(err.message);
  } else {
    res.end("UNKOWNEN ERROR");
  }
};

// Handle 404
const handle404 = (req, res) => {
  res.status(404).json({
    message: "404: Page not Found",
    status: "fail"
  });
};

// Handle 500
const handle500 = (req, res) => {
  res.status(500).json({
    message: "500: Server Error",
    status: "fail"
  });
};

// CORS
const CROS = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization , Content-Type, Accept"
  );
  if ("OPTIONS" === req.method) {
    //respond with 200
    res.sendStatus(200);
  } else {
    next();
  }
};

const isAdmin = (req, res, next) => {
  token = req.get("Authorization");
  if (!token) {
    res.status(403).json({
      message: "unauthenticated",
      status: "fail"
    });
  } else {
    User.authCheck(token.split(" ")[1], (err, user) => {
      if (!err && user.isAdmin) {
        next();
      } else {
        res.status(403).json({
          message: "unauthenticated , " + err,
          status: "fail"
        });
      }
    });
  }
};

const isAuth = (req, res, next) => {
  token = req.header("x-token");
  if (!token) {
    res.status(403).json({
      message: "unauthenticated",
      status: "fail"
    });
  } else {
    User.authCheck(token, user => {
      req.payload = user;
      next();
    });
  }
};

module.exports = {
  isAdmin,
  CROS,
  handleErrors,
  handle404,
  handle500,
  removePowered,
  bodyParse,
  urlencodedParser
};
