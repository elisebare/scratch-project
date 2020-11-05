import React from 'react';
import AddForm from './addForm.jsx';
import Top3list from './top3list.jsx';
import Dropdown from './dropdown.jsx'

function Dashboard(props) {
  // console.log('rendering dashboard')
  return (
    <div id="dashboard">
      <div id="logout-container" className = "logout">
        <button id="logout-btn" onClick={() => props.handleLogOut()}>Log Out</button>
      </div>
      <div className="img-container">
        <img src="./images/Axolotl-Wallet.png" width="200px" height="200px"></img>
      </div>
      <h1 className="title">Axolota Articles</h1>
      <AddForm handleFlag={props.handleFlag} flag={props.flag} />
      <div id="top-outer-container">
        <Top3list handleFlag={props.handleFlag} flag={props.flag} />
      </div>
      <div id="dropdown-container">
        <Dropdown text="High Priority" />
        <Dropdown text="Medium Priority" />
        <Dropdown text="Low Priority" />
      </div>
    </div>
  )
}

export default Dashboard;