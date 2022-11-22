const fs = require('fs')

const DB = {
    name: "Florencia",
    lastname: "Diaz",
    age: 21
}

jsonStr = JSON.stringify(DB)
fs.promises.writeFile('DB.json', jsonStr)
    .then(() => {
        console.log('DB saved!');
    })
    .catch(e => {
        console.error('ERROR', e);
    })