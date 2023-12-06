const express = require("express");
const cors = require("cors");
const router = require("./api/v1/routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1",router);
app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to the QRCode project",
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server listening on port " + (process.env.PORT || 5000));
});
