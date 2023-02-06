const addForm = document.getElementById("addForm")

addForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const price = document.getElementById("price").value
    const thumbnail = document.getElementById("thumbnail").value
    const stock = document.getElementById("stock").value
    const category = document.getElementById("category").value

    const response = await fetch("http://127.0.0.1:8080/api/products" , {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            title,
            description,
            price: +price,
            thumbnail,
            stock: +stock,
            category
        })
    })
    const data = await response.json()
    if(response.status == 200){
        alert("se agrego correctamente el producto")
    } else {
        alert("Error no se pudo agregar el producto")
    }
})