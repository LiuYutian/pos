function printInventory(tags) {
    var cart = new Cart();

    tags.forEach(function(n){
        cart.add(Pos.scan(n));
    });

     Pos.print(cart);
}
