const request = require('request');

const fetchWeather = (lng, lat, callback) => {
  const url = `https://api.darksky.net/forecast/2d7ae2a4cc7cf56b561ec97391b29ba2/${lat},${lng}?units=si`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather API to fetch data!', undefined);
    } else if (body.error) {
      console.log('Unable to find weather data! Try another search.', undefined);
    } else {
      const weatherData = {
        summary: body.daily.data[0].summary,
        temp: body.currently.temperature,
        precipProb: body.currently.precipProbability,
        forecast: `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees C out. There is a ${body.currently.precipProbability} % chance of rain.`
      };
      callback(undefined, weatherData);
    }
  });
};

module.exports = fetchWeather;
