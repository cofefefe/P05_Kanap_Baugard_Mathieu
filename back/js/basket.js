const addKanap = document.getElementById("addToCart")

fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then((data) => {

    // Basket save //
    function saveBasket () {
        localStorage.setItem("basket", JSON.stringify(basket))
    }

    /// Récupération des données sauvegardées par local storage ///
    function getBasket() {
    let basket = localStorage.getItem("product.html?id=" + data._id)
    if(basket == null){
        return [];
    }else{
        return JSON.parse(basket);
    }}

    function addBasket(product) {
        fetch('http://localhost:3000/api/products')
        .then(res => res.json())
        .then((data) => {
 
        let basket = getBasket()
        let findProduct = basket.find(p => p.id == "product.html?id=");
        value = product._id
        if(findProduct != undefined){
            findProduct.quantity++
        }else{
            product.quantity = 1
            basket.push(product)
        }
    })}
    /// suppression de donnée dans le localStorage par le client ///
function removeBasket(product){
    let basket = getBasket()
    basket = basket.filter(p => p.id != product.id)
    saveBasket(basket)
}
/// controle de la quantité pour avoir des sommes pertinentes ( pas de -1 ) ///
function changeQuantity(product, quantity){
    let basket = getBasket();
    let findProduct = basket.find(p => p.id == "product.html?id=" + data._id)
    if (findProduct != undefined) {
        findProduct.quantity += quantity
        if(findProduct.quantity <= 0){
            removeBasket(findProduct)
        } else {
            saveBasket(basket)
        }
    }
}
/// optimisation de la quantité ///
function numberProduct() {
    let basket = getBasket()
    let number = 0
    for(let product of basket){
        number += product.quantity
    }
    return number
}
/// Multiplicateur pour afficher prix correct ///
function totalPrice() {
    let basket = getBasket()
    let number = 0
    for(let product of basket){
        number += product.quantity * product.price
    }
    return number
}


})
addKanap.addEventListener('click', () => {
    saveBasket()
    addBasket()
    changeQuantity()
    numberProduct()
    totalPrice()
})

