import mongoose from "mongoose";

const databaseConnection=() =>{
    mongoose.connect("mongodb+srv://manisaragan:Mani%40divya1924@manidiv.pqya5lq.mongodb.net/").then(()=>{
        console.log('Database connected');
        }).catch((err)=>{
            console.log(err);
    })
};
export default databaseConnection;
