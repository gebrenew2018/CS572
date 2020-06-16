module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;


    this.add = function(item, _id) {
        var storedItem = this.items[_id];
        if (!storedItem) {
            storedItem = this.items[_id] = { item: item, qty: 0, unitPrice: 0 };
        }
        storedItem.qty += 1;
        storedItem.unitPrice = storedItem.item.unitPrice * storedItem.qty;
        this.totalQuantity += 1;
        this.totalPrice += storedItem.item.unitPrice;
    };
    this.generateArray = function() {
        var ItemArr = [];
        for (let id in this.items) {
            ItemArr.push(this.items[_id]);
        }
        return ItemArr;
    };
    this.removeItem = function(item, _id) {
        this.generateArray().splice(this.items[-id]);


    }
}