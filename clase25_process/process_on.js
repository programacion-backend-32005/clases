
process.on('exit', code => {
    console.log(`Este texto se mostrara justo ante de salir del proceso `, code)
})

process.on('uncaughtException', exception => {
    console.log(`Este codigo atrapa todas las excepciones no controladas`);
})

process.on('message', message => {
    console.log('Este texto se muestra cuando reciba un mensaje de otro proceso')
})


console()
//process.exit(1)