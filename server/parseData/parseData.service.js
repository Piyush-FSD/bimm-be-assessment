const parseC = require('./parseData.controller.js')

const parseS = async (data) => {
    const xmlToJsonArray = [];

    if (!data) {
        throw new Error(`No data found: ${data}`)
    }

    xmlToJsonArray.push(data)

    return await parseC(xmlToJsonArray)
}

module.exports = parseS