const fs = require('fs')

fs.writeFileSync('./ejemplo.txt', "Saludos a Leantro Troncoso!!! \n")

const filename = './ejemplo.txt'

if( fs.existsSync(filename) ) {
    console.log('El archivo existe');

    const contenido = fs.readFileSync(filename, 'utf-8')
    console.log(contenido);

    fs.appendFileSync(filename, 'Tu pagina web es awesome!!\n')

    fs.unlinkSync(filename)

} else {

    console.log('El archivo no existe');
}