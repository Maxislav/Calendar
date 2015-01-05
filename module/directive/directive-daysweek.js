calendarModule.directive('daysweek',['$compile','constantCalendar',function($compile, constantCalendar){
	return{
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: 'module/partials/calendar-days.html',
		controller: ['$scope', function($scope){
			$scope.constantCalendar = constantCalendar
		}]
	}
}])
