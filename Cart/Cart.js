/* 
showing the cart when clicking on the cart icon
*/
let body = document.querySelector('body');
let iconCart = document.querySelector('.icon');
iconCart.addEventListener('click', function() {
    body.classList.toggle('ShowCart');
});


/*
closing the cart when clicking on the close button
*/
let closeCart = document.querySelector('.closeCart');
closeCart.addEventListener('click',function(){
    body.classList.toggle('ShowCart');
})


/* 
fetching the products from the json file
*/

let listProductsHtml = document.querySelector('.listProducts');
let listProduct = [];


const addDataToHTML = () => {
    listProduct.innerHTML = '';
    if (listProduct.length > 0) {
        listProduct.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id; /*adding id to each item using its id in the json file*/
            newProduct.innerHTML = `
                <img src="../jewelry/categories/${product.img}" alt="">
                <h2>${product.title}</h2>
                <div class="price">${product.price} EGP </div>
                <button class="addCart">
                Add To Cart
                </button>
            `;
            listProductsHtml.appendChild(newProduct);
        });
    }
};

const initApp = () => {
    fetch('../jewelry/categories/jewellery.json')
        .then(response => response.json())
        .then(data => {
            listProduct = data;

            // Load cart from localStorage
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            // Update cart display
            showCart(cart);
            addDataToHTML();
        });
};


initApp();

/* 
adding the products to the cart
*/

listProductsHtml.addEventListener('click', function(e) {
    let positionClick = e.target; /*where we are clicking */
    if (positionClick.classList.contains('addCart')) {
        /*if the place we are clicking on has the class addcart do this */
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

/* let things to be updated and needs action */
let cartListHTML = document.querySelector('.cartList');
let cart = []

/* product_id , quantity */
const addToCart =(product_id)=>{

let positioninCartList = cart.findIndex((value) => value.product_id == product_id);


    if (cart.length === 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }]
    }
    //console.log(cart);
    //find index return -1 if not found
    else if (positioninCartList < 0){
        cart.push({
            product_id: product_id, 
            quantity: 1
        })

    }
    else{
        cart[positioninCartList].quantity +=1;
    }
    // showing the cart and it items 
    showCart(cart);
    addCartToMemory();
}
/* saving data for loign again */
/// declaring the function to add the cart to the memory
const addCartToMemory = () => {
localStorage.setItem('cart', JSON.stringify(cart));
}

/* show items + information into cart */
/* id , image , name ,price , quantity */
let iconCartspan = document.querySelector('.icon span');
const showCart = () => {
    let totalQuantity = 0;
    let totalPrice = 0;

    cartListHTML.innerHTML = '';

    if (cart.length > 0) {
        cart.forEach(item => {
            const product = listProduct.find(p => p.id == item.product_id);
            if (product) {
                totalQuantity += item.quantity;
                totalPrice += product.price * item.quantity;

                let newProduct = document.createElement('div');
                newProduct.classList.add('Item');
                newProduct.dataset.id = item.product_id;
                newProduct.innerHTML = `
                    <div class="image">
                        <img src="${product.img}" alt="" />
                    </div>
                    <div class="name">${product.title}</div>
                    <div class="price">${product.price * item.quantity} EGP</div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                    <span class="remove">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                `;
                cartListHTML.appendChild(newProduct);
            }
        });

        // Total price section
        let newTotalPrice = document.createElement('div');
        newTotalPrice.classList.add('total');
        newTotalPrice.innerHTML = `
            <h3>
                Total: <span>${totalPrice}</span> EGP
            </h3>
        `;
        cartListHTML.appendChild(newTotalPrice);
    }

    iconCartspan.textContent = totalQuantity;
};

/* removing items from the cart */
cartListHTML.addEventListener('click', function (e) {
    let positionClick = e.target;
    let product_id;

    // Handle remove button
    if (positionClick.closest('.remove')) {
        product_id = positionClick.closest('.Item').dataset.id;
        removeFromCart(product_id);
    }

    // Handle plus button
    if (positionClick.classList.contains('plus')) {
        product_id = positionClick.closest('.Item').dataset.id;
        let positioninCartList = cart.findIndex((value) => value.product_id == product_id);
        cart[positioninCartList].quantity += 1;
        showCart(cart);
        addCartToMemory();
    }

    // Handle minus button
    if (positionClick.classList.contains('minus')) {
        product_id = positionClick.closest('.Item').dataset.id;
        let positioninCartList = cart.findIndex((value) => value.product_id == product_id);
        if (cart[positioninCartList].quantity > 1) {
            cart[positioninCartList].quantity -= 1;
        } else {
            removeFromCart(product_id);
        }
        showCart(cart);
        addCartToMemory();
    }
});
const removeFromCart = (product_id) => {
    let positioninCartList = cart.findIndex((value) => value.product_id == product_id);
    if (positioninCartList >= 0) {
        cart.splice(positioninCartList, 1);
        showCart(cart);
        addCartToMemory();
    }
}



