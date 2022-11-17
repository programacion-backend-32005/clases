
new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000)
})
    .then(result => {
        console.log(result);
    })


console.log("FIN ");