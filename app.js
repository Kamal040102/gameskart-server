const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const expressAsyncHandler = require("express-async-handler");
require("./database/database.connection")

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.get("/api/v1", expressAsyncHandler(async (req, res) => {
    try {
        res.json({ code: 1, message: "Server is live." })
    }
    catch (err) {
        res.status(500).json({ code: 2, message: err.message || "Server not responding." })
    }
}))

module.exports = app;