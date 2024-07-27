import {formatCurrency} from "../scipts/utils/money.js";

if(formatCurrency(2000.4) === '20.00'){
    console.log('passed');
}else{
    console.log('failed');
}