const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        if(divisor == 0) reject('Division entre 0')
        else resolve(dividendo/divisor)
    })
}

const functionAsincrona = async() => {
    try{
        const resultado = await dividir(10, 5)
        console.log(resultado);

        console.log("FIN");
    } catch (error) {
        console.error('ERROR:', error);
    }
}

functionAsincrona()