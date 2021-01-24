const express = require('express')
const bodyParser = require('body-parser')
const api = require('./routes')

const PORT = process.env.PORT || 3030

const app = express()

app.use(bodyParser.json())

app.use('/api', api.router)

app.listen(PORT, () => {
  console.log(`🚀 Server listening at: http://localhost:${PORT}`)
})
