require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./routes/userRouter");

// encode the incoming request
app.use(express.urlencoded({ extended: true }));

// set options
app.set("view engine", "ejs");

app.use("/", userRouter);

app.get("*", (req, res) => {
  res.send("Error 404: Not found!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
