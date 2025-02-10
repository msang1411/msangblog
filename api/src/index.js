const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const { errorHandlingMiddleware } = require("./middlewares/errorHandling");
//require routers

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// CORS

// Database
require("./db/primaryDB");

// Routers

// Middleware error handling
app.use(errorHandlingMiddleware);

app.listen(port);
