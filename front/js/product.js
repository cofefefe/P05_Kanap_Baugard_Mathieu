let site = document.location;
let link = new URL (site)
let productId = link.searchParams.get("id");

fetch('http://localhost:3000/api/products/' + productId)
    .then(res => res.json())
    .then((product) => {

    // Show image //
    let img = document.createElement('img')
    img.src = product.imageUrl
    img.alt = product.altTxt;
    let itemImg = document.querySelector('.item__img');
    itemImg.appendChild(img);

    // Show description //
    let description = document.getElementById('description');
    description.textContent = product.description;

    // Show price product //
    let price = document.getElementById('price')
    price.textContent = product.price

    // show product name //
    let title = document.querySelector('h1')
    title.textContent = product.name
    console.log(title)

    // Colors variation product //
    let colors = document.getElementById('colors');
    for (let color of product.colors) {
        let option = document.createElement('option');
        option.value = color;
        option.textContent = color;
        colors.appendChild(option);
    }
});




let url = new URL(site);



fetch('http://localhost:3000/api/products/' + productId)
    .then(function (response) {
        return response.json();
    })
    .then(function (product) {
        displayProductImage(product);

        // Display Product title
        let title = document.getElementById('title');
        title.textContent = product.name;

        // Display Product price
        let price = document.getElementById('price');
        price.textContent = product.price;

        // Display Product description
        let description = document.getElementById('description');
        description.textContent = product.description;

        // Display Product colors
        let colors = document.getElementById('colors');
        for (let color of product.colors) {
            let option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            colors.appendChild(option);
        }
    });

    let button = document.getElementById("addToCart")


button.addEventListener("click", () => {

    let quantitySelected = document.getElementById("quantity").value
    let colorSelected = document.getElementById('colors').value
  
    let optionsProduct =
        {
            productId : productId,
            quantity : quantitySelected,
            color : colorSelected
        }

    let productInLocalStorage = JSON.parse(localStorage.getItem("product"))

function getProduct () {
    let product = localStorage.getItem("product")
    if(product == null){
        return []
    }else{
        return JSON.parse(productInLocalStorage)
    }
}

function addProduct () {
    ifProductIsSimilarManageQuantity()
    let productInLocalStorage = getProduct()
    // s'il y a un produit dans le local storage on le push //
    if(productInLocalStorage){
        productInLocalStorage.push(optionsProduct)
        localStorage.setItem("product", JSON.stringify(productInLocalStorage))
    }
    // s'il n'y a pas un product dans le local storage on créé un array avant le push //
    else{
        productInLocalStorage = []
        productInLocalStorage.push(optionsProduct)
        localStorage.setItem("product", JSON.stringify(productInLocalStorage))
    }
}

// s'il y a un produit similaire dans le panier, alors on adapte simplement la quantité //
function ifProductIsSimilarManageQuantity () {
    let productInLocalStorage = getProduct()
    let productSimilarId = productInLocalStorage.find(p => p.id == productId)
    
    if(productSimilarId != undefined){
        productSimilarId.quantity++
    }else{
        optionsProduct.quantity = 1
    }
}

addProduct()

})

