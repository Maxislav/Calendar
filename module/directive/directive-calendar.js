var calendarModule = angular.module('calendarModule', [])
calendarModule.directive('calendar', ['$compile', '$templateCache', function ($compile, $templateCache) {

    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'module/partials/calendar-label.html',
        scope: {

        },
        controller: ['$scope', '$element', '$attrs', '$timeout', '$templateCache', function ($scope, $element, $attrs, $timeout, $templateCache) {
            var content = null;
            $scope.show = false;
            function init() {
                var linkFn = $compile($templateCache.get('module/partials/calendar-view.html'));
                content = linkFn($scope);
                $element.append(content);
            }

            $scope.click = function () {
                if (!content) {
                    init()
                }
                $scope.show = !$scope.show
            }
        }]
    }
}])