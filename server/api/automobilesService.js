const axios = require('axios')

const getMakes = async () => {
    const results = await axios("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML")
        .catch(e => console.log(e));

    return results.data;
};

const getVehicleTypesForMake = async (makeId) => {
    return await axios(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`)
        .then(response => { return response.data })
        .catch(e => console.log(e));
};

module.exports = {
    getMakes,
    getVehicleTypesForMake
};