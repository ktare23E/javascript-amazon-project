import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';


export function renderPaymentSummary() {
    let productPriceCents = 0;
    let deliveryPrice = 0;
    let total = 0;
    let totalCartQuantity = 0;

    cart.forEach(cartItem => {
        totalCartQuantity += cartItem.selectedQuantity;
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.selectedQuantity;
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

                                <button class="place-order-button button-primary">
                                    Place your order
                                </button>
                                `;
                                
                                let orderSummaryContainer = document.querySelector('.js-payment-summary');
                                orderSummaryContainer.innerHTML = paymentSummaryHTML;

}