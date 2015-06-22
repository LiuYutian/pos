function Promotion(type, barcodes) {
    this.type = type;
    this.barcodes = barcodes || [];
}

Promotion.prototype.addPromotionInformation = function(itemCountArray) {
    if(this.type === "BUY_TWO_GET_ONE_FREE"){
        for(var i = 0; i < this.barcodes.length; i++) {
            for(var j = 0; j < itemCountArray.length; j++) {
                if(this.barcodes[i] === itemCountArray[j].item.barcode){
                    itemCountArray[j].promotionCount = Math.floor(itemCountArray[j].count / 3);
                }
            }
        }        
    }

    return itemCountArray;
}
