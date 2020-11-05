const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const linkController = require('./controllers/linkController');
const sessionController = require('./controllers/sessionController');

require('dotenv').config();

// create instance of server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

// taking in get request and sending back a response to the client
app.get('/', (req, res) => {
  res.send('hello world');
})

///TODO: need to use a router to organize the following routes


// create a post route '/signup'
app.post('/signup', userController.createUser, cookieController.setCookie, sessionController.startSession, (req, res) => {
  console.log('in signup')
  // respond with status 200
  res.status(200).send('User created.');
});

// create a post route '/login'
app.post('/login', userController.verifyUser, cookieController.setCookie, sessionController.startSession, (req, res) => {
  res.status(200).send('User logged in.');
});

//TODO: add middleware to delete session when user logs out
// app.post('/logout', userController.verifyUser, cookieController.setCookie, sessionController.startSession, (req, res) => {
//   res.status(200).send('User logged in.');
// });
app.post('/links', linkController.addLinks, linkController.getTop3, (req, res) => {
  console.log('in links callback route')
  res.status(200).json(res.locals.top3);
});

//TODO: intended to be authorized routes must verify users Need a new middleware to check that cookie id matches session id
app.get('/links/top3list', linkController.getTop3, (req, res) => {
  console.log('in links top3 callback')
  console.log("Cookies: ", req.cookies);
  res.status(200).json(res.locals.top3);
});

// get articles by priority level for dropdown menus
app.get('/getArticles/:priority', linkController.getLinks, (req, res) => {
  res.status(200).json(res.locals.links);
});

//delete link
app.delete('/delete', linkController.deleteLinks, (req, res) => {
  console.log('in delete callback')
  res.status(200).json('deleted!')
})

//update link
app.patch('/update', linkController.updateLinks, (req, res) => {
  console.log('in update links callback')
  res.status(200).json('updated')
})

// bad route error handling
app.use((req, res) => {
  console.log('we are in a bad route')
  res.sendStatus(404)
});

// global error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// telling server which port to listen on
// starts the server; binding app to port and listens on port 3000 for connections
app.listen(3000, () => console.log('app is a badass mf!'))