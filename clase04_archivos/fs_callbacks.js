const fs = require('fs')

const filename = './luigi.txt'

fs.writeFile(filename, 'Saludos a Luigi!! \n', (error) => {

    if(error) return console.log('Hubo un error escribiendo');
    console.log('Archivo guardado');

    fs.readFile(filename, 'utf-8', (error, contenido) => {
        if(error) return console.log('Hubo un error leyendo');

        console.log('CONTENIDO:', contenido);
        fs.appendFile(filename, 'Saludos a LEANDRO CAPONETTO', (error) => {
            if(error) return console.log('Hubo un error agregando contenido');

            console.log('Se agrego el extra content');

            fs.unlink(filename, (error) => {
                if(error) return console.log('Hubo un error eliminando el archivo');

                console.log('Archivo eliminado');
            })

        }) // Volvemos en 21:36 arg ..

    })

})

console.log('Seguimos con las operaciones comunes...');