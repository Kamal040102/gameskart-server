const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const morgan = require("morgan");
const expressAsyncHandler = require("express-async-handler");
const authRouter = require("./routes/auth.route");
const productRouter = require("./routes/product.route");
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

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);

module.exports = app;