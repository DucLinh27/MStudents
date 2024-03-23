"use strict";

require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    //null
    database: process.env.DB_DATABASE_NAME,
    host: process.env.DB_HOST,
    //"127.0.0.1"
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    // logging: false,
    timezone: "+07:00"
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};