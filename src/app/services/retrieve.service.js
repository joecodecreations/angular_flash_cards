angular.module('app').service('retrieve', retrieveService);

function retrieveService($rootScope, $location) {

    var vm = this;

    /* Add a new card */
    vm.deck = function ($scope) {
        var url = $location.absUrl().split('https://flashcardquiz.com/')[0];
        //var url = $location.absUrl();
        console.log("window Location:" + url);

    };

}
