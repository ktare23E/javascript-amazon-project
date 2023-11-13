//export cart

export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    selectedQuantity: 2
    },
    {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    selectedQuantity: 1
}];

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
            selectedQuantity
        };
        cart.push(customerOrder);
    } else {
        matchingItem.selectedQuantity += selectedQuantity;

    }
}


