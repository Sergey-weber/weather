const router = require('express').Router();
const axios = require('axios');

const Weather = require('../model/Weather');

const url = 'https://www.metaweather.com/api/';

const defaultId = '2487956';

router.get('/', async (req, res) => {
   const getWeather = await Weather.find({}, (err, data) => { 
        return data;
    });

    return res.status(200).send(Weather);
});

router.get('/latest', async (req, res, next) => {
    try {
        const { data } = await axios.get(`${url}location/search/?query=moscow`);
        
        const { woeid = defaultId } = data[0];
        
        const requestweather = await axios.get(`${url}location/${woeid}/`);

    
        const dataForBase = requestweather.data.consolidated_weather.map((
            {
                applicable_date,
                weather_state_name,
                the_temp,
                max_temp,
                min_temp,
                temp
            }) => {
            return {
                applicable_date,
                weather_state_name,
                the_temp,
                max_temp,
                min_temp,
                temp
            }
        });

        const newWeathers = new Weather({
            dataForBase
        });

        await newWeathers.save();

        return res.status(200).send(requestweather.data);
    } catch(e) {
        next(e);
    }
 });

module.exports = router;