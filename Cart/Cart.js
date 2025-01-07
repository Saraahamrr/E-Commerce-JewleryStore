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
                <img src="${product.img}" alt="">
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
    fetch(`jewellery.json`)
    .then (response => response.json())
    .then(data => {
        listProduct = data;
        addDataToHTML();
    })
}

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
    else if (positioninCartList < 0){
        cart.push({
            product_id: product_id, 
            quantity: 1
        })

    }
    else{
        cart[positioninCartList].quantity +=1;
    }
    showCart(cart);
}

/* show items + information into cart */
/* id , image , name ,price , quantity */
let iconCartspan = document.querySelector('.icon span');
const showCart = () => {
let totalQuantity = 0;
// let totalPrice = 0;
    cartListHTML.innerHTML = '';
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            /*
            totalPrice += product.price * item.quantity;
           */


            /*find the product in the list of products */
            /*look for a way to make it more readable using let info item = product
            minute 24 */
            let product = listProduct.find((value) => value.id == item.product_id);
            let newProduct = document.createElement('div');
            newProduct.classList.add('Item');
            newProduct.innerHTML = `
                <div class="image">
                    <img src="${product.img}" alt="" />
                </div>
                <div class="name">${product.title}</div>
                <div class="price">${product.price * item.quantity}  EGP</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span> ${item.quantity} </span>
                    <span class="plus">+</span>
                </div>
                <span class="remove">Remove</span>


            `;
            cartListHTML.appendChild(newProduct);

        });
/* total price not working  */
        // let totalPrice = item.quantity * listProduct.find((value) => value.id == item.product_id).price;
        // let newtotalPrice = document.createElement('div');
        // newtotalPrice.classList.add('TotalPrice');
        // newtotalPrice.innerHTML = `
        //     <div class="total">Total</div>
        //     <div class="price">${totalPrice} EGP</div>
        // `;
        // cartListHTML.appendChild(newtotalPrice);
    }
    iconCartspan.textContent = totalQuantity;
};

/* cart button for quantity */

/* saving data for loign again */

/* remove from cart icon */

/* edit scroll bar width in css when cart is full */
