
/* Wishlist Implementation */

// Wishlist-related variables
let wishlist = [];
let wishlistHTML = document.querySelector('.wishlistItems');

// Add to wishlist when clicking "Add to Wishlist" button
listProductsHtml.addEventListener('click', function (e) {
    let positionClick = e.target;
    if (positionClick.classList.contains('addWishlist')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToWishlist(product_id);
    }
});

// Add item to wishlist
const addToWishlist = (product_id) => {
    if (!wishlist.includes(product_id)) {
        wishlist.push(product_id);
        showWishlist();
        saveWishlistToMemory();
    }
};

// Save wishlist to localStorage
const saveWishlistToMemory = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

// Show wishlist items
const showWishlist = () => {
    wishlistHTML.innerHTML = '';

    if (wishlist.length > 0) {
        wishlist.forEach((product_id) => {
            let positioninProductList = listProduct.findIndex((value) => value.id == product_id);
            let product = listProduct[positioninProductList];

            let newProduct = document.createElement('div');
            newProduct.classList.add('wishlistItem');
            newProduct.dataset.id = product_id;

            newProduct.innerHTML = `
                <div class="image">
                    <img src="${product.img}" alt="" />
                </div>
                <div class="name">${product.title}</div>
                <div class="price">${product.price} EGP</div>
                <span class="removeWishlist">
                    <i class="fa-solid fa-xmark"></i>
                </span>
            `;

            wishlistHTML.appendChild(newProduct);
        });
    }
};

// Remove item from wishlist
wishlistHTML.addEventListener('click', function (e) {
    let positionClick = e.target;

    if (positionClick.closest('.removeWishlist')) {
        let product_id = positionClick.closest('.wishlistItem').dataset.id;
        removeFromWishlist(product_id);
    }
});

const removeFromWishlist = (product_id) => {
    let positioninWishlist = wishlist.indexOf(product_id);

    if (positioninWishlist >= 0) {
        wishlist.splice(positioninWishlist, 1);
        showWishlist();
        saveWishlistToMemory();
    }
};

// Load wishlist from localStorage
const loadWishlistFromMemory = () => {
    if (localStorage.getItem('wishlist')) {
        wishlist = JSON.parse(localStorage.getItem('wishlist'));
        showWishlist();
    }
};

// Initialize wishlist
loadWishlistFromMemory();
