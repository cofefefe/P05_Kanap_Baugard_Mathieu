let price = document.getElementById("cart_price")
let order = document.getElementById("cart_order")
let site = document.location;
let link = new URL (site)
let productId = link.searchParams.get("id");

fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then((product) => {

        price.innerHTML = product.price
    })
 