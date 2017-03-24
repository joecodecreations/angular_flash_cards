angular.module('app').service('resetValidationService', resetValidationService);

function resetValidationService() {
    var vm = this;
    vm.reset = function ($scope) {
        var ctrl = $scope;

        //Reset Validation
        ctrl.QuestionError = false;
        ctrl.AnswerError = false;
        ctrl.SubjectError = false;
        ctrl.QuestionErrorMessage = "";
        ctrl.AnswerErrorMessage = "";
        ctrl.SubjectErrorMessage = "";


        //reset the form
        ctrl.cardAdded = false;


        return true;
    };
}
