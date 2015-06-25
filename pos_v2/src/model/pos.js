var Pos = (function(){
    function Pos(){}

    Pos.scan = function(tag){
        var barcode = tag.split('-')[0];
        var count = tag.indexOf('-') !== -1 ? tag.split('-')[1] : 1;

        return {barcode : barcode, count : parseFloat(count)};
    }

    Pos.print = function(cart) {
        var result = "";

        result += "***<没钱赚商店>购物清单***\n";
        result += "打印时间：" + DateFormat.getDate() + "\n";
        result += "----------------------\n";
        result += printItem(cart);
        result += "----------------------\n";
        result += "挥泪赠送商品：\n";
        result += printPromotion(cart);
        result += "----------------------\n";
        result += "总计：" + cart.getSum().toFixed(2) + "(元)\n";
        result += "节省：" + cart.getSave().toFixed(2) + "(元)\n";
        result += "**********************";

        console.log(result);
    }

    var printItem = function(cart) {
        var result = "";

        cart.cartItems.forEach(function(cartItem){
            result += "名称：" + cartItem.getItem().name + "，数量：" + cartItem.count +
            cartItem.getItem().unit + "，单价：" + cartItem.getItem().price.toFixed(2) + "(元)，小计：" +
            cartItem.getSubtotal().toFixed(2) + "(元)\n";
        });

        // for (var i = 0; i < cart.cartItems.length; i++) {
        //     result += "名称：" + cart.cartItems[i].getItem().name + "，数量：" + cart.cartItems[i].count +
        //     cart.cartItems[i].getItem().unit + "，单价：" + cart.cartItems[i].getItem().price.toFixed(2) + "(元)，小计：" +
        //     cart.cartItems[i].getSubtotal().toFixed(2) + "(元)\n";
        // }

        return result;
    }

    var printPromotion = function(cart) {
        var result = "";

        cart.cartItems.forEach(function(cartItem){
            if (cartItem.getPromotion() !== 0)
                result += "名称：" + cartItem.getItem().name + "，数量：" + cartItem.getPromotion() +
                cartItem.getItem().unit + "\n";
        });

        // for (var i = 0; i < cart.cartItems.length; i++) {
        //     if (cart.cartItems[i].getPromotion() !== 0)
        //         result += "名称：" + cart.cartItems[i].getItem().name + "，数量：" + cart.cartItems[i].getPromotion() +
        //         cart.cartItems[i].getItem().unit + "\n";
        // }

        return result;
    }

    return Pos;
})();
