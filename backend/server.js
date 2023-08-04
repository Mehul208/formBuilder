const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const connection = require("./db");
const formsRouter = require("./routes/forms");

dotenv.config();

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/forms", formsRouter);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
