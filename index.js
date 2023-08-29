const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const connection = require("./db/connect");
const routes = require("./controller/routes");
app.use(routes);
app.listen(3000, console.log("server running on port 3000"));
