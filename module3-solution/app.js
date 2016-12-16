(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective )
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'loader/itemsloaderindicator.template.html',
    scope: {
      menu: '<',
      onRemove: '&'
    },
    controller: MenuSearchDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function MenuSearchDirectiveController() {
  var list = this;

  list.isListEmpty = function () {
    if (list.menu.length == 0) {
      return true;
    } else {
      return false;
    }
  };

}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  menu.foundItems = MenuSearchService.getItems();

  menu.getMenuItems = function () {
    menu.foundItems = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
  };

  menu.removeItem = function (itemIndex) {
        MenuSearchService.removeItem(itemIndex);
    };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItemsHelper = [];

  service.getMatchedMenuItems = function (searchTerm) {
    foundItemsHelper = [];
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    var promise = response;

    promise.then(function (res) {
     for (var i = 0; i <  res.data.menu_items.length; i++) {
         var description = res.data.menu_items[i].description;
         if (description.toLowerCase().indexOf(searchTerm) > 0) {
           foundItemsHelper.push( res.data.menu_items[i]);
          }
       }
    })
    .catch(function (error) {
      console.log(error);
    })
    return foundItemsHelper;
  };

  service.removeItem = function (itemIndex) {
    foundItemsHelper.splice(itemIndex, 1);
  };

  service.getItems = function () {
     return foundItemsHelper;
  };

}

})();
