function printInventory(inputs) {
    var arrayObject = loadAllItems();

    for(var i=0; i<arrayObject.length; i++) {
        arrayObject[i].count = 0;
    }

    for(var i=0; i<inputs.length; i++) {
        for(var j=0; j<arrayObject.length; j++) {
            if(inputs[i] == arrayObject[j].barcode) {
                arrayObject[j].count += 1;
                break;
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
            result += "小计：" + (parseInt(arrayObject[i].count)*parseInt(arrayObject[i].price)).toFixed(2)+"(元)\n";
            sum += parseInt(arrayObject[i].count)*parseInt(arrayObject[i].price);
        }
    }
    result += '----------------------\n'
    result += "总计：" + sum.toFixed(2) + "(元)\n";
    result += '**********************';
    console.log(result);
}
