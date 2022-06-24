let site = document.location;
let link = new URL (site)
let productId = link.searchParams.get("id");

fetch('http://localhost:3000/api/products/' + productId)
    .then(res => res.json())
    .then((data) => {

    let img = document.createElement('img')
    img.src = data.imageUrl
    img.alt = data.altTxt;

    let itemImg = document.querySelector('.item__img');
    itemImg.appendChild(img);

    let description = document.getElementById('description');
    description.textContent = data.description;

    let price = document.getElementById('price')
    price.textContent = data.price

    let colors = document.getElementById('colors');
        for (let color of data.colors) {
            let option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            colors.appendChild(option);
        }
})

