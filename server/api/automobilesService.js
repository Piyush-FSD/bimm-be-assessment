const axios = require('axios')

const getMakes = async () => {
    const results = await axios("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML")

    return results.data;
};

const getVehicleTypesForMake = async (makeId) => {
    const response = await axios(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`)

    return response.data
};

module.exports = {
    getMakes,
    getVehicleTypesForMake
};