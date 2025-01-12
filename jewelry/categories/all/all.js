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



//showing the cart when clicking on the cart icon
let body = document.querySelector('body');
let iconCart = document.querySelector('.icon');
iconCart.addEventListener('click', function() {
    body.classList.toggle('ShowCart');
});

//closing the cart when clicking on the close button
let closeCart = document.querySelector('.closeCart');
closeCart.addEventListener('click',function(){
    body.classList.toggle('ShowCart');
})

//handle jewelry tab 
function jewelry(){
    window.location.href = '../../jewelry.html';
}

//handle home tab
function home(){
    window.location.href = '../../../home/index.html';
}

const jewwllaries = new XMLHttpRequest();
jewwllaries.open("GET", "../jewellery.json");
jewwllaries.send();
jewwllaries.onreadystatechange = function () {
    if (jewwllaries.readyState === 4) {
        var regOk = new RegExp(/^2\d{2}/);
        if (String(jewwllaries.status).match(regOk)) {
            data = JSON.parse(jewwllaries.responseText);
            const searchInput = document.getElementById("search-input");
            searchInput.addEventListener("input", function () {
                let searchText = searchInput.value.toLowerCase();
                console.log("Search text:", searchText);

                if (searchText === '') {
                    const productsContainer = document.getElementById("products-container");
                    productsContainer.innerHTML = '';
                } else {
                    let filteredjew = data.filter(product =>
                        product.title.toLowerCase().includes(searchText)
                    );
                    displayFilteredProducts(filteredjew);
                    console.log(filteredjew);
                }

            });
        }
    }
}
function displayFilteredProducts(filteredProducts) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = '';
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = "<p>No products found</p>";
        return;
    }
    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <img class="image" src="${product.img}" alt="${product.title}" />
        <div class="det">
            <h1 class="title">${product.title}</h1>
            <p class="description">${product.description}</p>
            <p class="price">${product.price}</p>
            <div class="last">
                <p class="date">${product.date}</p>
                <button class="addToCart">Add To Cart</button>
            </div>
        </div>
    `;
        productsContainer.appendChild(productDiv);

    });
}