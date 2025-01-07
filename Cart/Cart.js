/* let things to be updated and needs action */
let body = document.querySelector('body');
let iconCart = document.querySelector('.icon');
iconCart.addEventListener('click', function() {
    body.classList.toggle('ShowCart');
});


/* let things to be updated and needs action */
let closeCart = document.querySelector('.closeCart');
closeCart.addEventListener('click',function(){
    body.classList.toggle('ShowCart');
})

/* let things to be updated and needs action */
let listProducts = document.querySelector('.listProducts');
listProducts.addEventListener('click', function(e) {
    let positionClick = e.target;
    if (positionClick.classList.contains('addCart')) {
        alert('add to cart');
    }
})

/* let things to be updated and needs action */
let cartListHTML = document.querySelector('.cartList');
let iconCartspan = document.querySelector('.icon span');
let cart = []
/* product_id , quantity */
const addTOCart =(product_id)=>{
    if (cart.lenght <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }]
}}
