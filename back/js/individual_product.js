let site = document.location;
let url = new URL(site);
let productId = url.searchParams.get("id");

function displayProductImage(product) {
    // Display Product image
    let img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    let itemImg = document.querySelector('.item__img');
    itemImg.appendChild(img);
}

displayProductImage()
