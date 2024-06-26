require("dotenv").config();
const express = require("express");
const { mongoose } = require("mongoose");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", authRouter);
app.use("/", userRouter);

const startServer = async () => {
  try {
    const dbUrl = process.env.DB_URL;
    await mongoose.connect(dbUrl, {
      retryWrites: true,
      w: "majority",
      appName: "Cluster0",
    });
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Error to start server: ", error);
  }
};

startServer();
