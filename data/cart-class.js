class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }
    
    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || 
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

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId,selectedQuantity){
        let matchingItem;

        this.cartItems.forEach(cartItem => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });



        if (!matchingItem) {
            let customerOrder = {
                productId,
                selectedQuantity,
                deliveryOptionId: '1'
            };
            this.cartItems.push(customerOrder);
        } else {
            matchingItem.selectedQuantity += selectedQuantity;

        }

        this.saveToStorage();
    }

    removeFromCart(productId){
        let newCart = [];
        let totalCartQuantity = 0;
    
        newCart = this.cartItems.filter(cartItem => cartItem.productId !== productId);
    
        this.cartItems = newCart;
    
        let cartItemsContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        if (cartItemsContainer) {
            cartItemsContainer.remove();
        }
    
        this.saveToStorage();
    }

    
    displayCartQuantity(){
        let totalQuantity = 0;
        this.cartItems.forEach((cartItem)=>{
            totalQuantity += cartItem.selectedQuantity;
        });
        return totalQuantity;
    }

    updatedQuantityFunction(productId,newQuantity){
        this.cartItems.forEach((cartItem)=>{
            if (cartItem.productId === productId) {
                cartItem.selectedQuantity = newQuantity;
            }
        });
        this.saveToStorage();
    }
    
    updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem;
    
        this.cartItems.forEach(cartItem => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);

