const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch(`../jewellery.json`)
.then(res => res.json())
.then(products => {
    const product = products.find(p => p.id === parseInt(productId));
    console.log(product.title);
    document.querySelector('.title').textContent = product.title;
    document.querySelector('.description').textContent = product.description;
    document.querySelector('.price').textContent = `LE ${product.price}`;
    document.querySelector('.date').textContent = product.date;
    document.querySelector('.image').src = product.img;

    const cartButton = document.querySelector('.addToCart');
    //handle add to cart
});