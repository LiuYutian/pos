function Tag() {
    this.loadAllItem = loadAllItems();
    this.item = null;
    this.count = null;
}

Tag.prototype.getItemCount = function(tag) {
    this.barcode = tag.indexOf("-") != -1 ? tag.split("-")[0] : tag;
    this.count = tag.indexOf("-") != -1 ? parseInt((tag.split("-"))[1]) : 1;

    for(var i = 0; i < this.loadAllItem.length; i++) {
        if(this.loadAllItem[i].barcode === this.barcode) {
            this.item = this.loadAllItem[i];
        }
    }

    return this;
}
