function printInventory(tags) {
    var cart = new Cart();

    tags.forEach(function(n){
        cart.add(Pos.scan(n));
    });

    // console.log(cart.cartItems);

    Pos.print(cart);
}
