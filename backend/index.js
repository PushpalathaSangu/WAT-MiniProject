const express =require("express");
const app=express();
const cors=require("cors");
require("dotenv").config();
require("./conn/conn");
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Hello from backend side");
})
app.listen(process.env.PORT,()=>{
    console.log(`Server started at the port ${process.env.PORT}`);
});