const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

let PORT;
process.env.STATUS == "development"
  ? (PORT = process.env.DEV_PORT)
  : (PORT = process.env.PROD_PORT);

const routes = require("../routes");

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
