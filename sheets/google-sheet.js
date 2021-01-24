const { OAuth2Client } = require('google-auth-library')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const { web: { client_id, client_secret } } = require('../config/credentials.json')
const { access_token, refresh_token, expiry_date } = require('../config/token.json')
const { sheetId } = require('../config/settings.json')

const oauthClient = new OAuth2Client({
  clientId: client_id,
  clientSecret: client_secret,
});

oauthClient.credentials.access_token = access_token;
oauthClient.credentials.refresh_token = refresh_token;
oauthClient.credentials.expiry_date = expiry_date;

oauthClient.on('tokens', credentials => {
  // TODO: save/update token.json
  console.log('🔑 connected with', credentials)
})

const doc = new GoogleSpreadsheet(sheetId);
doc.useOAuth2Client(oauthClient);

console.log('👓 loading google document...')
doc.loadInfo().then(() => {
  console.log(`📄 document (${doc.title}) loaded.`)
}).catch(() => {
  console.log('💥 oops...')
})

module.exports.sheet = doc

module.exports.setTab = tabName => async (req, _, next) => {
  const google = doc.sheetsByTitle[tabName]

  google.actions = {}

  const fetchRows = async (withRaw = false) => {
    const rows = await google.getRows()
  
    const response = []
  
    rows.forEach(row => {
      const data = google.headerValues.reduce((o, key) => Object.assign(o, {[key]: undefined}), {})
  
      row._rawData.forEach((cell, idx) => data[google.headerValues[idx]] = cell)

      if (withRaw) {
        data._raw = row
      }
  
      response.push(data)
    });
  
    return response
  }

  google.actions.get = async () => {
    return await fetchRows()
  }

  google.actions.getById = async (id) => {
    const rows = await fetchRows()

    const row = rows.find(x => x.ID === id)

    if (!row) {
      return {}
    }

    return await row
  }

  google.actions.add = async (data) => {
    await google.addRow(data)
  }

  google.actions.deleteById = async (id) => {
    const rows = await fetchRows(true)

    const row = rows.find(x => x.ID === id)

    if (!row) {
      return false
    }

    await row._raw.delete()
    return true
  }

  google.actions.updateById = async (id, data) => {
    const rows = await fetchRows(true)

    const row = rows.find(x => x.ID === id)

    if (!row) {
      return false
    }

    delete data.ID

    Object.keys(data).forEach(key => {
      row._raw[key] = data[key]
    })

    await row._raw.save()
    return true
  }

  google.actions.fetchRows = fetchRows

  await google.loadHeaderRow()

  req.google = google

  next()
}
