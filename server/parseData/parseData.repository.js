const axios = require('axios')
const parseS = require('./parseData.service.js')

const parseR = () => {
    const axiosReq = await axios("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML")
    const data = axiosReq.data;

    const xmlParser = new xml2js.Parser({
        explicitArray: false
    });
    xmlParser.parseString(data, function (err, result) {
        console.log(result.Response.Results.AllVehicleMakes, 'XML')
        // console.log(JSON.stringify(result.Response.Results), 'JSON')
        // console.log(result.Response.Results.VehicleTypesForMakeIds)
    })

    await parseS(data)
}

module.exports = parseR 