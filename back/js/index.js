 
const link = document.getElementById('link')
let kanapData = []
 
 
fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then((data) => {
        kanapData = data
 
        kanapData.forEach(element  => {
            console.log(element)
            let a = document.createElement('a');
            let article = document.createElement('article');
            article.classList.add('productCard');
            let img = document.createElement('img');
            img.classList.add('productImage');
            let h3 = document.createElement('productName');
            h3.classList.add('productName');
            let p = document.createElement('p');
            p.classList.add('productDescription');
 
            items.appendChild(a);
            a.appendChild(article);
            article.appendChild(img);
            article.appendChild(h3);
            article.appendChild(p);

            img.src      = element.imageUrl;
            h3.innerHTML = element.name;
            p.innerHTML  = element.description;
            a.href       = "product.html?id=" + element._id

        });
       
    })
 
 
 
 

