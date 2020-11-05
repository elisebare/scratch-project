// const db = require('./models/linksWalletModel');

const cookieController = {};

// creates cookie at the beginning of the session

cookieController.setCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.id, { 
    httpOnly: true 
  });
  return next();
};

// delete the cookie
cookieController.deleteCookie = (req, res, next) => {
  //clearing the session id cookie from cookies
  res.clearCookie('ssid');
  return next();
}

module.exports = cookieController;

