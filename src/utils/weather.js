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
        forecast:  {
          currently: `
            ${body.daily.data[0].summary} \n
            It is currently ${body.currently.temperature} C out. \n
            There is a ${body.currently.precipProbability} % chance of rain. \n
            `,
          today: `
            Today: High ${body.daily.data[0].temperatureHigh} C || ${body.daily.data[0].temperatureLow} C Low - ${body.daily.data[0].summary}
            `,
          tomorrow: `
            Tomorrow: High ${body.daily.data[1].temperatureHigh} C || ${body.daily.data[1].temperatureLow} C Low - ${body.daily.data[1].summary} 
            `,
        }
      };
      callback(undefined, weatherData);
    }
  });
};

module.exports = fetchWeather;
