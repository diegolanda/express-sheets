const { sheet } = require('../../../sheets/google-sheet')

module.exports.getInfo = () => sheet._rawProperties
