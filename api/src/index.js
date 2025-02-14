const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const { errorHandlingMiddleware } = require("./middlewares/errorHandling");
const adminRouter = require("./routes/admin.route");
const roleRouter = require("./routes/role.route");
const permissionRouter = require("./routes/permission.route");
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
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/role", roleRouter);
app.use("/api/v1/permission", permissionRouter);

// Middleware error handling
app.use(errorHandlingMiddleware);

app.listen(port);
