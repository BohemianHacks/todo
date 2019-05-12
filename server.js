const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({secret: process.env.SESSION_SECRET}));
app.use(express.json());

//routing
require('./app/routes')(app);

// upgrade to SSL
let env = process.env.NODE_ENV || 'development';

let forceSSL = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (env === 'production') {
  app.use(forceSSL);
}

//start on default Heroku port
app.listen(process.env.PORT || 5000);