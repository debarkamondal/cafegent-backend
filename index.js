const connectToMongo = require("./db");
const express = require("express");
const app = express();
const dotEnv = require("dotenv").config();

const port = process.env.EXPRESS_PORT;

connectToMongo();
