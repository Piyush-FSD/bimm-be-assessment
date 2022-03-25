const xml2js = require('xml2js')
const axios = require('axios')

const parsingXML = async (req, res) => {
    let makes;
    let types;

    const axiosAllMakesReq = await axios("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML");
    const allMakesData = axiosAllMakesReq.data;

    const axiosVehicleTypeReq = await axios("https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/440?format=xml");
    const vehicleTypeData = axiosVehicleTypeReq.data;

    const xmlParser = new xml2js.Parser({
        explicitArray: false
    });
    xmlParser.parseString(vehicleTypeData, function (err, result) {
        // console.log(result.Response.Results.VehicleTypesForMakeIds, 'JSON')
        makes = result.Response.Results.VehicleTypesForMakeIds;
    })

    xmlParser.parseString(allMakesData, function (err, result) {
        // console.log(result.Response.Results.AllVehicleMakes, 'XML')
        types = result.Response.Results.AllVehicleMakes;
    })

    res.status(200).json({ status: 200, data: makes, types })
};

module.exports = parsingXML;