const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const PORT = process.env.PORT || 8000;

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

// static, views & partials config with path setups
const publicDirPath =
  path.resolve('public') || path.join(__dirname, '..', 'public');
app.use(express.static(publicDirPath));

const viewsPath =
  path.resolve('templates', 'views') ||
  path.join(__dirname, '..', 'templates', 'views');
app.set('views', viewsPath);
app.set('view engine', 'hbs');

const partialsPath =
  path.resolve('templates', 'partials') ||
  path.join(__dirname, '..', 'templates', 'partials');
hbs.registerPartials(partialsPath);

// middlewares

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}, ${req.method}`);
  next();
});

app.use((req, res, next) => {
  switch (req.path) {
    case '/':
      res.locals.isIndex = 'active';
      res.locals.isAbout = '';
      res.locals.isHelp = '';
      break;
    case '/about':
      res.locals.isIndex = '';
      res.locals.isAbout = 'active';
      res.locals.isHelp = '';
      break;
    case '/help':
      res.locals.isIndex = '';
      res.locals.isAbout = '';
      res.locals.isHelp = 'active';
      break;
    default:
      break;
  }
  next();
});

// routes

app.get('/', (req, res, next) => {
  res.render('index', {
    pageTitle: 'Express Weather'
  });
});

app.get('/about', (req, res, next) => {
  res.render('about', {
    pageTitle: 'About | Express Weather',
    authorName: 'AeonDevWorks'
  });
});

const helpDir = [
  {
    contactPoint: 'adminServer',
    message: 'Help at your finger tips!'
  },
  {
    contactPoint: 'apiManager',
    message: 'Configuration help available'
  }
];

app.get('/help', (req, res, next) => {
  res.render('help', {
    pageTitle: 'Help | Express Weather',
    helpDir: helpDir
  });
});

app.get('/weather', (req, res, next) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address query'
    });
  }

  geocode(req.query.address, (error, {lng, lat, location} = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    weather(lng, lat, (error, weatherData) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        address: req.query.address,
        location: location,
        weather: weatherData
      });
    });
  });
});

app.get('/help/*', (req, res, next) => {
  res.render('404', {
    pageTitle: 'Help page not found',
    errHelpMessage: 'Help article not found.'
  });
});

app.get('*', (req, res, next) => {
  res.render('404', { pageTitle: '404 | Page not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}...`);
});
