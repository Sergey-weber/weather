const router = require('express').Router();
const axios = require('axios');

const url = 'https://www.metaweather.com/api/';

const defaultId = '1047378';

router.get('/latest', async (req, res, next) => {
    try {
        //По дефолту установится Питер, если не найдет по ip
        const { city = 'St Petersburg' } = await getIp();
        
        const { data } = await axios.get(`${url}location/search/?query=${city}`);
        
        const { woeid = defaultId } = data[0];
        
        const requestweather = await axios.get(`${url}location/${woeid}/`);

        return res.status(200).send(requestweather.data);
    } catch(e) {
        next(e);
    }
 });

 const getIp = async () => {
    const { data } = await axios.get('http://ip-api.com/json');

    return data;
 }

module.exports = router;