function Pos(){
    this.promotionItemCountArray;
    this.save = 0;
    this.sum = 0;
}

Pos.prototype.disposeData = function(tags) {
    var cartItem = new CartItem();
    this.promotionItemCountArray = cartItem.createItemCountArray(tags);
    var loadPromotion = loadPromotions()[0];
    var promotionItemCountArray = loadPromotion.addPromotionInformation(this.promotionItemCountArray);

    this.promotionItemCountArray = calculateSubtotal(promotionItemCountArray);
    this.save = getSave(promotionItemCountArray);
    this.sum = getSum(promotionItemCountArray);

    return promotionItemCountArray;
}

var calculateSubtotal = function(promotionItemCountArray) {
    for(var i = 0; i < promotionItemCountArray.length; i++) {
        promotionItemCountArray[i].subtotal = promotionItemCountArray[i].item.price *
            (promotionItemCountArray[i].count - (promotionItemCountArray[i].promotionCount || 0));
    }

    return promotionItemCountArray;
}

var getSave = function(promotionItemCountArray){
    var save = 0;
    for(var i = 0; i < promotionItemCountArray.length; i++) {
        save += promotionItemCountArray[i].item.price * (promotionItemCountArray[i].promotionCount || 0);
    }

    return save;
}

var getSum = function(promotionItemCountArray){
    var sum = 0;
    for(var i = 0; i < promotionItemCountArray.length; i++) {
        sum += promotionItemCountArray[i].subtotal;
    }

    return sum;
}

Pos.prototype.print = function() {
    var result = "";

    result += "***<没钱赚商店>购物清单***\n";
    result += "打印时间："+DateFormat.getDate()+"\n";
    result += "----------------------\n";
    result += printItem(this.promotionItemCountArray);
    result += "----------------------\n";
    result += "挥泪赠送商品：\n";
    result += printPromotion(this.promotionItemCountArray);
    result += "----------------------\n";
    result += "总计：" + this.sum.toFixed(2)+"(元)\n";
    result += "节省：" + this.save.toFixed(2)+"(元)\n";
    result += "**********************";
    
    console.log(result);
}

var printItem = function(promotionItemCountArray){
    var result = "";

    for(var i = 0; i < promotionItemCountArray.length; i++) {
        result += "名称："+promotionItemCountArray[i].item.name+"，数量："+promotionItemCountArray[i].count +
        promotionItemCountArray[i].item.unit+"，单价："+promotionItemCountArray[i].item.price.toFixed(2)+"(元)，小计："+promotionItemCountArray[i].subtotal.toFixed(2)+"(元)\n";
    }

    return result;
}

var printPromotion = function(promotionItemCountArray){
    var result = "";

    for(var i = 0; i < promotionItemCountArray.length; i++){
        if(promotionItemCountArray[i].promotionCount > 0)
        result += "名称："+promotionItemCountArray[i].item.name+"，数量："+promotionItemCountArray[i].promotionCount +
        promotionItemCountArray[i].item.unit+"\n";
    }

    return result;
}
