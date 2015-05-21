function printInventory(inputs){
    var arrayObject = [];
    for(var i = 0; i < inputs.length; i++) {
        var inputsBarcode = inputs[i].indexOf("-") != -1 ? inputs[i].split("-")[0] : inputs[i];
        var inputsNumber = inputs[i].indexOf("-") != -1 ? parseInt((inputs[i].split("-"))[1]) : 1;
        var exist = false;

        for(var j = 0; j < arrayObject.length; j++) {
            if(inputsBarcode == arrayObject[j].barcode) {
                arrayObject[j].count = arrayObject[j].count || 0;
                arrayObject[j].count += inputsNumber;
                exist = true;
                break;
            }
        }
        if(!exist) {
            arrayObject.push({barcode: inputsBarcode, count: inputsNumber, privilegeCount :0});
        }
    }

    var loadAllItem = loadAllItems();
    for(var i = 0; i < loadAllItem.length; i++) {
        for(var j = 0; j < arrayObject.length; j++) {
            if(arrayObject[j].barcode === loadAllItem[i].barcode) {
                arrayObject[j].name = loadAllItem[i].name;
                arrayObject[j].unit = loadAllItem[i].unit;
                arrayObject[j].price = loadAllItem[i].price;
            }
        }
    }

    var rule = loadPromotions()[0].barcodes;
    for(var i = 0; i < rule.length; i++) {
        for(var j = 0; j < arrayObject.length; j++) {
            if(rule[i] == arrayObject[j].barcode){
                arrayObject[j].privilegeCount = Math.floor((arrayObject[j].count)/3);
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
            if(arrayObject[i].barcode == rule[j]) {
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
