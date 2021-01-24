<p align="center">
  <img width="250" height="160" src="https://github.com/diegolanda/express-sheets/raw/master/docs/assets/img/logo.jpg">
</p>

# Express Sheets

Express Sheets is a REST API boilerplate that could help you start a express REST API using a google sheet as data storage.

By using Express Sheet middleware you can get basic CRUD operations 📦 out-of-the-box connecting to your google sheet as data storage.

# Setup

Clone this repository and yarn dependencies 🧶.

## Google requirements

We are using google-auth to connect to google spreadsheets, for this you will need to do some preconfiguration first.

First get a `credentials.json` file and place it under the config directory. To get this `credentials.json` files head to this [google developer quickstart](https://developers.google.com/sheets/api/quickstart/nodejs). 

1. Click on 'Enable the Google Sheets API'
2. Enter a project name
3. Select webserver and put http://localshost:3030 as callback URL and click create
4. Click on Download Configuration to download `credentials.json`
5. Copy `credentials.json` under `config/` folder

## Connect Spreadsheet

You can use this [spreadsheet](https://docs.google.com/spreadsheets/d/1OxEkDrElnFNYXca2gRX7wyN70NfhHRveFe-cGJzIf3k/edit?usp=sharing) as sample, duplicate it on you google drive and replace the id in `config/settings.json` 

```javascript
// For this url https://docs.google.com/spreadsheets/d/1OxEkDrElnFNYXca2gRX7wyN70NfhHRveFe-cGJzIf3k/edit?usp=sharing
// This is the ID: 1OxEkDrElnFNYXca2gRX7wyN70NfhHRveFe-cGJzIf3k
// config/settings.json file
{
  "scopes": [
    "https://www.googleapis.com/auth/spreadsheets"
  ],
  "sheetId": "1OxEkDrElnFNYXca2gRX7wyN70NfhHRveFe-cGJzIf3k"
}
```

1. Run `yarn token-server`
2. On a separate tab run `yarn create-token`
3. Token file should be created 🎉

* Note: you may need to share you spreadsheet if developing in a team to all your teammates
# Run Express API

We provide a middleware so you can quickly test CRUD actions towards your google sheet, you can check the example folder to review GET, POST, PUT, DELETE actions.

To connect to a tab now using the middleware you just need to do:

```javascript
router.use('/users', connectTab('Users'))
```

This will provide GET `/`, POST `/`, PUT `/:id` & DELETE `/:id` routes, please keep in mind that we are assuming `ID` column is the identifier 

so with the previos `connectTab('Users')` you will get:

1. `http://localhost:3030/api/users` GET
2. `http://localhost:3030/api/users/:id` GET
3. `http://localhost:3030/api/users` POST
4. `http://localhost:3030/api/users/:id` PUT
5. `http://localhost:3030/api/users/:id` DELETE


# TODOs

- [ ] Add support for custom `ID` options
- [ ] Add support for (tab) table relations
- [ ] Support refresh token update
- [ ] Enhance setup documentation & process
- [ ] Add TypeScript support
- [ ] Add linter
- [ ] Add semantic-release config
- [ ] Create npm library
- [ ] Add tests
- [ ] Add a UI dashboard?
- [ ] Ideas 💡?