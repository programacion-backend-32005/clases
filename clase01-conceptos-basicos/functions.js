
function miNombreNoElTuyo(name, lastname, age=30) {
    let variableInterna = 127
    console.log('Saludos a mi amigo ', name);

    return variableInterna
}

console.log( miNombreNoElTuyo("Hector") );


const saludar = (name, age) => {
    console.log('Saludos para ', name);
    return age * 2
}  
const a = o => o * 23