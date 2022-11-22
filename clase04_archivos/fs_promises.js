const fs = require('fs')

const filename = './example.txt'
const operacionesAsync = async() => {

    await fs.promises.writeFile(filename, 'Saludos a los tutores !!')
    
    const contenido = await fs.promises.readFile(filename, 'utf-8')
    console.log('CONTENIDO: ', contenido);

    await fs.promises.appendFile(filename, '\nOtro saludo mas !!')

    const contenidoNew = await fs.promises.readFile(filename, 'utf-8')
    console.log('NEW CONTENIDO: ', contenidoNew);

    await fs.promises.unlink(filename)
}

operacionesAsync()