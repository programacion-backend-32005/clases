const fs = require('fs')

fs.promises.readFile('DB.json', 'utf-8')
    .then(contenido => {
        const json = JSON.parse(contenido)
        json.age = 22
        console.log(json);
    })
    .catch(e => console.error('ERROR', e))