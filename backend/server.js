const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const routes = require('./routes')

require('dotenv').config();

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Test')
});

// app.use(routes);
// app.use(routes.auth);

app.listen(port, () => {
  console.log(`Running on port ${port}!`)
});