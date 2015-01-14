calendarModule.directive('daysweek',['$compile','constantCalendar',function($compile, constantCalendar){
	return{
		restrict: 'E',
		replace: true,
		scope: {},
		require: '^calendar',
		templateUrl: 'module/partials/calendar-days.html',
		link: function($scope, $element, $attr, $contrl){


			$scope.constantCalendar = constantCalendar
			console.log($contrl.startWeek)
		},
		controller: ['$scope', function($scope){

		}]
	}
}])
