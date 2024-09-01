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
const corsOptions = {
  origin: ['http://localhost:3000', 'https://gmmovie-front.vercel.app'], 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
});