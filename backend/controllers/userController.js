const bcrypt = require('bcryptjs')
const db = require('../models')

async function create(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({status: 400, message: 'All fields are required.'});
  }

  try {
    const foundUser = await db.User.findOne({ email });

    if (foundUser) {
      console.log('User already exists: ', foundUser);
      return res.status(400).json({status: 400, message: 'User already exists. Please login'});
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await db.User.create({username, email, password: hash});

    res.json(newUser);
  }

  catch (err) {
    return res.status(500).json({status: 500, message: 'Something went wrong. Please try again'});
  }
}

async function getProfile(req, res) {
  try {
    const user = await db.User.findById(req.currentUserId);
    return res.json({status: 200, profile: user});
  }
  catch (err) {
    return res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
}

module.exports = {
  create,
  getProfile
}