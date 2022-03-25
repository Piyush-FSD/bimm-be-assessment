const getConnection = require('./connection/dbConnection.js')
const dbName = require('./constants.js')

const test = async (req, res) => {
    const client = await getConnection();
    const db = client.db(dbName);

    const user = req.body;
    console.log(user)

    return await db.collection("test").insertOne(user)
}

module.exports = test;