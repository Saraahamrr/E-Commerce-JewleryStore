//showing the cart when clicking on the cart icon
// let body = document.querySelector('body');
// let iconCart = document.querySelector('.icon');
let iconCart = document.getElementById('cart-icon');
iconCart.addEventListener('click', function() {
    document.body.classList.toggle('ShowCart');
});

//closing the cart when clicking on the close button
let closeCart = document.querySelector('.closeCart');
closeCart.addEventListener('click',function(){
    document.body.classList.toggle('ShowCart');
})

//creating list for the products 
let listProductsHtml = document.querySelector('.listProducts');
let listProduct = [];

//fetching the products from the json file
const initApp = () => {
    fetch('../jewellery.json')
        .then(response => response.json())
        .then(data => {
            listProduct = data;
        
        //checking if there is a cart in the local storage
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            showCart(cart);
            //addDataToHTML();
        }
    });
};


initApp();

// adding the products to the cart
listProductsHtml.addEventListener('click', function(e) {
    let positionClick = e.target; 
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

//creating cart list Array
let cartListHTML = document.querySelector('.cartList');
let cart = []
// getting the properties of the product and adding it to the cart
const addToCart =(product_id)=>{

let positioninCartList = cart.findIndex((value) => value.product_id == product_id);

    if (cart.length === 0){
        cart = [{
            product_id: product_id,
            title : listProduct[product_id].title || "",
            quantity: 1,
            image : listProduct[product_id].img || "",
            price : listProduct[product_id].price || 0,
        }]
    }
    //find index return -1 if not found
    else if (positioninCartList < 0){
        cart.push({
            product_id: product_id, 
            title : listProduct[product_id].title || "",
            quantity: 1,
            image : listProduct[product_id].img || "",
            price : listProduct[product_id].price || 0,
        });
    }
    else{
        cart[positioninCartList].quantity +=1;
    }

    //showing the cart and it items 
    showCart(cart);
    addCartToMemory();
}

//saving data for loign again
const addCartToMemory = () => {
localStorage.setItem('cart', JSON.stringify(cart));
}

//show items in the cart 
//id, image, title, quantity, price. 
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
    //showing the total quantity of the cart
    iconCartspan.textContent = totalQuantity;

    //saving the total quantity in the local storage
    const addSpanToMemory = () => {
        localStorage.setItem('iconCartspan',  iconCartspan.textContent);
    }
    
    addCartToMemory();
    addSpanToMemory();
};

//Handling Cart Buttons
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
//remove from cart function
const removeFromCart = (product_id) => {
    let positioninCartList = cart.findIndex((value) => value.product_id == product_id);
    if (positioninCartList >= 0) {
        cart.splice(positioninCartList, 1);
        showCart(cart);
        addCartToMemory();
    }
}

const checkout = () => {
    window.location.href = './CheckoutPage/CheckoutPage.html';
}


