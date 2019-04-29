const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:dcb23730-193e-4b92-8186-ffc227c1077d',
  key: '79cad382-328c-458f-85bb-10ef772f53ba:DgeqRa/pqpLJvD3FmNPISmHBn/3hzZYmZyo0W2TBybw=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body

  chatkit
    .createUser({
      name: username,
      id: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        console.log(`running on port ${PORT}`)
      }
    })
})

app.post('/authenticate', (req, res)=> {
  const{grant_type} = req.body
  res.json(chatkit.authenticate({grant_type, userId: req.query.user_id},))
})


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
