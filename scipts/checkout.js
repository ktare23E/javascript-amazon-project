import {orderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts} from '../data/products.js';
import {loadCart} from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value1');
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve('value2');
        });
    })
]).then((values) => {
    console.log(values);
    orderSummary();
    renderPaymentSummary();
});

// new Promise((resolve) => {
//     loadProducts(() =>{
//         resolve('value1');
//     });

// }).then((value1)=>{
//     console.log(value1);
//     return new Promise((resolve) => {
//         loadCart(() =>{
//             resolve();
//         });
//     });

// }).then(()=>{
//     orderSummary();
//     renderPaymentSummary();
// });

// loadProducts(() =>{
//     loadCart(() => {
//         orderSummary();
//         renderPaymentSummary();
//     })
// });

// loadProducts(()=>{
//     orderSummary();
//     renderPaymentSummary();
// });


