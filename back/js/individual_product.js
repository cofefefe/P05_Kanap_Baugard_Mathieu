let site = document.location;
let link = new URL (site)
let productId = link.searchParams.get("id");

fetch('http://localhost:3000/api/products/' + productId)
    .then(res => res.json())
    .then((data) => {

    // Show image //
    let img = document.createElement('img')
    img.src = data.imageUrl
    img.alt = data.altTxt;
    let itemImg = document.querySelector('.item__img');
    itemImg.appendChild(img);

    // Show description //
    let description = document.getElementById('description');
    description.textContent = data.description;

    // Show price product //
    let price = document.getElementById('price')
    price.textContent = data.price
    // Price modifier thanks to quantity  !!FEATURE not over//
    let multiplier = document.getElementById('quantity')
    if(multiplier != 0){
        price.textContent = data.price*number(multiplier)
    }else{
        price.textContent = data.price
    }
    
    // Colors variation product //
    let colors = document.getElementById('colors');
        for (let color of data.colors) {
            let option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            colors.appendChild(option);
        }
})

