const express = require('express')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3030

const app = express()

app.get('/', (req, res) => {
  res.write(`
    <h1>Express Sheets Token</h1>
    <p><strong>Copy & paste this code to terminal:</strong> ${req.query.code}</p>
  `)
})

app.listen(PORT, () => {
  console.log(`🔑 Token Server listening at: http://localhost:${PORT}`)
})
