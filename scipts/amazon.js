import {cart,addToCart,displayCartQuantity} from "../data/cart.js";
import {products,loadProducts} from '../data/products.js';
import { formatCurrency,productName,imgPath } from './utils/money.js';
import '../data/product-class.js';
import '../data/car.js';

loadProducts(renderProductsGrid);

function renderProductsGrid(){
  document.querySelector('.cart-quantity').innerHTML = displayCartQuantity();

  let productsHTML = "";

  products.forEach((product,index) => {

    productsHTML += `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${imgPath(product.image)}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${productName(product.name)}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="${product.getStarUrl()}">
      <div class="product-rating-count link-primary">
      ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
    ${product.getPrice()}
    </div>

    <div class="product-quantity-container">
      <select id="product-quantity-${product.id}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>
    
    ${product.htmlLink()}

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name="${product.name}" data-product-id="${product.id}" data-product-price="${product.priceCents}" data-product-index="${index}">
      Add to Cart
    </button>
  </div>`;
  });

  let container = document.querySelector(".products-grid");
  container.innerHTML = productsHTML;


  let addToCartButtons = document.querySelectorAll(".js-add-to-cart");
  let cartQuantityElement = document.querySelector(".cart-quantity");
  let cartNotificationId;


  //stays in here page kay ga update raman ni sa cart quantity in the html rather than the cart items 
  function updateCartQuantity(addedToCartNotification,productQuantityDropdown) { 
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.selectedQuantity;
    });

    cartQuantityElement.innerHTML = cartQuantity;
    addedToCartNotification.style.opacity = 1;

    if (cartNotificationId) {
        clearTimeout(cartNotificationId);
    }

    cartNotificationId = setTimeout(() => {
        addedToCartNotification.style.opacity = 0;
        productQuantityDropdown.value = 1;
    }, 2000);
  }




  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let productId = button.getAttribute("data-product-id");
      let productName = button.getAttribute("data-product-name");
      let productPrice = button.getAttribute("data-product-price");
      let addedToCartNotification = document.querySelector(`.js-added-to-cart-${productId}`);
      // let productIndex = button.getAttribute("data-product-index");
      let productQuantityDropdown = document.querySelector(`#product-quantity-${productId}`); // Get the dropdown element
      let selectedQuantity = productQuantityDropdown.value;
      // selectedQuantity = parseInt(selectedQuantity);
      selectedQuantity = Number(selectedQuantity);
      
    
      addToCart(productId,productName,productPrice,selectedQuantity);
      updateCartQuantity(addedToCartNotification,productQuantityDropdown);

    });
  });

}


