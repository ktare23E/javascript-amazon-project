import { cart,saveToStorage,loadFromStorage } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import {addOrder} from '../../data/order.js'

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let deliveryPrice = 0;
    let total = 0;
    let totalCartQuantity = 0;

    cart.forEach(cartItem => {
        totalCartQuantity += cartItem.quantity;
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        deliveryPrice += deliveryOption.priceCents;
    });



    total = productPriceCents + deliveryPrice;
    const taxCents = total * 0.1;
    const totalCents = total + taxCents;

    const paymentSummaryHTML = `<div class="payment-summary-title">
                                    Order Summary
                                </div>

                                <div class="payment-summary-row">
                                    <div class="summary-items">Items (${totalCartQuantity}):</div>
                                    <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
                                </div>

                                <div class="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div class="payment-summary-money">$${formatCurrency(deliveryPrice)}</div>
                                </div>

                                <div class="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div class="payment-summary-money">$${formatCurrency(total)}</div>
                                </div>

                                <div class="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
                                </div>

                                <div class="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
                                </div>

                                <button class="place-order-button button-primary js-place-order">
                                    Place your order
                                </button>
                                `;
                                
                                let orderSummaryContainer = document.querySelector('.js-payment-summary');
                                orderSummaryContainer.innerHTML = paymentSummaryHTML;

                                document.querySelector('.js-place-order').addEventListener('click',async () => {
                                    try{
                                        const response = await fetch('https://supersimplebackend.dev/orders',{
                                            method : 'POST',
                                            headers : {
                                                'Content-Type' : 'application/json'
                                            },
                                            body : JSON.stringify({
                                                cart : cart
                                            }) 
                                        });
                                                                                
                                        const order = await response.json();
                                        addOrder(order);
                                    }catch(error){
                                        console.error('Error placing order',error);
                                    }
                                    cart.splice(0,cart.length);
                                    saveToStorage();
                                    window.location.href = 'orders.html';
                                });

}