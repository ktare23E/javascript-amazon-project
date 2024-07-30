import {orders} from '../data/order.js';
import {loadProductsFetch,getProduct} from '../data/products.js';
import {displayCartQuantity} from '../data/cart.js';
import {arrivalDate} from '../data/deliveryOptions.js';

async function loadPage(){
    try{
        await loadProductsFetch();
    }catch(error){
        console.log(error);
    }
    test();
}

Promise.all([
    loadPage()
]);


function test(){
    document.querySelector('.cart-quantity').innerHTML = displayCartQuantity();
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    let matchingOrder = orders.filter(order => order.id === orderId);
    let product = getProduct(productId);
    let productsOrder = matchingOrder[0].products;
    const matchingProductOrder = productsOrder.filter(order => order.productId === productId);
    let quantity = matchingProductOrder[0].quantity;

    console.log(matchingProductOrder);
  
    let html = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>

            <div class="delivery-date">
            Arriving on ${arrivalDate(matchingProductOrder[0].estimatedDeliveryTime)}
            </div>

            <div class="product-info">
                ${product.name}
            </div>

            <div class="product-info">
            Quantity: ${quantity}
            </div>

            <img class="product-image" src="${product.image}">

            <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
            </div>

            <div class="progress-bar-container">
            <div class="progress-bar"></div>
            </div>
        </div>
    `;

    document.querySelector('.main').innerHTML = html;
}



