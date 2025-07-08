const { configDotenv } = require('dotenv');
const express=require('express');
const mongoose=require('mongoose');
require ('dotenv').config();

const bugRoutes=require('./routes/bugRoutes');
const userRoutes=require('./routes/userRoutes');
const projectRoutes=require('./routes/projectRoutes');

const app=express();


app.use(express.json());

app.use('api/bugs',bugRoutes);
app.use('api/users',bugRoutes);
app.use('api/projects',bugRoutes);


const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

