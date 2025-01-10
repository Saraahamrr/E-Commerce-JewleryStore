async function getBracelets(category) {
    try {
        const response = await fetch('../jewellery.json'); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json(); 
        return products.filter(product => product.category === category); 
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
}

getBracelets('bracelets').then(bracelets => {
    const container = document.getElementById('container');

    const itemsCount = bracelets.length;
    const conter = document.createElement('p');
    conter.textContent = `${itemsCount} PRODUCTS`; 
    conter.className = 'conter';

    // Cards wrapper
    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'cards';

    container.appendChild(conter);
    container.appendChild(cardsWrapper);

    bracelets.forEach(bracelet => {
        const card = document.createElement('div');
        card.className = 'card';
<<<<<<< HEAD
=======
        card.addEventListener('click', function () {
            window.location.href = `../productDetails/productD.html?id=${bracelet.id}`;
        });
>>>>>>> master

        const img = document.createElement('img');
        img.src = bracelet.img;

        const title = document.createElement('h3');
        title.className = 'product-title';
        title.textContent = bracelet.title;

        const price = document.createElement('p');
        price.className = 'product-price';
        price.textContent = `LE ${bracelet.price}`;

        const addToCart = document.createElement('button');
        addToCart.className = 'addToCart';
        addToCart.textContent = 'Add To Cart';
        //handle addToCart feature here

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(addToCart);

        cardsWrapper.appendChild(card);
    });
});

