const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {
    writeJson,
    readJson
} = require('./json-db')
const app = express()
const port = 3000;
app.use(bodyParser.json()) 

app.use('/', express.static(path.resolve(__dirname, 'public')));
app.post('/action/checkin', async function (req, res) {
    const address = req.body.location.address;
    const data = await writeJson((obj) => {
        const target = obj.locations.find(loc => loc.address === address);
        target.checkin = Date.now();
        return obj;
    });
    res.json({
        code: 200,
        data
    })
    res.end();
});
app.get('/action/getTravel', async function (req, res) {
    const data = await readJson();
    res.json({
        code: 200,
        data   
    })
    res.end();
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))