const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const users = []

router.get('/users', (req, res) => {
  res.json(users)
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
    users.push(newUser)
    res.status(201).send()
  }
  catch {
    res.status(500).send()
  }
})

router.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name = req.body.name)
  
  if (!user) {
    return res.status(400).send('User not found.')
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Login successful.")
    } else {
      res.send("Invalid password.")
    }
  }
  catch {
    res.status(500).send()
  }
})

module.exports = router;