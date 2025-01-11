fetch('../jewellery.json')
.then(res => {
    if(!res.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return res.json();
})
.then(products => {
    // Shuffle products array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffledProducts = shuffleArray(products);

    const container = document.getElementById('container');

    const itemsCount = shuffledProducts.length;
    const conter = document.createElement('p');
    conter.textContent = `${itemsCount} PRODUCTS`; 
    conter.className = 'conter';

    // Cards wrapper
    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'cards';

    container.appendChild(conter);
    container.appendChild(cardsWrapper);

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', function () {
            window.location.href = `../productDetails/productD.html?id=${product.id}`;
        });

        const img = document.createElement('img');
        img.src = `../images/${product.img}`; 

        const title = document.createElement('h3');
        title.className = 'product-title';
        title.textContent = product.title;

        const price = document.createElement('p');
        price.className = 'product-price';
        price.textContent = `LE ${product.price}`;

        const addToCart = document.createElement('button');
        addToCart.className = 'addToCart';
        addToCart.textContent = 'Add To Cart';
        //handle addToCart feature here
        addToCart.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCartHandler(product.id)
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(addToCart);

        cardsWrapper.appendChild(card);
    });
})
.catch(error => {
    console.error('Error fetching the JSON file:', error);
});

const addToCartHandler = (productId) => {
    const sortedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = sortedCart.findIndex(item => item.product_id === productId);

    if(productIndex > -1){
        sortedCart[productIndex].quantity += 1;
    } else{
        sortedCart.push({product_id: productId, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(sortedCart));
    alert('Product added to cart');
}