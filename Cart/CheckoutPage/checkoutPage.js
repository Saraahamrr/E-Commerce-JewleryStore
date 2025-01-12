document.getElementById("proceed").addEventListener("click", function () {
    // Get form data
    const name = document.getElementById("billing-name").value;
    const email = document.getElementById("billing-email-address").value;
    const phone = document.getElementById("billing-phone").value;
    const zipCode = document.getElementById("zip-code").value;


    // Define regex patterns
    const nameRegex = /^[a-zA-Z][a-zA-Z0-9._ -]{2,15}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(?:\+20|0020|0)?(10|11|12|15)\d{8}$/;
    const zipCodeRegex = /^[0-9]{5}(-[0-9]{4})?$/;



    // Validate input and apply red border if invalid
    let isValid = true;

    // Clear previous error styling
    document.getElementById("billing-name").style.border = "";
    document.getElementById("billing-name-error").textContent = "";
    document.getElementById("billing-email-address").style.border = "";
    document.getElementById("billing-email-address-error").textContent = "";
    document.getElementById("billing-phone").style.border = "";
    document.getElementById("billing-phone-error").textContent = "";
    document.getElementById("zip-code").style.border = "";
    document.getElementById("zip-code-error").textContent = "";

    document.querySelectorAll(".error").forEach(function (error) {
        error.style.color = "red";
    });

    // username validation
    if (name.length === 0) {
        document.getElementById("billing-name").style.border = "2px solid red";
        document.getElementById("billing-name-error").textContent = "name is required.Please enter a valid name.";
        isValid = false;
    }
    else if (!name.match(nameRegex)) {
        document.getElementById("billing-name").style.border = "2px solid red";
        document.getElementById("billing-name-error").textContent = "name is invalid.Please enter a valid name.";
    }


    // Email validation
    if (email.length === 0) {
        document.getElementById("billing-email-address").style.border = "2px solid red";
        document.getElementById("billing-email-address-error").textContent = "Email address is required.Please enter a valid email address.";
        isValid = false;
    }
    else if (!email.match(emailRegex)) {
        document.getElementById("billing-email-address").style.border = "2px solid red";
        document.getElementById("billing-email-address-error").textContent = "Email address is invalid.Please enter a valid email address.";
        isValid = false;
    }

    // Phone validation
    if (phone.length === 0) {
        document.getElementById("billing-phone").style.border = "2px solid red";
        document.getElementById("billing-phone-error").textContent = "Phone number is required.Please enter a valid Egyptian phone number.";
        isValid = false;
    }

    else if (!phone.match(phoneRegex)) {
        document.getElementById("billing-phone").style.border = "2px solid red";
        document.getElementById("billing-phone-error").textContent = "Phone Number is invalid.Please enter a valid Egyptian phone number.";
        isValid = false;
    }

    // zipCode validation
    if (zipCode.length === 0) {
        isValid = true;
    }
    if (!zipCode.match(zipCodeRegex)) {
        document.getElementById("zip-code").style.border = "2px solid red";
        document.getElementById("zip-code-error").textContent = ""
        isValid = false;
    }



    // If any field is invalid, stop the registration
    if (!isValid) {
        return;
    }
    else {
        // If all fields are valid, proceed to the next page
        return;
    }
});

// Random order number
function orderRandomNumber() {
    const orderNumber = document.getElementById("order-number");
    orderNumber.textContent = ""
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = Array.from({ length: 2 }, () => letters[Math.floor(Math.random() * letters.length)]);
    const randomNumbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
    orderNumber.textContent = "#" + randomLetters.join("") + randomNumbers.join("");


    return orderNumber.textContent;

};
orderRandomNumber();

//getting the number of items in the cart to the icon
let body = document.querySelector('body');
let iconCartspan = document.querySelector('.icon span');
const spanNumber = localStorage.getItem('iconCartspan');

iconCartspan.textContent = spanNumber;

// getting cart items to the checkout page
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Adding the items to the order summary table
const orderSummary = document.getElementById('order-summary')
for (let i = 0; i < cartItems.length; i++) {
    let newProduct = document.createElement('tr');
    newProduct.classList.add('Item');
    let infoItem = cartItems[i];
    // Getting total price of each item
    var itemTotalPrice = 0;
    itemTotalPrice += infoItem.price * infoItem.quantity;
    newProduct.innerHTML = `
                    <th scope="row">
                        <img
                          src="${infoItem.image}"
                          alt="product-img"
                          title="product-img"
                          class="avatar-lg rounded"
                        />
                    </th>
                    <td>
                        <h5 class="font-size-16 text-truncate">
                          <span href="#" class="text-dark"
                            >${infoItem.title}</span>
                        </h5>
                        <p class="text-muted mb-0">
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star-half text-warning"></i>
                        </p>
                        <p class="text-muted mb-0 mt-1">${infoItem.price} EGP x ${infoItem.quantity}</p>
                    </td>
                    <td>${itemTotalPrice} EGP </td>
                    `;
    orderSummary.insertBefore((newProduct),orderSummary.firstChild)
}

//calculating the sub total
let sub_totalValue = 0;
for (let i = 0; i < cartItems.length; i++) {
    sub_totalValue += cartItems[i].price * cartItems[i].quantity;
}
//calculating the discount
let discountValue = 0.1 * sub_totalValue;
let roundDiscountValue = Math.round(discountValue)
//calculating the shipping charge
let shippingValue = 60;
if (sub_totalValue == 0) {
    shippingValue = 0;
}
//calculating the total
let totalValue = sub_totalValue - discountValue + shippingValue;


// Adding the billing values to the checkout page
let sub_total = document.createElement('tr');
sub_total.innerHTML = `
                      <td colspan="2">
                        <h5 class="font-size-14 m-0">Sub Total :</h5>
                      </td>
                      <td>${sub_totalValue} EGP </td>
                      `;
let Discount = document.createElement('tr');
Discount.innerHTML = `
                    <tr>
                      <td colspan="2">
                        <h5 class="font-size-14 m-0">Discount :</h5>
                      </td>
                      <td> -${roundDiscountValue} EGP </td>
                    </tr>
                    `;
                    
let shipping = document.createElement('tr');
shipping.innerHTML = `
                      <td colspan="2">
                        <h5 class="font-size-14 m-0">Shipping Charge :</h5>
                      </td>
                      <td> ${shippingValue} EGP</td>
                      `;


let total = document.createElement('tr');
total.classList.add('bg-light');
total.innerHTML = `
                      <td colspan="2">
                        <h5 class="font-size-14 m-0">Total:</h5>
                      </td>
                      <td>${totalValue} EGP </td>
    `;

orderSummary.appendChild(sub_total);
orderSummary.appendChild(Discount); 
orderSummary.appendChild(shipping);
orderSummary.appendChild(total);

// Send email using EmailJS
emailjs.init("TRJvhYFLLPJQVimCM");

function sendOrderConfirmation() {
    const name = document.getElementById("billing-name").value;
    const email = document.getElementById("billing-email-address").value;

    if (!name || !email) {
        alert("Please fill in both your name and email!");
        return;
    }

    const params = {
        name: name,
        email: email
    };

    emailjs.send("service_q4n1nwu", "template_g1h3rrw", params)
        .then(function(response) {
            alert("Order confirmation sent to your email!");
            window.location.href = 'ThankYouPage.html'; 
        })
        .catch(function(error) {
            alert("Failed to send confirmation. Please try again.");
            console.error("Error:", error);
        });
}