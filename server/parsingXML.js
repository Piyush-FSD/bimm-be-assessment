const xml2js = require('xml2js')
const axios = require('axios')

const parsingXML = async (req, res) => {
    const xmlToJsonArray = [];

    const axiosReq = await axios("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML")
    const data = axiosReq.data;

    const xmlParser = new xml2js.Parser({
        explicitArray: false
    });
    xmlParser.parseString(data, function (err, result) {
        // console.log(result.Response.Results.AllVehicleMakes, 'XML')

        const make = result.Response.Results.AllVehicleMakes;
        make.forEach((item) => {

        })

        // console.log(JSON.stringify(result.Response.Results), 'JSON')
        // console.log(result.Response.Results.VehicleTypesForMakeIds)
    })

    // res.status(200).json({ status: 200, data: xmlToJsonArray })
};

module.exports = parsingXML 