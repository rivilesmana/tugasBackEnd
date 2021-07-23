const { Client } = require('pg')

const client = new Client({
    user : "postgres",
    host : "localhost",
    database : "film",
    password : "admin",
    port : 5432
});

client.connect((error) => {
    if(error) {
        throw error;
    }
    console.log("connect to postgreSQL");
});

module.exports = client;