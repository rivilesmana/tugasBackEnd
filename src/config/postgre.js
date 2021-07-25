const { Client } = require('pg')
const connectionString = process.env.DATABASE_URL


const client = new Client({
    connectionString
});

client.connect((error) => {
    if(error) {
        throw error;
    }
    console.log("connect to postgreSQL");
});

module.exports = client;