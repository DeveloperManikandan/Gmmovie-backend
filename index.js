// const  express = require("express");
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

databaseConnection();
dotenv.config({
    path: ".env",
})

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin: "http://localhost:3000",
    Credential:true
}
app.use(cors(corsOption));

app.use("/api/v1/user", userRoute);
app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
});