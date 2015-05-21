function printInventory(inputs){
    var array = loadAllItems();
    var rule = loadPromotions()[0].barcodes;
    var CHAR_LENGTH = 10;

    for(var i=0; i<array.length; i++) {
        array[i].count = 0;
        array[i].privilegeCount = 0;
    }

    for(var i=0; i<inputs.length; i++) {
        var inputsBarcode = inputs[i].length > (CHAR_LENGTH + 1) ? inputs[i].substring(0, CHAR_LENGTH) : inputs[i];
        var inputsNumber = inputs[i].length > (CHAR_LENGTH + 1) ? parseInt(inputs[i].substring((CHAR_LENGTH + 1))) : 1;

        for(var j=0; j<array.length; j++) {
            if(inputsBarcode == array[j].barcode){
                array[j].count += inputsNumber;
            }
        }
    }

    var cheap = 0;
    for(var i=0; i<array.length; i++) {
        for(var j=0; j<rule.length; j++) {
            if(array[i].barcode == rule[j] && array[i].count > 0) {
                array[i].privilegeCount = Math.floor(array[i].count/3)
            }
        }
    }

    var sum = 0;
    var result = "***<没钱赚商店>购物清单***\n";
    for(var i=0; i<array.length; i++) {
        if(array[i].count > 0) {
            result += "名称：" + array[i].name + "，";
            result += "数量：" + array[i].count + array[i].unit + "，";
            result += "单价：" + array[i].price.toFixed(2)+"(元)，";
            result += "小计：" + ((array[i].count-array[i].privilegeCount)*array[i].price).toFixed(2)+"(元)\n";

            sum += array[i].count*array[i].price;
        }
    }
    result += '----------------------\n';
    result += '挥泪赠送商品：\n';

    var cheap = 0;
    for(var i=0; i<array.length; i++) {
        for(var j = 0; j < rule.length; j++) {
            if(array[i].barcode == rule[j] && array[i].privilegeCount > 0) {
                result += "名称："+array[i].name+"，";
                result += "数量：" + array[i].privilegeCount + array[i].unit+"\n";
                cheap += array[i].price;
            }
        }
    }

    result += '----------------------\n'
    result += "总计：" + (sum-cheap).toFixed(2) + "(元)\n";
    result += "节省：" + cheap.toFixed(2) + "(元)\n";
    result += '**********************';

    console.log(result);
}
