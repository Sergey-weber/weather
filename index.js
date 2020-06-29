const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Import Routes
const weatherRoute = require('./routes/weather');

dotenv.config();

const PORT = 7000;

//Middleware
app.use(express.json())

//Route Middlewares
app.use('/api/weather', weatherRoute);

app.get('/', (req, res) => res.send('EEe YEP '));

app.listen(PORT, () => {
    console.log('yep');
});