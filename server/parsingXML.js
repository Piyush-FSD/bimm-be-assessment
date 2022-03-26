const xml2js = require('xml2js')
const axios = require('axios')

const parsingXML = async (req, res) => {
    const xmlParser = new xml2js.Parser({
        explicitArray: false
    });

    const axiosAllMakesReq = await axios("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML");
    let allMakesData = [];

    //! PARSING ALL VEHICLE MAKES 
    xmlParser.parseString(axiosAllMakesReq.data, function (err, result) {
        allMakesData = result.Response.Results.AllVehicleMakes;
    })

    let allVehicles = [];

    for (const make of allMakesData) {
        const makeId = make.Make_ID;

        const vehicleTypeReqXML = await axios(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`)
            .then(response => { return response.data })
            .catch(e => console.log(e));

        let vehicleTypeReq = [];

        //! PARSING ALL VEHICLE MAKES 
        xmlParser.parseString(vehicleTypeReqXML, function (err, result) {
            vehicleTypeReq = result.Response.Results.VehicleTypesForMakeIds;
        })

        console.log(vehicleTypeReq, 'vehcile type req')

        allVehicles.push({
            makeId: makeId,
            makeName: make.Make_Name,
            vehicleTypes: vehicleTypeReq
        })
    }
    res.status(200).json(allVehicles)
};

module.exports = parsingXML;