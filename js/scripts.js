const products = [
    { class: "product_1", price: 35 },
    { class: "product_2", price: 20 },
    { class: "product_3", price: 25 },
    { class: "product_4", price: 2 },
    { class: "product_5", price: 4 },
    { class: "product_6", price: 4 },
    { class: "product_7", price: 5 },
    { class: "product_8", price: 3 },
    { class: "product_9", price: 30 },
    { class: "product_10", price: 35 },
    { class: "product_11", price: 10 },
    { class: "product_12", price: 5 },
    { class: "product_13", price: 7 },
    { class: "product_14", price: 8 },
    { class: "product_15", price: 45 },
    
];

let id_pairs = 0;

function cart_amount() {
    const shoppingcart = document.getElementById("cart_section");
    const items_in_cart = shoppingcart.querySelectorAll(".card")
    document.getElementById("number_of_items").textContent = items_in_cart.length
}

function sync_cart() {
    calculate_total();
    cart_amount();
}

function remove_from_cart(remove_button){
    const item_in_cart = remove_button.closest(".cloned");
    item_in_cart.remove();
    sync_cart()
}

function add_to_cart(clickedButton) {
    console.log(clickedButton);
    const item = clickedButton.closest(".card");
    const clone = item.cloneNode(true);
    clone.classList.add("cloned");
    clone.style.width = "98%";
    const button = clone.querySelector("button");
    button.textContent = "Remove";
    button.classList.add("remove_button");

    button.onclick = function(){
        remove_from_cart(this);
    };

    document.getElementById("cart_items").appendChild(clone);
    sync_cart();
}

function confirmation () {
    const cart = document.getElementById("cart_items");
    const confirmation = cart.cloneNode(true);
    confirmation.removeAttribute("id");
    confirmation.classList.add("confirmation");

    confirmation.querySelectorAll(".remove_button").forEach(btn => btn.remove());
    document.getElementById("confirmation_details").innerHTML = "";
    document.getElementById("confirmation_details").appendChild(confirmation);

    document.getElementById("confirmation_sub_total").textContent = document.getElementById("sub_total").textContent;
    document.getElementById("confirmation_cart_total").textContent = document.getElementById("cart_total").textContent;
    document.getElementById("confirmation_discount_price").textContent =  document.getElementById("discount_price").textContent;

}

const price = Object.fromEntries(products.map(p => [p.class, p.price]));
console.log(price);

function discount (total) {
    const shoppingcart = document.getElementById("cart_section");
    const items_in_cart = shoppingcart.querySelectorAll(".card")
    if (items_in_cart.length > 3) {
        console.log("discount");
        return total * 0.9;
    }
    return total;
}
 
function price_of_item(item) {
    for (const key in price) {
        if (item.classList.contains(key)){
            return price[key];
        }
    }
    return 0;
}
 
function calculate_total(){
    const shoppingcart = document.getElementById("cart_section");
    const items_in_cart = shoppingcart.querySelectorAll(".card")
    console.log(items_in_cart);
 
    let total = 0;
    let sub_total = 0;
    let discount_price = 0;

    for (let item of items_in_cart) {
            sub_total = sub_total + price_of_item(item);
            total = total + price_of_item(item);
        }

    total = discount(total);
    console.log(total);
    console.log(sub_total);
    discount_price = sub_total-total;
    console.log(discount_price);

    document.getElementById("sub_total").textContent = sub_total.toFixed(2);
    document.getElementById("cart_total").textContent = total.toFixed(2);
    document.getElementById("discount_price").textContent = discount_price.toFixed(2);
 
}

function display_shopping_cart() {
    const shoppingcart = document.getElementById("cart_section");
    shoppingcart.classList.remove("d-none");
    const product_section = document.getElementById("product_section");
    product_section.classList.add("d-none");
    const checkout_section = document.getElementById("checkout_section");
    checkout_section.classList.add("d-none");
   
}

function display_products() {
    const shoppingcart = document.getElementById("cart_section");
    shoppingcart.classList.add("d-none");
    const product_section = document.getElementById("product_section");
    product_section.classList.remove("d-none");
}

function display_checkout() {
    const shoppingcart = document.getElementById("cart_section");
    shoppingcart.classList.add("d-none");
    const checkout_section = document.getElementById("checkout_section");
    checkout_section.classList.remove("d-none");
}

function display_confirmation() {
    const checkout_section = document.getElementById("checkout_section");
    checkout_section.classList.add("d-none");
    const confirmation_section = document.getElementById("confirmation_section");
    confirmation_section.classList.remove("d-none");
}

function back_to_the_start() {
    const confirmation_section = document.getElementById("confirmation_section");
    confirmation_section.classList.add("d-none");
    const product_section = document.getElementById("product_section");
    product_section.classList.remove("d-none");
    full_reset();
}

const checkout_form = document.getElementById("checkout_form");

function reset() {
    const input = checkout_form.querySelectorAll(".form-control");
    input.forEach (input => {
        input.classList.remove("is-invalid");
    })
}

function full_reset() {
    document.getElementById("cart_items").innerHTML = "";
    document.getElementById("confirmation_details").innerHTML = "";
    document.getElementById("sub_total").textContent = "0";
    document.getElementById("discount_price").textContent = "0";
    document.getElementById("cart_total").textContent = "0";
    document.getElementById("number_of_items").textContent = "0";
}

function validate () {
    reset();
    let is_valid = true;
    const name = document.getElementById("name");
    const input_name = name.value.trim();
    const email = document.getElementById("email");
    const input_email = email.value.trim();
    const phone = document.getElementById("phone");
    const input_phone = phone.value.trim();
    const zip = document.getElementById("zip");
    const input_zip = zip.value.trim();
    const adress = document.getElementById("adress");
    const input_adress = adress.value.trim();

    if (input_name ==="") {
        name.classList.add("is-invalid");
        is_valid = false;
    }

     if (input_email ==="") {
        email.classList.add("is-invalid");
        is_valid = false;
    }

     if (input_zip ==="") {
        adress.classList.add("is-invalid");
        is_valid = false;
    }

     if (input_adress ==="") {
        adress.classList.add("is-invalid");
        is_valid = false;
    }

    if (input_phone ==="") {
        phone.classList.add("is-invalid");
        is_valid = false;
    }

    if (input_zip ==="") {
        zip.classList.add("is-invalid");
        is_valid = false;
    }

    if (!input_email.includes("@")) {
        email.classList.add("is-invalid");
        is_valid = false;
    }

    if (isNaN(input_phone)) {
        phone.classList.add("is-invalid");
        is_valid = false;
    }

    if (isNaN(input_zip)) {
        zip.classList.add("is-invalid");
        is_valid = false;
    }

    if (input_zip.length > 6) {
        zip.classList.add("is-invalid");
        is_valid = false;
    }

    if (is_valid) {
        display_confirmation();
        confirmation ();
    }
}

checkout_form.addEventListener("submit", function (event) {
    event.preventDefault();
    validate();
});



