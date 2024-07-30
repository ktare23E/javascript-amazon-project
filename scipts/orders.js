import { orders } from '../data/order.js';
import {getProduct,loadProductsFetch} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {humanReadableDate,arrivalDate} from '../data/deliveryOptions.js';
import {displayCartQuantity} from '../data/cart.js';

async function loadPage(){
    try{
        await loadProductsFetch();
    }catch(error){
        console.log(error);
    }

    loadOrders();
}

Promise.all([
    loadPage(),
])

console.log(orders);



function loadOrders() {
    let html = '';

    document.querySelector('.cart-quantity').innerHTML = displayCartQuantity();

    orders.forEach((order) => {
        let orderProducts = order.products;

        html += `
            <div class="order-container js-order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${humanReadableDate(order.orderTime)}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(order.totalCostCents)}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                    </div>
                </div>
                <div class="order-details-grid">
                    ${orderDetails(orderProducts,order)}
                </div>
            </div>
        `;
    });

    document.querySelector('.js-order-grid').innerHTML = html;
}

function orderDetails(orderProducts,order){
    let orderDetailsHTML = '';

    orderProducts.forEach((productDetails) => {
        const productId = productDetails.productId;
        const matchingItem = getProduct(productId);

        orderDetailsHTML += `
                    <div class="product-image-container">
                    <img src="${matchingItem.image}">
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                        ${matchingItem.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${arrivalDate(productDetails.estimatedDeliveryTime)}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${productDetails.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                    </div>

                    <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${matchingItem.id}">
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                    </div>
          
        `;
    })
    return orderDetailsHTML;
}