var Pos = (function(){
    function Pos(){
        this.cartItems = [];
    }

    Pos.prototype.scan = function(tags) {
        for(var i = 0; i < tags.length; i++) {
            var barcodeCount = getBarcodeCount(tags[i]);
            var exist = false;

            for(var k = 0; k < this.cartItems.length; k++) {
                if(barcodeCount.barcode === this.cartItems[k].barcode) {
                    this.cartItems[k].count += barcodeCount.count;
                    exist = true;
                }
            }
            if(!exist) {
                this.cartItems.push(new CartItem(barcodeCount.barcode, barcodeCount.count));
            }
        }
    }

    Pos.prototype.print = function() {
        var result = "";

        result += "***<没钱赚商店>购物清单***\n";
        result += "打印时间：" + DateFormat.getDate() + "\n";
        result += "----------------------\n";
        result += printItem(this.cartItems);
        result += "----------------------\n";
        result += "挥泪赠送商品：\n";
        result += printPromotion(this.cartItems);
        result += "----------------------\n";
        result += "总计：" + getSum(this.cartItems).toFixed(2) + "(元)\n";
        result += "节省：" + getSave(this.cartItems).toFixed(2) + "(元)\n";
        result += "**********************";

        console.log(result);
    }

    var printItem = function(cartItems) {
        var result = "";

        for (var i = 0; i < cartItems.length; i++) {
            result += "名称：" + cartItems[i].getItem().name + "，数量：" + cartItems[i].count +
            cartItems[i].getItem().unit + "，单价：" + cartItems[i].getItem().price.toFixed(2) + "(元)，小计：" +
            cartItems[i].getSubtotal().toFixed(2) + "(元)\n";
        }

        return result;
    }

    var printPromotion = function(cartItems) {
        var result = "";

        for (var i = 0; i < cartItems.length; i++) {
            if (cartItems[i].getPromotion() > 0)
                result += "名称：" + cartItems[i].getItem().name + "，数量：" + cartItems[i].getPromotion() +
                cartItems[i].getItem().unit + "\n";
        }

        return result;
    }

    var getBarcodeCount = function(tag){
        var barcode = tag.split('-')[0];
        var count = tag.indexOf('-') !== -1 ? tag.split('-')[1] : 1;

        return {barcode : barcode, count : parseFloat(count)};
    }

    var getSum = function(cartItems){
        var sum = 0;

        for(var i = 0; i < cartItems.length; i++) {
                sum += cartItems[i].getSubtotal() || 0;
        }

        return sum;
    }

    var getSave = function(cartItems){
        var sum = 0;

        for(var i = 0; i < cartItems.length; i++) {
                sum += cartItems[i].getItemSave();
        }

        return sum;
    }

    return Pos;
})();
