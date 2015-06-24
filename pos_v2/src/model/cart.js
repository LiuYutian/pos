function Cart(){
    this.cartItems = [];
}

Cart.prototype.add = function(barcodeCount){
    for(var i = 0; i < this.cartItems.length; i++) {
        if(this.cartItems[i].barcode === barcodeCount.barcode){
            this.cartItems[i].count += barcodeCount.count;
            return;
        }
    }

    this.cartItems.push(new CartItem(barcodeCount.barcode, barcodeCount.count));
}

Cart.prototype.getSum = function(){
    var sum = 0;

    for(var i = 0; i < this.cartItems.length; i++) {
            sum += this.cartItems[i].getSubtotal() || 0;
    }

    return sum;
}

Cart.prototype.getSave = function(){
    var sum = 0;

    for(var i = 0; i < this.cartItems.length; i++) {
            sum += this.cartItems[i].getItemSave();
    }

    return sum;
}
