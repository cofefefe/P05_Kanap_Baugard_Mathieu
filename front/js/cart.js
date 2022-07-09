// On récupère les produits enregistrés dans le local storage
let productsFromLocalStorage = localStorage.getItem('products');
// On converti les produits qui sont de type "texte" en tableau pour pouvoir utiliser la fonction forEach ensuite par exemple
let productsFromLocalStorageArray = JSON.parse(productsFromLocalStorage);
let totalPrice = 0
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


        products.forEach(product => {
            productsFromLocalStorageArray.forEach(localProduct => {
                if(localProduct.id === product._id){
                    sectionCartItemsEl.appendChild(createArticle(product, localProduct.quantity, localProduct.color))
                    totalPrice += product.price

                }

            });
        });
    displayTotalPrice(totalPrice)
})
function displayTotalPrice(totalPrice){
    const displayPrice = document.getElementById("totalPrice")
    displayPrice.textContent = totalPrice
}

function createArticle (product, quantity, color) {
    let newArticle = document.createElement("article")
    newArticle.classList.add("cart__item")
    newArticle.dataset.id = product._id
    newArticle.dataset.color = color
    
    let imageContainer = newArticle.appendChild(document.createElement("div"))
    imageContainer.classList.add("cart__item__img") 
    let image = imageContainer.appendChild(document.createElement("img"))
    image.setAttribute('alt', product.altTxt)
    image.setAttribute('src', product.imageUrl)

    let cartItemContainer = newArticle.appendChild(document.createElement("div"))
    cartItemContainer.classList.add("cart__item__content")
    let cartItemDescription = cartItemContainer.appendChild(document.createElement("div"))
    cartItemDescription.classList.add("cart__item__content__description")
    cartItemDescription.textContent = product.description

    let cartItemContentSetting = cartItemContainer.appendChild(document.createElement("div"))
    cartItemContentSetting.classList.add("cart__item__content__settings")


    let cartItemQuantity = cartItemContentSetting.appendChild(document.createElement("div"))
    cartItemQuantity.classList.add("cart__item__content__settings__quantity")
    let quantitySettings = cartItemQuantity.appendChild(document.createElement("p"))
    quantitySettings.textContent = "Qté :"
    let quantityInput = cartItemQuantity.appendChild(document.createElement("input"))
    quantityInput.classList.add("itemQuantity")
    quantityInput.setAttribute('type', 'number')
    quantityInput.setAttribute('name', 'itemQuantity')
    quantityInput.setAttribute('min', '1')
    quantityInput.setAttribute('max', '100')
    quantityInput.setAttribute('value', quantity)

    let deleteItem = cartItemContentSetting.appendChild(document.createElement("p"))
    deleteItem.classList.add("deleteItem")
    deleteItem.textContent = "Supprimer"

    return newArticle
}

