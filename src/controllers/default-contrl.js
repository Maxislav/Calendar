app.controller('defaultContrl', ['$scope', '$interval', '$timeout',function($scope, $interval, $timeout){
	var date = new Date();

	var d = new Date()

	$scope.before = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	$scope.after = new Date(d.getFullYear(), d.getMonth(), d.getDate())
	$scope.maxDate = new Date(d.getFullYear(), d.getMonth(), d.getDate()+5);

	$timeout(function(){
		$scope.maxDate = new Date(d.getFullYear(), d.getMonth(), d.getDate()+7);
	}, 5000)

}])
