calendarModule.directive('daysweek', ['$compile', 'constantCalendar', function ($compile, constantCalendar) {
    return{
        restrict: 'E',
        replace: true,
        scope: {},
        require: '^calendar',
        templateUrl: 'module/partials/calendar-days.html',
        link: function ($scope, $element, $attr, $contrl) {
            $scope.days = [];

            if ($contrl.startWeek == 0) {

                for (var i = 1; i<constantCalendar.days.length; i++) {
                    $scope.days.push({
                        text: constantCalendar.days[i],
                        n: i-1
                    })
                }
                $scope.days.push({
                    text: constantCalendar.days[0],
                    n: 0
                })
                $scope.days

            } else {
                angular.forEach(constantCalendar.days, function (day, i) {
                    $scope.days.push({
                        text: day,
                        n: (i === 6) ? 0 :  i+1
                    })
                })
            }
        },
        controller: ['$scope', function ($scope) {

        }]
    }
}])
