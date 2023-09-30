"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept json data:
app.use(express.json());

app.all("/", (req, res) => {
  res.send("WELCOME TO TODO API");
});

/* ------------------------------------------------------- */
//* SEQUELIZE
//? npm i sequelize sqlite3

// https://sequelize.org/docs/v6/getting-started/
const { Sequelize, DataTypes } = require("sequelize");
// Where is DB (DB Connection Details):
// const sequelize = new Sequelize('sqlite:./db.sqlite3')
const sequelize = new Sequelize(
  "sqlite:" + (process.env.SQLITE || "./db.sqlite3")
);

// sequelize.define('tableName', { columns })
const Todo = sequelize.define("todo", {
  // https://sequelize.org/docs/v7/models/data-types/

  id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false, // default: true
    field_name: "custom_column_name",
    comment: "Description",
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(64), // varchar(64)
    allowNull: false,
  },
  description: DataTypes.TEXT, // ShortHand Using.
  priority: {
    // 1: High, 0: Normal, -1: Low
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0, // set default value.
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  //? Not need define "createdAt" & "updatedAt" fields.
});

sequelize.sync();

/* ------------------------------------------------------- */

const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode ?? 500;
  console.log("errorHandler runned.");
  res.status(errorStatusCode).send({
    error: true, // special data
    message: err.message, // error string message
    cause: err.cause, // error option cause
    // stack: err.stack, // error details
  });
};
app.use(errorHandler);
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
