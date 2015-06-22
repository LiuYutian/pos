function CartItem() {
    this.tag = new Tag();
}

CartItem.prototype.createItemCountArray = function(tags) {
    var itemCountArray = [];

    for(var i = 0; i < tags.length; i++) {
        var tagBacordCount = this.tag.getItemCount(tags[i]);
        var esist = false;
        for(var j = 0; j < itemCountArray.length; j++){
            if(itemCountArray[j].item.barcode === tagBacordCount.item.barcode) {
                esist = true;
                itemCountArray[j].count += tagBacordCount.count;
            }
        }
        if(!esist){
            itemCountArray.push({'item':tagBacordCount.item,'count':tagBacordCount.count});
        }
    }

    return itemCountArray;
}
