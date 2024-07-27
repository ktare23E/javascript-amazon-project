
export let cart;
loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) || 
                    [{
                        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                        selectedQuantity: 2,
                        deliveryOptionId: '1'
                        },
                        {
                        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                        selectedQuantity: 1,
                        deliveryOptionId: '2'
                    }];

}


export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, productName, productPrice, selectedQuantity) {
    let matchingItem;

    cart.forEach(cartItem => {
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
            deliveryOptionId: '1'
        };
        cart.push(customerOrder);
    } else {
        matchingItem.selectedQuantity += selectedQuantity;

    }

    saveToStorage();
}

let totalQuantity = 0;
let summaryItems = document.querySelector('.summary-items');

export function removeFromCart(productId) {
    let newCart = [];
    let totalCartQuantity = 0;

    // cart.forEach((cartItem) => {
    //     totalCartQuantity += cartItem.selectedQuantity;
    //     if (cartItem.productId !== productId) {
    //         newCart.push(cartItem);
    //     }
    // });

    newCart = cart.filter(cartItem => cartItem.productId !== productId);

    cart = newCart;

    let cartItemsContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    if (cartItemsContainer) {
        cartItemsContainer.remove();
    }

    saveToStorage();
}



export function displayCartQuantity(){
    let totalQuantity = 0;
    cart.forEach((cartItem)=>{
        totalQuantity += cartItem.selectedQuantity;
    });
    return totalQuantity;
}

export function updatedQuantityFunction(productId,newQuantity){
    cart.forEach((cartItem)=>{
        if (cartItem.productId === productId) {
            cartItem.selectedQuantity = newQuantity;
        }
    });
    saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;

    cart.forEach(cartItem => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}