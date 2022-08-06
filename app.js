const express = require('express');
const app = express();
var cors = require('cors');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

const port = 3000;

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/scan', async (req, res) => {
    console.log("COMENZANDO");

    const { stdout, stderr } = await exec('scanimage -p --resolution 250 --mode Color -x 215.9 -y 279.4 -o ./scan/scan.png; convert ./scan/scan.png ./scan/scan.pdf');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
    console.log(`Number of files ${stdout}`);

    const data = fs.readFileSync('./scan/scan.pdf');
    res.contentType("application/pdf");
    console.log("HA TERMINADO");
    res.send(data);

    fs.unlinkSync('./scan/scan.png');
    fs.unlinkSync('./scan/scan.pdf');

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});