calendarModule.directive('daysweek',['$compile','constantCalendar',function($compile, constantCalendar){
	return{
		restrict: 'E',
		replace: true,
		scope: {},
		require: '^calendar',
		templateUrl: 'module/partials/calendar-days.html',
		link: function($scope, $element, $attr, $contrl){



			console.log($contrl.startWeek)
            if($contrl.startWeek==1){
                $scope.constantCalendar = constantCalendar
            }else{
                var arr = []
                for(var i = 1; i<constantCalendar.days.length; i++){
                    arr.push( constantCalendar.days[i])
                }
                arr.push(constantCalendar.days[0])
                $scope.constantCalendar = {days:arr};
            }
		},
		controller: ['$scope', function($scope){

		}]
	}
}])
