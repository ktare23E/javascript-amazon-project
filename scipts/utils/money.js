export let formatCurrency =  function (priceCents){
    return (Math.round(priceCents) / 100).toFixed(2);
}

export let productName = function(productName){
    return productName;
}

export let imgPath  = function(imgPath){ 
    return imgPath;
}

function test(){
    console.log("test");
}

function test2(){
    console.log("test2");
}

export default test;
