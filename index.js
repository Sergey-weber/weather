const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Import Routes
const weatherRoute = require('./routes/weather');

dotenv.config();

const PORT = 7000;

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('connected to db');
    }
);

//Middleware
app.use(express.json())

//Route Middlewares
app.use('/api/weather', weatherRoute);

app.get('/', (req, res) => res.send('EEe YEP '));

app.listen(PORT, () => {
    console.log('yep');
});