async function getRings(category) {
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

getRings('rings').then(rings => {
    const container = document.getElementById('container');

    const itemsCount = rings.length;
    const conter = document.createElement('p');
    conter.textContent = `${itemsCount} PRODUCTS`; 
    conter.className = 'conter';

    // Cards wrapper
    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'cards';

    container.appendChild(conter);
    container.appendChild(cardsWrapper);

    rings.forEach(ring => {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', function () {
            window.location.href = `../productDetails/productD.html?id=${ring.id}`;
        });

        const img = document.createElement('img');
        img.src = ring.img;

        const title = document.createElement('h3');
        title.className = 'product-title';
        title.textContent = ring.title;

        const price = document.createElement('p');
        price.className = 'product-price';
        price.textContent = `LE ${ring.price}`;

        const addToCart = document.createElement('button');
        addToCart.className = 'addToCart';
        addToCart.textContent = 'Add To Cart';
        //handle addToCart feature here
        addToCart.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCartHandler(ring.id)
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(addToCart);

        cardsWrapper.appendChild(card);
    });
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
