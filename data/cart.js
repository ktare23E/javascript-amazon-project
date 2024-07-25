//export cart

export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
    cart = [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            selectedQuantity: 2,
            deliveryOptionId: "1",
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            selectedQuantity: 1,
            deliveryOptionId: "2",
        },
    ];
}

// function checkOutQuantity(){
//     let cartItems = document.querySelector('.cart-items');
//     cartItems.innerHTML = cart.length + ' items';
// }

export function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(
    productId,
    productName,
    productPrice,
    selectedQuantity
) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    if (!matchingItem) {
        let customerOrder = {
            productId,
            productName,
            productPrice,
            selectedQuantity,
            deliveryOptionId: "1",
        };
        cart.push(customerOrder);
    } else {
        matchingItem.selectedQuantity += selectedQuantity;
    }

    saveToStorage();
}

let totalQuantity = 0;
let cartItems = document.querySelector(".cart-items");
let summaryItems = document.querySelector(".summary-items");

export function removeFromCart(productId, selectedQuantity) {
    const newCart = [];
    let totalCartQuantity = 0;

    cart.forEach((cartItem) => {
        totalCartQuantity += cartItem.selectedQuantity;
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    totalCartQuantity = totalCartQuantity - Number(selectedQuantity);
    // Update the total quantity in the header after removing the item
    cartItems.innerHTML = `${totalCartQuantity} items`;

    let cartItemsContainer = document.querySelector(
        `.js-cart-item-container-${productId}`
    );
    if (cartItemsContainer) {
        cartItemsContainer.remove();
    }

    saveToStorage();
}

// export function updateRemoveQuantity(productId){
//     cart.forEach((cartItem,index)=>{
//         if(cartItem.productId === productId){

//         }
//     });
//     saveToStorage();
// }

// export function displayCartQuantity(){
//     cart.forEach((cartItem,index)=>{
//         totalQuantity += cartItem.selectedQuantity;
//     });
//     cartItems.innerHTML = totalQuantity + ' items';
//     summaryItems.innerHTML = `Items (${totalQuantity}):`;
// }

export function updatedQuantityFunction(productId, newQuantity) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.selectedQuantity = newQuantity;
        }
    });
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

let cartQuantityElement = document.querySelector(".cart-quantity");
let cartNotificationId;

export function updateCartQuantity(
    addedToCartNotification,
    productQuantityDropdown
) {
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.selectedQuantity;
    });

    cartQuantityElement.innerHTML = cartQuantity;
    addedToCartNotification.style.opacity = 1;

    if (cartNotificationId) {
        clearTimeout(cartNotificationId);
    }

    cartNotificationId = setTimeout(() => {
        addedToCartNotification.style.opacity = 0;
        productQuantityDropdown.value = 1;
    }, 2000);
}
