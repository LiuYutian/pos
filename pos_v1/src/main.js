function SelectExistCount(buyItem, inputsBarcode, inputsNumber) {
    for(var j = 0; j < buyItem.length; j++) {
        if(inputsBarcode == buyItem[j].barcode) {
            buyItem[j].count += inputsNumber;
            return true;
            break;
        }
    }
}

function InitItemList(inputs, buyItem) {
    for(var i = 0; i < inputs.length; i++) {
        var inputsBarcode = inputs[i].indexOf("-") != -1 ? inputs[i].split("-")[0] : inputs[i];
        var inputsNumber = inputs[i].indexOf("-") != -1 ? parseInt((inputs[i].split("-"))[1]) : 1;
        var exist = SelectExistCount(buyItem, inputsBarcode, inputsNumber);

        if(!exist) {
            buyItem.push({barcode: inputsBarcode, count: inputsNumber, privilegeCount :0});
        }
    }
}

function InitItemListInfo(buyItem) {
    var loadAllItem = loadAllItems();
    for(var i = 0; i < loadAllItem.length; i++) {
        for(var j = 0; j < buyItem.length; j++) {
            if(buyItem[j].barcode === loadAllItem[i].barcode) {
                buyItem[j].name = loadAllItem[i].name;
                buyItem[j].unit = loadAllItem[i].unit;
                buyItem[j].price = loadAllItem[i].price;
            }
        }
    }
}

function InitPromotionsItem(buyItem) {
    var rule = loadPromotions()[0].barcodes;
    for(var i = 0; i < rule.length; i++) {
        for(var j = 0; j < buyItem.length; j++) {
            if(rule[i] == buyItem[j].barcode){
                buyItem[j].privilegeCount = Math.floor((buyItem[j].count)/3);
            }
        }
    }
}

var result = "";

function ShowTitle(buyItem) {
    var sum = 0;
    result += "***<没钱赚商店>购物清单***\n";

    for(var i=0; i<buyItem.length; i++) {
        if(buyItem[i].count > 0) {
            result += "名称：" + buyItem[i].name + "，";
            result += "数量：" + buyItem[i].count + buyItem[i].unit + "，";
            result += "单价：" + buyItem[i].price.toFixed(2)+"(元)，";
            result += "小计：" + ((buyItem[i].count-buyItem[i].privilegeCount)*buyItem[i].price).toFixed(2)+"(元)\n";
            sum += buyItem[i].count*buyItem[i].price;
        }
    }

    result += '----------------------\n';
    result += '挥泪赠送商品：\n';
    return sum;
}

function ShowPromotions(buyItem) {
    var cheap = 0;
    var rule = loadPromotions()[0].barcodes;
    for(var i=0; i<buyItem.length; i++) {
        for(var j = 0; j < rule.length; j++) {
            if(buyItem[i].barcode == rule[j]) {
                result += "名称："+buyItem[i].name+"，";
                result += "数量：" + buyItem[i].privilegeCount + buyItem[i].unit+"\n";
                cheap += buyItem[i].price;
            }
        }
    }
    return cheap;
}

function ShowSumTotal(sum, cheap) {
    result += '----------------------\n'
    result += "总计：" + (sum-cheap).toFixed(2) + "(元)\n";
    result += "节省：" + cheap.toFixed(2) + "(元)\n";
    result += '**********************';

    console.log(result);
}

function ShowInventoryItem(buyItem) {
    var sum = ShowTitle(buyItem);
    var cheap = ShowPromotions(buyItem);
    ShowSumTotal(sum, cheap);
}

function printInventory(inputs) {
    var buyItem = [];
    InitItemList(inputs, buyItem);
    InitItemListInfo(buyItem);
    InitPromotionsItem(buyItem);
    ShowInventoryItem(buyItem);
}
