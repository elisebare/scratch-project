const db = require('../models/linksWalletModel');

const sessionController = {};


//TODO: need functionality to delete cookie at end of session

// inserts cookies into database for active session
sessionController.startSession = (req, res, next) => {
  const sessionQuery = `INSERT into cookie_sessions (cookie_id)
  VALUES ($1)
  ON CONFLICT DO NOTHING
  RETURNING created_at`;

  console.log('res.locals.id= ', res.locals.id)
  console.log('id is type: ', typeof res.locals.id)
  db.query(sessionQuery, [res.locals.id])
    .then((data) => {
      console.log('New Session: ', data.rows);
      return next();
    })
    .catch((err) => {
      return next({ err });
    });
};

//end session on logout
sessionController.endSession = (req, res, next) => {
  //make a query to delete by cookie id
  const sessionQuery = `DELETE FROM cookie_sessions WHERE cookie_id = $1;`

  //get the cookie id from the request
  const id = Number(req.cookies.ssid);
  console.log('the cookie id is ', id)
  console.log('the cookie id type is', typeof id)

  db.query(sessionQuery, [id])
    .then(res => {
      console.log('logout query was successful');
      return next();
    })
    .catch(err => {
      console.log(err)
      //return err to global error handler
      return next({err});
    })

}

module.exports = sessionController;