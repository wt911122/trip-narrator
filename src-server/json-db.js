const fs = require('fs-extra')
const path = require('path');
const jsonFilePath = path.resolve(__dirname, './travel.json');

async function writeJson(operation) {
    try {
        const travelObj = await fs.readJson(jsonFilePath);
        const newTravelObj = operation(travelObj);
        await fs.writeJson(jsonFilePath, newTravelObj);
        return newTravelObj;
    } catch (err) {
        console.log(err);
    }
}

async function readJson() {
    try {
        const travelObj = await fs.readJson(jsonFilePath);
        return travelObj;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    writeJson,
    readJson
}