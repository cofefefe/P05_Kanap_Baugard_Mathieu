

let button = document.getElementById("addToCart")

button.addEventListener("click", () => {
    fetch('http://localhost:3000/api/products/' + productId)
    .then(res => res.json())
    .then((data) => {

        let optionsProduct = 
        {
            productName : data.name,
            productId : data._id,
            quantity : document.getElementById('quantity').value,
            color : document.getElementById('colors').value
        }

        let productInLocalStorage = JSON.parse(localStorage.getItem("product"))
        // s'il y a un produit dans le local storage  //
        if(productInLocalStorage == true){
            productInLocalStorage.push(optionsProduct)
            localStorage.setItem("produit", JSON.stringify(productInLocalStorage))
        }
        // s'il n'y a pas un produit dans le local storage  //
        else{
            productInLocalStorage = []
            productInLocalStorage.push(optionsProduct)
            console.log(productInLocalStorage)
            localStorage.setItem("produit", JSON.stringify(productInLocalStorage))
        }
})
})