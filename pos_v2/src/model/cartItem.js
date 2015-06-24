function CartItem(barcode, count) {
    this.barcode = barcode;
    this.count = count;
}

CartItem.prototype.getItem = function(){
    var items = loadAllItems();

    for(var i = 0; i < items.length; i++) {
        if(items[i].barcode === this.barcode){
            return items[i];
        }
    }
}

CartItem.prototype.getPromotion = function(){
    var promotion = loadPromotions()[0];

    if(promotion.type === 'BUY_TWO_GET_ONE_FREE') {
        for(var i = 0; i < promotion.barcodes.length; i++) {
            if(promotion.barcodes[i] === this.barcode){
                return parseInt(this.count / 3);
            }
        }
        
        return 0;
    }
}

CartItem.prototype.getSubtotal = function(){
    return (this.count - this.getPromotion()) * this.getItem().price;
}

CartItem.prototype.getItemSave = function(){
    return this.getPromotion() * this.getItem().price;
}
