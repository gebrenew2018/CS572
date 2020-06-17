module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;


    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, quantity: 0, unitPrice: 0 };
        }
        storedItem.quantity += 1;
        storedItem.unitPrice = storedItem.item.unitPrice * storedItem.quantity;
        this.totalQuantity += 1;
        this.totalPrice += storedItem.item.unitPrice;
    };
    this.deleteOneProductFromCart = function(id) {
        this.items[id].quantity--;
        this.items[id].unitPrice -= this.items[id].item.unitPrice;
        this.totalQuantity--;
        this.totalPrice -= this.items[id].item.unitPrice;
        if (this.items[id].quantity <= 0) {
            delete this.items[id];
        }
    }
    this.removeItem = function(id) {
        if (this.items[id]) {
            this.totalQuantity -= this.items[id].quantity;
            this.totalPrice -= this.items[id].unitPrice;
            delete this.items[id];
        }
    }
    this.generateArray = function() {
        var arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        console.log('an array:  ' + arr);
        return arr;
    };
}