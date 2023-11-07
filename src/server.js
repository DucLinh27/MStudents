import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/conectDB";
import cors from "cors";
import { createJWT, verifyToken } from "./middleware/JWTAction";
require("dotenv").config(); // giup chayj dc dong process.env

let app = express();
app.use(cors({ origin: true }));

//config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//test jwt
createJWT();
let decodedData = verifyToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGluaCIsImFkZHJlc3MiOiJIdWUiLCJpYXQiOjE2OTcxMTE0ODJ9.8sAeB_fhobcnpkgoOFxLJecN7RiveaQIVzecfeZ3ol0"
);
console.log(decodedData);

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 3000; //Port === undefined => Port = 6060

app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is running on the port: " + port);
});
