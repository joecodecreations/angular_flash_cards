/* This will count the cards in our deck */

angular.module('app').service('updateCards', updateCards);

function updateCards() {
    var vm = this;

    vm.calculateQuestions = function ($scope, questions) {
        var ctrl = $scope;
        if (ctrl.totalQuestions) {
            ctrl.totalQuestions = questions.length;
        }
        return true;

    };


}
