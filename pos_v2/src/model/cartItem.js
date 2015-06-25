function CartItem(barcode, count) {
    this.barcode = barcode;
    this.count = count;
}

CartItem.prototype.getItem = function(){
    var items = loadAllItems();
    var barcode = this.barcode;
    var resultItem;

    items.forEach(function(item){
        if(item.barcode === this.barcode){
            resultItem = item;
        }
    }.bind(this));

    return resultItem;
    //
    // for(var i = 0; i < items.length; i++) {
    //     if(items[i].barcode === this.barcode){
    //         return items[i];
    //     }
    // }
}

CartItem.prototype.getPromotion = function(){
    var promotion = loadPromotions()[0];

    if(promotion.type === 'BUY_TWO_GET_ONE_FREE') {
        var barcode = this.barcode;
        var count = this.count;
        var result = 0;

        promotion.barcodes.forEach(function(barcodes){
            if(barcodes === barcode){
                result = parseInt(count / 3);
            }
        });

        // for(var i = 0; i < promotion.barcodes.length; i++) {
        //     if(promotion.barcodes[i] === this.barcode){
        //         return parseInt(this.count / 3);
        //     }
        // }

        return result;
    }
}

CartItem.prototype.getSubtotal = function(){
    return (this.count - this.getPromotion()) * this.getItem().price;
}

CartItem.prototype.getItemSave = function(){
    return this.getPromotion() * this.getItem().price;
}
