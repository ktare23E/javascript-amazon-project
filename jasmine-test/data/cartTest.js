import {addToCart,cart,loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => { 
        spyOn(localStorage,'getItem').and.callFake(()=>{
            spyOn(localStorage,'setItem');

            return JSON.stringify([{
                productId : "77919bbe-0e56-475b-adde-4f24dfed3a04",
                productName : "Luxury Towel Set - Graphite Gray",
                productPrice : 3599,
                selectedQuantity : 1,
                deliveryOptionId : '1'
            }]);
        });
        loadFromStorage();

        addToCart("77919bbe-0e56-475b-adde-4f24dfed3a04","Luxury Towel Set - Graphite Gray",3599,1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("77919bbe-0e56-475b-adde-4f24dfed3a04");
        expect(cart[0].selectedQuantity).toEqual(2);

    });

    it('adds a new product to the cart', () => { 
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart("77919bbe-0e56-475b-adde-4f24dfed3a04","Luxury Towel Set - Graphite Gray",3599,1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("77919bbe-0e56-475b-adde-4f24dfed3a04");
        expect(cart[0].selectedQuantity).toEqual(1);
    });
});