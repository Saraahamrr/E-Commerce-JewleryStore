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
    document.querySelector('.img1').src = product.img;

    const cartButton = document.querySelector('.addToCart');
    //handle add to cart
    cartButton.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCartHandler(product.id)
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
