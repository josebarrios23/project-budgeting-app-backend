// DEPENDENCIES
const express = require('express')
const cors = require("cors")

// CONFIGURATION
const app = express()

const budgetController = require('./controllers/budgetController.js')

//Middleware packages
app.use(cors())
app.use(express.json())

// MIDDLEWARE FOR CONTROLLERS
app.use('/api/transactions', budgetController)

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to Budget App')
})

// 404 PAGE
app.get('*', (req, res) => {
  res.json({ error: 'Page not found' })
})

// EXPORT
module.exports = app