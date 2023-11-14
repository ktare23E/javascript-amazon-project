import {cart,removeFromCart,displayCartQuantity,updatedQuantityFunction,saveToStorage,updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency,productName,imgPath } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';


let cartsHTML = "";
let matchingProduct;

cart.forEach((cartItem, index) => {
  const productId = cartItem.productId;
  products.forEach((product) => {
    if(productId == product.id){
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) =>{
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });

  
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
  const daysFormatted = deliveryDate.format('dddd, MMMM D');


    cartsHTML += `
    <div class="cart-item-container js-cart-item-container-${productId}">
    <div class="delivery-date">
      Delivery date: ${daysFormatted}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${imgPath(matchingProduct.image)}">

      <div class="cart-item-details">
        <div class="product-name">
          ${productName(matchingProduct.name)}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.selectedQuantity}</span>
          </span>
          <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input type='text' class='quantity-input' autocomplete='disabled' data-product-id="${matchingProduct.id}">
          <span class='save-quantity-link link-primary' data-product-id="${matchingProduct.id}">Save</span>
          <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}" data-selected-quantity="${cartItem.selectedQuantity}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct,cartItem)}
      </div>
    </div>
  </div>
    `;
});




let container = document.querySelector(".order-summary");
container.innerHTML += cartsHTML;

let deleteLink = document.querySelectorAll('.delete-quantity-link');
displayCartQuantity();

deleteLink.forEach((link,index)=>{
  link.addEventListener('click',()=>{
    let dataProductId = link.getAttribute('data-product-id');
    let selectedQuantity = link.getAttribute('data-selected-quantity');
    removeFromCart(dataProductId,selectedQuantity);
  });
});


// ... (Your existing code)
let quantityLabel = document.querySelectorAll('.quantity-label');
let updateLink = document.querySelectorAll('.update-quantity-link');
let quantityInput = document.querySelectorAll('.quantity-input');
let saveQuantityLink = document.querySelectorAll('.save-quantity-link');

updateLink.forEach((link, index) => {
  link.addEventListener('click', () => {
    // console.log(link);
    let dataProductId = link.getAttribute('data-product-id');
    link.classList.add('is-clicked');
    saveQuantityLink[index].style.display = 'initial';
    quantityInput[index].style.display = 'initial';
    quantityLabel[index].style.display = 'none';
  });
});


saveQuantityLink.forEach((saveLink, index) => {
  saveLink.addEventListener('click', () => {
    let savedProductId = saveLink.getAttribute('data-product-id');
    let updatedQuantity = quantityInput[index].value;
    let toNumberValue = Number(updatedQuantity);

    // Check if toNumberValue is a valid number
    if (!isNaN(toNumberValue) && toNumberValue >= 0 && toNumberValue < 1000) {
      updatedQuantityFunction(savedProductId, toNumberValue);
      quantityInput[index].value = '';

      updateLink[index].classList.remove('is-clicked');
      saveQuantityLink[index].style.display = 'none';
      quantityInput[index].style.display = 'none';
      quantityLabel[index].style.display = 'initial';
      window.location.reload();
    } else {
      // Handle invalid input (e.g., display an error message)
      alert('Invalid quantity input');
    }
  });
});

quantityInput.forEach((inputNumber, index) => {
  inputNumber.addEventListener('input', (event) => {
    let savedProductId = inputNumber.getAttribute('data-product-id');
    let myQuantity = event.target.value;

    console.log(myQuantity);
  });

  inputNumber.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default "Enter" behavior (e.g., form submission)
      let savedProductId = inputNumber.getAttribute('data-product-id');
      let updatedQuantity = inputNumber.value;
      let toNumberValue = Number(updatedQuantity);

      // Check if toNumberValue is a valid number
      if (!isNaN(toNumberValue) && toNumberValue >= 0 && toNumberValue < 1000) {
        updatedQuantityFunction(savedProductId, toNumberValue);
        inputNumber.value = '';

        // Additional logic if needed...

        window.location.reload(); // Reload the page or perform other actions
      } else {
        // Handle invalid input (e.g., display an error message)
        alert('Invalid quantity input');
      }
    }
  });
});




function deliveryOptionsHTML(matchingProduct,cartItem){
  let optionsHTML = '';
    deliveryOptions.forEach(deliveryOption => {
  
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const daysFormatted = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents === 0 ? 'Free': `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId ?  'checked' : '';
      optionsHTML += `
    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" 
        class="delivery-option-input" ${isChecked}
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date add-sevenDays">
            ${daysFormatted}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
      `;
    });
    return optionsHTML;
}

let jsDeliveryOption = document.querySelectorAll('.js-delivery-option');

jsDeliveryOption.forEach((element)=>{
  element.addEventListener('click',()=>{
    let productId = element.getAttribute('data-product-id');
    let deliveryOptionId = element.getAttribute('data-delivery-option-id');
    updateDeliveryOption(productId,deliveryOptionId);
    location.reload();
  });
});



