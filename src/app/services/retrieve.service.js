angular.module('app').service('retrieve', retrieveService);

function retrieveService($rootScope, $location) {

    var vm = this;

    /* Add a new card */
    vm.deck = function ($scope) {
        // var url = $location.absUrl().split('/')[0];
        var url = $location.absUrl();
        var token = url.replace("https://flashcardquiz.com/", "");
        console.log("window Location:" + token);

    };

}
