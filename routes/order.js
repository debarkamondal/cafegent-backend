const express = require("express");
const order = require("../models/orders");
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

//------------------------------------------------------Creating an order---------------------------------------------------------//
