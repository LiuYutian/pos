//TODO: Please write code in this file.
function printInventory(inputs) {
    var array = loadAllItems();

    for(var i = 0; i < array.length; i++) {
        array[i].count = 0;
    }

    for(var i = 0; i < inputs.length; i++) {
        for(var j = 0; j < array.length; j++) {
            if(inputs[i] == array[j].barcode) {
                array[j].count += 1;
            }
        }
    }

    var result = "***<没钱赚商店>购物清单***\n";
    var sum = 0;
    for(var i = 0; i < array.length; i++) {
        if(array[i].count > 0) {
            result += "名称：" + array[i].name + "，数量：" + array[i].count
            + array[i].unit + "，单价：" + array[i].price.toFixed(2)+"(元)，小计："
            + (parseInt(array[i].count)*parseInt(array[i].price)).toFixed(2)+"(元)\n";
            sum += parseInt(array[i].count)*parseInt(array[i].price);
        }
    }
    result += '----------------------\n'
    result += "总计：" + sum.toFixed(2) + "(元)";
    result += '\n**********************';
    console.log(result);
}
