function printInventory(inputs){
    var arrayObject = loadAllItems();
    var rule = loadPromotions()[0].barcodes;

    for(var i=0; i<arrayObject.length; i++) {
        arrayObject[i].count = 0;
        arrayObject[i].privilegeCount = 0;
    }

    for(var i=0; i<inputs.length; i++) {
        var inputsBarcode = inputs[i].indexOf("-") != -1 ? inputs[i].split("-")[0] : inputs[i];
        var inputsNumber = inputs[i].indexOf("-") != -1 ? parseInt((inputs[i].split("-"))[1]) : 1; 

        for(var j=0; j<arrayObject.length; j++) {
            if(inputsBarcode == arrayObject[j].barcode){
                arrayObject[j].count += inputsNumber;
            }
        }
    }

    var cheap = 0;
    for(var i=0; i<arrayObject.length; i++) {
        for(var j=0; j<rule.length; j++) {
            if(arrayObject[i].barcode == rule[j] && arrayObject[i].count > 0) {
                arrayObject[i].privilegeCount = Math.floor(arrayObject[i].count/3);
            }
        }
    }

    var sum = 0;
    var result = "***<没钱赚商店>购物清单***\n";
    for(var i=0; i<arrayObject.length; i++) {
        if(arrayObject[i].count > 0) {
            result += "名称：" + arrayObject[i].name + "，";
            result += "数量：" + arrayObject[i].count + arrayObject[i].unit + "，";
            result += "单价：" + arrayObject[i].price.toFixed(2)+"(元)，";
            result += "小计：" + ((arrayObject[i].count-arrayObject[i].privilegeCount)*arrayObject[i].price).toFixed(2)+"(元)\n";

            sum += arrayObject[i].count*arrayObject[i].price;
        }
    }
    result += '----------------------\n';
    result += '挥泪赠送商品：\n';

    var cheap = 0;
    for(var i=0; i<arrayObject.length; i++) {
        for(var j = 0; j < rule.length; j++) {
            if(arrayObject[i].barcode == rule[j] && arrayObject[i].privilegeCount > 0) {
                result += "名称："+arrayObject[i].name+"，";
                result += "数量：" + arrayObject[i].privilegeCount + arrayObject[i].unit+"\n";
                cheap += arrayObject[i].price;
            }
        }
    }

    result += '----------------------\n'
    result += "总计：" + (sum-cheap).toFixed(2) + "(元)\n";
    result += "节省：" + cheap.toFixed(2) + "(元)\n";
    result += '**********************';

    console.log(result);
}
