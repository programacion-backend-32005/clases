// TRIM
const saludo = "                      Hola, saludos para mi amigo Alan !!       oooo     "

console.log(saludo.trim());

const mensajes = []
const mensaje1 = "     sii   "

if(mensaje1.trim().length > 0) mensajes.push(mensaje1.trim())
else console.log("Mensaje vacio, no se agrega");

console.log(mensajes);


// FLAT
const arrayAnidado = [1, 4, 12, 52, -1212, 0, [21, 2, 4, 7, 9], 90, 91, [127, 122]]
const result = arrayAnidado.flat()

console.log(result);