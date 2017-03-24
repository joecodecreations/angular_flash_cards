angular.module('app').controller('navigation', navigationController);

function navigationController($scope) {
    var ctrl = $scope;

    ctrl.title = 'Flash Card Quiz';

    ctrl.navButtons = [{

        'heading': 'Add Card',
        'titleTag': 'Add a new card',
        'action': function () {
            ctrl.showAddCardInterface();
        }

    }];


}
