angular.module('app').service('retrieve', retrieveService);

function retrieveService($rootScope, $location) {

    var vm = this;

    /* Add a new card */
    vm.deck = function ($scope) {
        console.log("window Location:" + $location.path());

    };

}
