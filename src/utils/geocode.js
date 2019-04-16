const request = require('request');

const fetchGeocode = (place, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=pk.eyJ1IjoiYWVvbi1hdmluYXNoIiwiYSI6ImNqdG8zcmlxOTJyYTc0OW14MWxqcWoybmoifQ.wKlDuqurYZymys2pzHAhLQ&limit=1`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location API to fetch data!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location data! Try another search.', undefined);
    } else {
      const [lng, lat] = body.features[0].center;
      const location = body.features[0].place_name;
      callback(undefined, {lng, lat, location});
    }
  });
};

module.exports = fetchGeocode;
