export let formatCurrency =  function (priceCents){
    return (Math.round(priceCents) / 100).toFixed(2);
}

export let productName = function(productName){
    return productName;
}

export let imgPath  = function(imgPath){ 
    return imgPath;
}