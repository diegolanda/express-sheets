const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')
const { scopes, sheetId } = require('../config/settings.json')


const TOKEN_PATH = './config/token.json'

// Load client secrets from a local file.
fs.readFile('./config/credentials.json', (err, content) => {
  if (err) {
    return console.log('💥 Error loading client secret file:', err)
  }

  authorize(JSON.parse(content), () => console.log(`🎊 You can run express-sheets now!`))
})

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.web
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  })
  console.log('🔑 Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('🕶 Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return console.error('Error while trying to retrieve access token', err)
      }

      oAuth2Client.setCredentials(token)


      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) {
          return console.error(err)
        }

        console.log('🔑 Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}