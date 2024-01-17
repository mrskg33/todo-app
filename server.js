import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router  from './Routes/routes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;


mongoose.connect(URL).then(() => { 
    console.log('Connected to MongoDB database');

    app.listen(PORT, () => {
        console.log('Server is running on port: ', PORT);
    });
}).catch((error) => console.log(error.message));
  
  

app.get('/todos', (req, res) => {
    res.json("Hello From Backend");
})

app.use('/api', router);