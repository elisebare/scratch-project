import React, { Component } from 'react';
import UpdateModal from './updateModal.jsx'

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {   // create a state that keeps track of whether Modal is shown
      openModal: false // initialize to false
    }
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  //TODO: need to add an update route on the backend
  handleUpdateClick() {
    let { openModal } = this.state;
    this.setState({ openModal: !openModal });
  }

  //Handles deleting links
  handleDeleteClick(e) {
    e.preventDefault();
    // delete request
    fetch('/api/delete', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        article_id: this.props.id
      })
    }).then((data => {
      return data.json()
    })).then((data => {
      console.log('deleted', data)
      this.props.handleFlag()
    })).catch((err => {
      console.log('error in trying to delete task', err)
    }))
  }



  // needs title, url, update button, delete button
  // update button needs a handle click function
  // delete button needs a handle click function
  render() {
    console.log(this.props)
    return (
      <span id={this.props.id} className="article" >
        { this.state.openModal ? (<UpdateModal toggleButton={this.props.toggleButton} handleFlag={this.props.handleFlag} id={this.props.id} handleUpdateClick={this.handleUpdateClick} />) : null}
        <a href={this.props.url} target="_blank"> {this.props.title} </a>
        <button className="update-btn" onClick={this.handleUpdateClick}>Update</button>
        <button id={this.props.id} className="delete-btn" onClick={this.handleDeleteClick}>x</button>
      </span>
    )
  }
}

export default Article;