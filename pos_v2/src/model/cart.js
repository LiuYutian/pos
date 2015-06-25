function Cart(){
    this.cartItems = [];
}

Cart.prototype.add = function(barcodeCount){
    var exist = false;

    this.cartItems.forEach(function(cartItem){
        if(cartItem.barcode === barcodeCount.barcode) {
            cartItem.count += barcodeCount.count;
            exist = true;
        }
    });
    //
    // for(var i = 0; i < this.cartItems.length; i++) {
    //     if(this.cartItems[i].barcode === barcodeCount.barcode){
    //         this.cartItems[i].count += barcodeCount.count;
    //         return;
    //     }
    // }
    if(!exist){
        this.cartItems.push(new CartItem(barcodeCount.barcode, barcodeCount.count));
    }
}

Cart.prototype.getSum = function(){
    var sum = 0;

    this.cartItems.forEach(function(cartItem){
        sum += cartItem.getSubtotal();
    });

    // for(var i = 0; i < this.cartItems.length; i++) {
    //         sum += this.cartItems[i].getSubtotal();
    // }

    return sum;
}

Cart.prototype.getSave = function(){
    var sum = 0;

    this.cartItems.forEach(function(cartItem){
        sum += cartItem.getItemSave();
    });

    // for(var i = 0; i < this.cartItems.length; i++) {
    //         sum += this.cartItems[i].getItemSave();
    // }

    return sum;
}
