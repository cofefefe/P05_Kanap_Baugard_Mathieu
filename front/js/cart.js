// On récupère les produits enregistrés dans le local storage
let productsFromLocalStorage = localStorage.getItem('products');
// On converti les produits qui sont de type "texte" en tableau pour pouvoir utiliser la fonction forEach ensuite par exemple
let productsFromLocalStorageArray = JSON.parse(productsFromLocalStorage);

let sectionCartItemsEl = document.getElementById('cart__items');
// on récupère le modèle de l'article
let cartItemPrototypeEl = document.querySelector('.cart__item');
let productId = productsFromLocalStorage.id;
// on récupère le positionnement de l'image sur la page html
let displayImgOnBasketPage = document.getElementsByClassName("cart__item__img")


// on récupère les données sauvegardées dans le local storage dans un tableau, en passant par l'ID
function getProductIdsFromLocalStorage() {
    let productIds = [];
    for (let product of productsFromLocalStorageArray) {
        productIds.push(product.id);
    }
    console.log(productIds)
    return productIds;
}
// On affiche ces données
fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then((products) => {
        let productsImg = products.imageUrl
        console.log(products)
        console.log(products[1].imageUrl)

        for (let product of productsFromLocalStorageArray) {
            let imgEl = document.getElementById("img");
            imgEl.src = product.imageUrl;
            imgEl.alt = product.altTxt;
            console.log(products.imageUrl[productsFromLocalStorageArray])

        }   
    })