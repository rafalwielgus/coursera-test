(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController)
.provider('ShoppingListService', ShoppingListServiceProvider)
.config(Config);

Config.$inject = ['ShoppingListServiceProvider'];
function Config(ShoppingListServiceProvider) {

   ShoppingListServiceProvider.defaults.listToBuyItems = [
                                                           {
                                                             name: "Milk",
                                                             quantity: "2"
                                                           },
                                                           {
                                                             name: "Donuts",
                                                             quantity: "2"
                                                           },
                                                           {
                                                             name: "Cookies",
                                                             quantity: "20"
                                                          },
                                                          {
                                                            name: "Chocolate",
                                                            quantity: "1"
                                                          },
                                                          {
                                                            name: "Lollipops",
                                                            quantity: "20"
                                                          }
                                                        ];

  ShoppingListServiceProvider.defaults.listBoughtItems = [];
}


ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
  var list = this;
  list.items = ShoppingListService.getItems();
  list.itemBought = ShoppingListService.getItemsBought();

  list.buyItem = function (index) {
    ShoppingListService.buyItem(index, list.items[index]);
    console.log('items' + list.items);
    console.log('itemBought' + list.itemBought);
  };

  list.isEmptyItemsList = function () {
    return ShoppingListService.isEmptyList(list.items);
  };

  list.isEmptyItemBoughtList = function () {
    return ShoppingListService.isEmptyList(list.itemBought);
  };
}


// You can provide bought start list (toBuy and bought)
function ShoppingListService(listToBuyItems, listBoughtItems) {
  var service = this;
  // List of shopping items
  var items = listToBuyItems;
  //list of shopping items bought
  var itemsBought = listBoughtItems;

  service.buyItem = function (index, item) {
    var itemPom = {
      name: item.name,
      quantity: item.quantity
    };

    items.splice(index, 1);
    itemsBought.push(itemPom);
  };

  service.getItems = function () {
    return items;
  };

  service.getItemsBought = function(){
    return itemsBought;
  };

  service.isEmptyList = function (list) {
    if (list.length == 0){
      return true;
    } else {
      return false;
    }
  };
}


function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    listToBuyItems: [],
    listBoughtItems:[]
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.listToBuyItems,
                                               provider.defaults.listBoughtItems);

    return shoppingList;
  };
}

})();
