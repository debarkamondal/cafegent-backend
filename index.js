const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

const dotEnv = require("dotenv").config();
const app = express();

const port = process.env.EXPRESS_PORT;

connectToMongo();

app.use(express.json());
app.use(cors());

//Routes available
app.use("/api/table", require("./routes/table"));
app.use("/api/order", require("./routes/order"));
app.use("/api/bill", require("./routes/bill"));
app.use("/api/menu", require("./routes/menu")); //! ADMIN only !!!

app.listen(port, () => {
  console.log(
    `App listening on http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`
  );
});
