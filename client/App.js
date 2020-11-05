import React, { Component } from 'react';
import Login from './components/login.jsx';
import SignUp from './components/signUp.jsx';
import Dashboard from './components/dashboard.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isSignedUp: true,
      flag: false
    }
    this.handleLogIn = this.handleLogIn.bind(this);  // binding the functionality to the constructor
    this.handleSignUp = this.handleSignUp.bind(this);
    //binding handle flag 
    this.handleFlag = this.handleFlag.bind(this);
    //binding logout
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogIn() {
    //deconstructing properties in state
    let { isLoggedIn, isSignedUp } = this.state;
    isSignedUp = true;
    //setState changes the state- if isLogged is true, it's changing it to false. And if isSignedUp is true, it's keeping its value as true?
    //reset flag to false so the fetch request for top3 runs
    this.setState({ isLoggedIn: !isLoggedIn, isSignedUp: isSignedUp, flag: false }); 

  }

  //will do a fetch request to server to delete session id (in db) and cookie id (in cookie storage)
  handleLogOut () {
    //make isLoggedIn false
    //fetch request
    fetch('/api/logout', {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
      // not sending any data to server at this time
      // body: {
      //   JSON.stringify({})
      // }
    })
    .then(res => {
      console.log('reached the next promise after fetching logout. about to set state')
      //re render login html page
      this.setState({
        ...this.state,
        isLoggedIn: false,
      })
    })
    .catch(err => {
      console.log('error returned by logout fetch: ', err)
    })
  }

  handleSignUp() {
    let { isSignedUp } = this.state;
    this.setState({ isSignedUp: !isSignedUp }); //changing the state to true or false depending on the current state
  }

  handleFlag() {
    console.log('in handle flag')
    let newFlag = (!this.state.flag ? true : false)
    this.setState({ ...this.state, flag: newFlag })
    // if (this.state.flag === false) {
    //   this.setState({
    //     ...this.state,
    //     flag: true
    //   })
    // }
    // else if (this.state.flag === true) {
    //   this.setState({
    //     ...this.state,
    //     flag: false
    //   })
    // }
  }

  render() {
    const { isLoggedIn, isSignedUp } = this.state;
    if (isSignedUp && !isLoggedIn) {
      return (
        <div>
          {/* setting both of these as props- so we can call the methods in the children, which changes the state of the parent */}
          <Login handleLogIn={this.handleLogIn} handleSignUp={this.handleSignUp} />
        </div>
      )
    } else if (isLoggedIn) {
      return (
        <div>
          <Dashboard handleLogOut= {this.handleLogOut} handleFlag={this.handleFlag} flag={this.state.flag} handleLogIn={this.handleLogIn} />
        </div>
      )
    } else {
      return (
        <div>
          <SignUp handleLogIn={this.handleLogIn} />
        </div>)
    }
  }
}

export default App;