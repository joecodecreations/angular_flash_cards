angular.module('app').service('retrieve', retrieveService);

function retrieveService($location) {
    var vm = this;

    /* Add a new card */
    vm.deck = function ($scope, $location) {
        console.log($location.path());

    };

}
