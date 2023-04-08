const { Client } = require('pg')
const dbConnection = require('./dbconfig.json')
const client = new Client(dbConnection)

client.connect()

module.exports = client