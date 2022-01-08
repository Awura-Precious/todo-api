const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const { createConnection } = require("typeorm");

const route = require("./routes/todo.route");

const app = express();

//alternate way to create connection
// const config = {
//   type: process.env.DB_CONNECTION,
//   host: process.env.DB_HOST,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   synchronize: true,
//   entities: ["entity/**/*.js"],
// };

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/todo", route); //routes

const PORT = process.env.PORT || 3000;

const msg = `Server started on port: ${PORT}`;

createConnection()
  .then(() => {
    const dbMsg = `Connection to database: ${process.env.DB_HOST} has been established`;
    console.log(dbMsg);
    app.listen(PORT, () => {
      console.log(msg);
    });
  })
  .catch((err) => {
    console.error("Error: Unable to connect to database: ", err.message);
    console.log(err);
    process.exit(1);
  });
