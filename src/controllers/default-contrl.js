app.controller('defaultContrl', ['$scope', '$interval',function($scope, $interval){
	var date = new Date();

	var d = new Date()

	$scope.before = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	$scope.after = new Date(d.getFullYear(), d.getMonth(), d.getDate())

}])
