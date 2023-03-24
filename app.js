require('dotenv').config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const personajesRouter = require("./routes/personajes");
const productosRouter = require("./routes/productos");
const connect = require("./db/db")
const app = express();


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



app.use("/", indexRouter);
app.use("/productos", productosRouter);
app.use("/personajes", personajesRouter);

connect();

module.exports = app;
