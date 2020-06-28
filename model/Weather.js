const mongoose = require('mongoose');

const WeatherShema = new mongoose.Schema({
  weather_state_name: {
    type: String,
    required: false,
    max: 512,
    min: 3
  },
  applicable_date: {
    type: String,
    required: false,
    min: 5
  },
  the_temp: {
    type: Number,
    required: false,
  },
  max_temp: {
    type: Number,
    required: false
  },
  min_temp: {
    type: Number,
    required: false
  },
  temp: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('Weather', WeatherShema);