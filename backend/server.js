const express = require('express')
const users = require('./routes/users');
const app = express()

app.use(express.json())

app.use('/', users)

app.listen(3000, () => {
  console.log('server running')
})
