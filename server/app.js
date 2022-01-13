const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const { createConnection } = require("typeorm");

const todoRoute = require("./routes/todo.route");
const userRoute = require('./routes/user.route')

const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/todo", todoRoute); 
app.use("/users", userRoute);

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
