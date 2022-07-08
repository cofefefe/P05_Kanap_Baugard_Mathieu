// On récupère les produits enregistrés dans le local storage
let productsFromLocalStorage = localStorage.getItem('products');
// On converti les produits qui sont de type "texte" en tableau pour pouvoir utiliser la fonction forEach ensuite par exemple
let productsFromLocalStorageArray = JSON.parse(productsFromLocalStorage);

let sectionCartItemsEl = document.getElementById('cart__items');
// on récupère le modèle de l'article
let cartItemPrototypeEl = document.querySelector('.cart__item');
// on récupère le positionnement de l'image sur la page html
let displayImgOnBasketPage = document.getElementsByClassName("cart__item__img")

let productInfo = [];
// on récupère les données sauvegardées dans le local storage dans un tableau, en passant par l'ID
function getProductFromLocalStorage() {
    
    for (let product of productsFromLocalStorageArray) {
        productInfo.push(product);
    }
    return productInfo;
}
// On affiche ces données
fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then((products) => {
        


        for (let product of productsFromLocalStorageArray) {

            let productIds = getProductFromLocalStorage()

            document.getElementsByTagName("article")
            cartItemEl.dataset.color = product.color;

            console.log(product.color)
            let productsImg = products.imageUrl
        console.log(productsImg)
            console.log(productInfo)
        }


       
    })
