const axios = require("axios")

async function postProducto(){

    const title = document.getElementById("title").value
    const price = document.getElementById("price").value
    const url = document.getElementById("url").value

    if (!title || !price || !url) {
        
        alert("Ingrese todos los datos  ")
        return false
    } else {

        try {
            const res = await axios.post("http://localhost:8080/api/productos" , {

                title : title,
                price : price,
                url : url

            })
        
        alert(res.data.msg)

        } catch (error) {
            alert(error)
        }
        return true

    }
   

}