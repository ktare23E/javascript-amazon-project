import {cart,removeFromCart,displayCartQuantity,updatedQuantityFunction,saveToStorage} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency,productName,imgPath } from '../utils/money.js';

let cartsHTML = "";
let addOne = 1;
let totalQuantity = 0;
let matchingProduct;

cart.forEach((cartItem, index) => {
  const productId = cartItem.productId;
  products.forEach((product) => {
    if(productId == product.id){
      matchingProduct = product;
    }
  });

    cartsHTML += `
    <div class="cart-item-container js-cart-item-container-${productId}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
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
        <div class="delivery-option">
          <input type="radio" 
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
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










