const xml2js = require('xml2js')
const parseDataService = require("./automobilesService.js")

const getAllVehicles = async (req, res) => {
    try {
        const xmlParser = new xml2js.Parser({
            explicitArray: false
        });

        let allMakes = await parseDataService.getMakes();
        let allMakesData = [];

        xmlParser.parseString(allMakes, function (err, result) {
            allMakesData = result.Response.Results.AllVehicleMakes;
        });
        let allVehicles = [];

        for (const make of allMakesData) {
            const makeId = make.Make_ID;
            const vehicleTypeReqXML = await parseDataService.getVehicleTypesForMake(makeId);

            let vehicleTypeReq = [];
            xmlParser.parseString(vehicleTypeReqXML, function (err, result) {
                vehicleTypeReq = result.Response.Results.VehicleTypesForMakeIds;
            });

            allVehicles.push({
                makeId: makeId,
                makeName: make.Make_Name,
                vehicleTypes: vehicleTypeReq
            });
            // console.log(allVehicles, 'ALL VEHIULES')
        }
        console.log(allVehicles, 'all vehs')
        return res.status(200).json(allVehicles);
    } catch (error) {
        console.log(error)
    }
};

module.exports = getAllVehicles;