const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const user = []

router.get('/users', (req, res) => {
  res.json(user)
})

router.post('/users', async (req, res) => {
  try { 
    // const salt = await bcrypt.genSalt(10) 
    const saltedHashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(saltedHashedPassword)

    const newUser = {
      name: req.body.name,
      password: saltedHashedPassword
    }
    user.push(newUser)
    res.status(201).send()
  }
  catch {
    res.status(500).send()
  }
})

module.exports = router;