// On récupère les produits enregistrés dans le local storage
let productsFromLocalStorage = localStorage.getItem('products');
// On converti les produits qui sont de type "texte" en tableau pour pouvoir utiliser la fonction forEach ensuite par exemple
let productsFromLocalStorageArray = JSON.parse(productsFromLocalStorage);
// on déclare une variable qui va gérer le prix total de notre commande
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
// On fait un appel a l'API pour récupérer les données manquantes des options produits (imageUrl, prix)
fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then((products) => {

        // boucle d'affichage des produits. On fait une première boucle dans l'api puis dans le local storage
        // Pour chaque produit, on créé un article avec structure html définie, et on lui donne ses données à y afficher
        products.forEach(product => {
            productsFromLocalStorageArray.forEach(localProduct => {
                if(localProduct.id === product._id){
                    // création d'article dans la section voulue, pour chaque produit dans le local storage
                    sectionCartItemsEl.appendChild(createArticle(product, localProduct.quantity, localProduct.color))
                    totalPrice += product.price

                }

            });
        });
    displayTotalPrice(totalPrice)
})
// Affichage du prix total de la commande
function displayTotalPrice(totalPrice){
    const displayPrice = document.getElementById("totalPrice")
    displayPrice.textContent = totalPrice
}
// On génère une aboresence html qui se reproduira pour chaque produit ainsi que les classes pour adapter le style
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

    let deleteItem = cartItemContentSetting.appendChild(document.createElement("button"))
    deleteItem.classList.add("deleteItem")
    deleteItem.setAttribute("id", "deleteItem")
    deleteItem.textContent = "Supprimer"

    return newArticle
}

//**** Gestion de la supression d'article du Local Storage *****//

let btnDeleteProductInLocalStorage = document.getElementsByClassName("deleteItem")
// email and error email
let emailInput = document.getElementById("email")
let emailErrorMsg = document.getElementById("emailErrorMsg")
// firstname et erreur
let firstNameClient = document.getElementById("firstName")
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
// lastname et erreur
let lastNameClient = document.getElementById("lastName")
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
// adresse et erreur
let addressErrorMsg = document.getElementById("adressErrorMsg")
let adressClient = document.getElementById("adress")


//**** Gestion de donnée du formulaire client *****//
let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
};
// Critère de validation d'adresse email //
let regexEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9-_]+[.]{1}[a-z]{2,10}$');

function clientEmailVerification () {
if (regexEmail.test(contact.email) === false) {
    emailErrorMsg.textContent = 'Veuillez saisir une adresse Email valide';
    return false;
} else {
    emailErrorMsg.textContent = '';
}
return true;
}

// critère de validation de nom/prénom

let regexName = new RegExp('^[a-zA-Z-_]{2,15}')

function clientFirstNameVerification(){
if (regexName.test(contact.firstName) === false){
    firstNameErrorMsg.textContent = 'Veuillez saisir un prénom valide'
    return false
} else {
    firstNameErrorMsg.textContent = ''
} 
return true
}

function clientLastNameVerification(){
    if (regexName.test(contact.firstName) === false){
        firstNameErrorMsg.textContent = 'Veuillez saisir un nom valide'
        return false
    } else {
        firstNameErrorMsg.textContent = ''
    } 
    return true
}

// critère validation d'adresse
let regexAdress = new RegExp("^[a-zA-Z0-9\s,-]*$")

function clientAdressVerification(){
    if (regexAdress.test(contact.address) === false){
        addressErrorMsg.textContent = 'Veuillez saisir une adresse valide'
        return false
    } else {
        addressErrorMsg.textContent = ''
    } 
    return true
}
// critère validation de ville, comme les prénoms pas de chiffres ni de symbole, on utilise le regex name
function clientcityVerification(){
    if (regexName.test(contact.city) === false){
        cityErrorMsg.textContent = 'Veuillez saisir une ville valide'
        return false
    } else {
        cityErrorMsg.textContent = ''
    } 
    return true
}

document.getElementById('order').addEventListener('click', function verifyInfoClientOrder(){
    clientcityVerification()
    clientAdressVerification()
    clientFirstNameVerification()
    clientLastNameVerification()
    clientEmailVerification ()
})

verifyInfoClientOrder()