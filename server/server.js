const { configDotenv } = require('dotenv');
const express=require('express');
const mongoose=require('mongoose');
const connectDB=require('./config/db')
require ('dotenv').config();


const bugRoutes=require('./routes/bugRoutes');
const userRoutes=require('./routes/userRoutes');
const projectRoutes=require('./routes/projectRoutes');

const app=express();

connectDB();

app.use(express.json());

app.use('/api/bugs', bugRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);


const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

