import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen'
// const bodyParser = require('body-parser')
// const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')
// const express = require('express')



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: '',
    }
  }

  onUsernameSubmitted = (username) => {

    // fetch('http://localhost:3001/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ username })
    // })
    // .then(response => {
    this.setState({
      currentUsername: username,
      currentScreen: 'ChatScreen'
    })
  }

  //     })
  //     .catch(error => console.log(error))
  // }

  render() {

    const chatkit = new Chatkit.default({
      instanceLocator: 'v1:us1:dcb23730-193e-4b92-8186-ffc227c1077d',
      key: '79cad382-328c-458f-85bb-10ef772f53ba:DgeqRa/pqpLJvD3FmNPISmHBn/3hzZYmZyo0W2TBybw=',
    })

    chatkit.createUser({
      id: this.state.currentUsername,
      name: this.state.currentUsername
    })

    if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
      return (<UsernameForm onSubmit={this.onUsernameSubmitted} />)
    } else if (this.state.currentScreen === 'ChatScreen') {
      return (<ChatScreen currentUsername={this.state.currentUsername} />)
    }
  }
}

export default App
