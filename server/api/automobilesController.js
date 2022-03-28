const xml2js = require('xml2js');
const parseDataService = require("./automobilesService.js");
const getConnection = require('../connection/dbConnection.js')

const getAllVehicles = async (req, res) => {
    try {
        const client = await getConnection();
        const db = client.db("BIMM");

        let allVehicles = [];
        let allMakesData;

        const xmlParser = new xml2js.Parser({
            explicitArray: false
        });

        let vehicleMakes = await parseDataService.getMakes();
        xmlParser.parseString(vehicleMakes, function (err, result) {
            if (err) throw err
            allMakesData = result.Response.Results.AllVehicleMakes;
        });

        const firstTenMakes = allMakesData.slice(0, 10)
        for (const make of firstTenMakes) {
            const makeId = make.Make_ID;
            const vehicleType = await parseDataService.getVehicleTypesForMake(makeId);

            let vehicleTypeReq;
            xmlParser.parseString(vehicleType, function (err, result) {
                if (err) throw err
                vehicleTypeReq = result.Response.Results.VehicleTypesForMakeIds;
            });

            let vehicleMake = {
                makeId: makeId,
                makeName: make.Make_Name,
                vehicleTypes: vehicleTypeReq
            }

            if (vehicleMake) {
                allVehicles.push(vehicleMake)
            }

        };
        const insertData = await db.collection("vehicles").insertMany(allVehicles);

        return res.status(200).json(insertData);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
};

module.exports = getAllVehicles;