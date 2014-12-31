app.controller('defaultContrl', ['$scope', '$interval',function($scope, $interval){
	var date = new Date();
	$scope.after = new Date(date.getFullYear(), date.getMonth(), date.getDate()-4).getTime();
	$scope.before = new Date().getTime();
	$interval(function(){
		$scope.before = new Date().getTime();
	},1000)
}])
