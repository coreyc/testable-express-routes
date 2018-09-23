const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { insert } = require('./db-utils')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('App is working'))

app.post('/api/user', async (req, res) => {
  const userName = req.body.user_name
  const userType = req.body.user_type
  try {
    await insert(userType, userName)
    res.sendStatus(201)
  } catch(e) {
    res.sendStatus(500)
    console.log(e)
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

module.exports = {
  app
}