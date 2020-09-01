const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const { MONGOURI } = require('./keys')

const { JWT_SECRET } = require('./keys')

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
  console.log('connected to mongo yeah!!')
})

mongoose.connection.on('error', (err) => {
  console.log('err connection', err)
})

require('./models/user')
require('./models/post')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

//eNZxnswEtBkHCbYm
/*const customMiddleware = (req, res, next) => {
  console.log(req.query)
  if (req.query.id == 5) {
    console.log('middleware executed!!')
    next()
  } else {
    res.redirect('/')
  }
  next()
}

app.get('/', (req, res) => {
  console.log('home')
  res.send('hello world')
})

app.get('/about', customMiddleware, (req, res) => {
  console.log('about')
  res.send('about page')
})*/

app.listen(PORT, () => {
  console.log('Server is running on ' + PORT)
})
