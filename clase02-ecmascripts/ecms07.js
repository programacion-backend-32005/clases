const valoresBase = [1, 2, 3, 4, 5, 6, 7, 8]
const nuevosValores = valoresBase.map((numero, idx) => numero**idx)
console.log(nuevosValores);


let nombres = ["Paula", "Emiliano Alfonsin", "German Rodas", "Pawluk", "Claudio Quevedo"]

if(nombres.includes("Pauka")) {
    console.log("Pauka llego a la party!!");
} else {
    console.log("La party esta aburrida sin Pauka :( ");
}