angular.module('app').service('retrieve', retrieveService);

function retrieveService($rootScope, $location, $http) {

    var vm = this;

    /* Add a new card */
    vm.deck = function ($scope) {
        var ctrl = $scope;
        //grab url in browser bar
        var url = $location.absUrl();
        //strip out url and get only oken
        var token = url.replace("https://flashcardquiz.com/", "");

        //if we have a token let's grab the data if any
        if (token) {

            //hit the API
            $http({
                method: 'GET',
                url: '/api/gather/' + token,
                //data: deckInfo,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                if (response.data.message == "success") {

                    ctrl.questions = response.data.cards;
                    ctrl.deckTitle = response.data.title;
                    ctrl.backgroundColor = response.data.backgroundColor;
                    ctrl.canSkipQuestions = response.data.canSkipQuestions;
                    ctrl.route = token;
                    //console.log(ctrl.questions);


                    ctrl.mainWindow = true;
                    ctrl.introCompleted = true;

                }

            });

        } else {
            console.log("We had no token to process");
        }


    };

}
