let site = document.location;
let link = new URL(site)
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


let addToCartButton = document.getElementById("addToCart")

addToCartButton.addEventListener("click", () => {

    let quantitySelected = parseInt(document.getElementById("quantity").value);
    let colorSelected = document.getElementById('colors').value
    // on définit les paramètres de personnalisation du client, et l'ID afin d'isoler le produit selectionné
    let productToAddInLocalStorage =
        {
            id: productId,
            quantity: quantitySelected,
            color: colorSelected
        }

    // ajout des produits dans le local storage
    addProductInLocalStorage(productToAddInLocalStorage);

    // Rediriger ver la page panier
    document.location.href = "cart.html";
})

// utilisation des produits présents dans le local storage
function getProductsFromLocalStorage() {
    let products = localStorage.getItem("products")
    if (products == null) {
        return []
    } else {
        return JSON.parse(products);
    }
}

function addProductInLocalStorage(productToAddInLocalStorage) {
    // Récupérer les produits dans le local storage
    let products = getProductsFromLocalStorage();

    // Est ce que le produit existe déjà dans le localStorage ?
    let productKeyInLocalStorage = findProductKeyInLocalStorage(productToAddInLocalStorage, products);

    // Mettre à jour le tableau "products" à ajouter ensuite dans le local storage
    if (productKeyInLocalStorage === null) {
        products.push(productToAddInLocalStorage);
    } else {
        let productToUpdate = products[productKeyInLocalStorage];
        productToUpdate.quantity += productToAddInLocalStorage.quantity;
        products[productKeyInLocalStorage] = productToUpdate;
    }

    // On met à jour le local storage
    localStorage.setItem('products', JSON.stringify(products));
}

function findProductKeyInLocalStorage(productToAddInLocalStorage, products) {
    let productKeyFound = null;
    console.log("products test", products)
    products.forEach(function (product, key) {
        if (product.id === productToAddInLocalStorage.id && product.color === productToAddInLocalStorage.color) {
            productKeyFound = key;
        }
    });
    return productKeyFound;
}