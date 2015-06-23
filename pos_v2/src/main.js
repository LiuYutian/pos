function printInventory(tags) {
    var pos = new Pos();
    var resultDispose = pos.disposeData(tags);

    pos.print(resultDispose);
}
