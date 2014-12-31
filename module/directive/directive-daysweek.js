calendarModule.directive('daysweek',['$compile',function($compile){
	return{
		restrict: 'E',
		replace: true,
		templateUrl: 'module/partials/calendar-days.html'
	}
}])
