const jewwllaries = new XMLHttpRequest();
jewwllaries.open("GET", "jewellery.json");
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

