angular.module('app').directive('insertCard', insertCardDirective);

function insertCardDirective() {
    return {
        restrict: "EA",
        scope: {
            addCardShow: '@'
        },
        //template: '<span class="jackson">{{ test }} Billy</span>',
        templateUrl: '/insertDirective',
    };
}
