app.controller('defaultContrl', ['$scope', '$interval', '$timeout','calendarSettings',function($scope, $interval, $timeout, calendarSettings){
	var date = new Date();
	var d = new Date();
	$scope.before = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	$scope.after = new Date(d.getFullYear(), d.getMonth(), d.getDate())
	$scope.maxDate = new Date(d.getFullYear(), d.getMonth(), d.getDate()+5);
	$scope.minDate = new Date(d.getFullYear(), d.getMonth()-2, d.getDate());
    calendarSettings.config.labelTemlate = "{{after | date:'dd MMM'}} - {{before | date:'dd MMM'}} {{before | date:'yyyy'}}";
}])
