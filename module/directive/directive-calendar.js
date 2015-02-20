calendarModule.directive('calendar', ['$compile', '$templateCache', 'constantCalendar','$timeout', 'factoryPosition',
    function ($compile, $templateCache, constantCalendar, $timeout, factoryPosition) {
	function formatMonth(date, _after, _before) {
		var afterValue, beforeValue, exactValue;
		var _exact = _before ? false :true;

		var dateNowValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
		if(_exact){
			exactValue = _after.getTime();

		} else{
			afterValue = _after.getTime();
			beforeValue = _before.getTime();
		}

		function checkCurrentDate(d) {
			var value = '';
			if (dateNowValue == d.getTime()) {
				value += 'current'
			}

			if(_exact){
				if(exactValue< d.getTime() + (3600*24*1000) && exactValue >= d.getTime()){
					value += ' select'
				}
			}else{
				if (afterValue <= d.getTime() && d.getTime() <= beforeValue) {
					value += ' select'
				}
			}


			return value
		}

		var array = [];
		for (var i = 0; i < 50; i++) {
			var d = new Date(date.getFullYear(), date.getMonth(), i)
			if (d.getMonth() == date.getMonth()) {
				array.push({
					date: d,
					value: d.getTime(),
					dayWeek: d.getDay(),
					class: checkCurrentDate(d)
				})
			}
		}
		var fillBefore = (array[0].dayWeek == 0) ? 6 : array[0].dayWeek - 1;
		var fillAfter = (array[array.length - 1].dayWeek == 0) ? 0 : 7 - array[array.length - 1].dayWeek;
		for (var i = 0; i < fillBefore; i++) {
			array.unshift(null)
		}
		for (var i = 0; i < fillAfter; i++) {
			array.push(null)
		}

		var rows = parseFloat((array.length / 7).toFixed(0));
		var arrMonth = [];
		var k = 0;
		for (var i = 0; i < rows; i++) {
			arrMonth[i] = [];
			for (var d = 0; d < 7; d++) {
				arrMonth[i].push(array[k])
				k++;
			}
		}
		return arrMonth
	}


	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'module/partials/calendar-label.html',
		scope: {
			before: '=before',
			after: '=after',
			link: '@link',
			exact: '='
		},
		controller: ['$scope', '$element', '$attrs', '$timeout', '$templateCache', function ($scope, $element, $attrs, $timeout, $templateCache) {
			var link = $scope.link == 'true' ? true : false ;
			var _exact = $scope.exact ? true : false;


			$scope.show = false;
			$scope.constantCalendar = constantCalendar;

			$scope.beforeLabelValue =  $scope.before;
			$scope.afterLabelValue =  $scope.after;


			var currentViewDate;
			if(_exact){
				currentViewDate = $scope.exact;
			}else{
				currentViewDate = new Date($scope.after.getTime() + (($scope.before.getTime() - $scope.after.getTime()) / 2));   // $scope.date;
			}


			var previousMonth, nextMonth;
			$scope.includeMonths = 'module/partials/container-months.html'

			function render(date) {
				previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
				nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
				if(_exact){
					$scope.arrMonth = formatMonth(date, $scope.exact);
					$scope.arrMonth.value = date.getTime();
					$scope.arrMonthBefore = formatMonth(previousMonth, $scope.exact);
					$scope.arrMonthBefore.value = previousMonth.getTime();
					$scope.arrMonthAfter = formatMonth(nextMonth, $scope.exact);
					$scope.arrMonthAfter.value = nextMonth.getTime();
				}else{
					$scope.arrMonth = formatMonth(date, $scope.after, $scope.before);
					$scope.arrMonth.value = date.getTime();
					$scope.arrMonthBefore = formatMonth(previousMonth, $scope.after, $scope.before);
					$scope.arrMonthBefore.value = previousMonth.getTime();
					$scope.arrMonthAfter = formatMonth(nextMonth, $scope.after, $scope.before);
					$scope.arrMonthAfter.value = nextMonth.getTime();
				}

			}

			render(currentViewDate);

			$scope.stepBack = function () {
				var date = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() - 1, currentViewDate.getDate())
				currentViewDate = date;
				render(date);
			};
			$scope.stepForward = function () {

				var date = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, currentViewDate.getDate())
				currentViewDate = date;
				render(date)

			};
			$scope.selectEvent = function (day) {

				if(_exact){
					$scope.exact = new Date(day.value);
				}else{
					if ($scope.before.getTime() < day.value) {
						$scope.before = new Date(day.value)
					} else if (day.value < $scope.after.getTime()) {
						$scope.after = new Date(day.value)
					} else {
						$scope.after = new Date(day.value);
						$scope.before = new Date(day.value);
					}
				}


				if(link){
					$scope.beforeLabelValue  = $scope.before;
					$scope.afterLabelValue =  $scope.after;
				}
			};

			$scope.apply = function(){
				/*$scope.beforeLabelValue  = $scope.before
				$scope.afterLabelValue =  $scope.after;*/
				$scope.click()
			};

			$scope.$watch('before', function () {
				render(currentViewDate)
			});
			$scope.$watch('after', function () {
				render(currentViewDate)
			});
			$scope.$watch('exact', function () {
				render(currentViewDate)
			});


			function listen(e) {
				var val = false
				angular.forEach($scope.calendarElement.find('*'), function (el) {
					//if ( angular.equals(angular.element(el), angular.element(e.target))   ) {
					if ( el == e.target  ) {
						val = true;
						return;
					}
				});

				if(!val){
					angular.forEach($element.find('*'), function (el) {
						if (  el == e.target ) {
							val = true;
							return;
						}
					})
				}


				if (!val) {
					($scope.show = false)
					$scope.$apply()
				}
			}

			function cleanup() {
				window.document.removeEventListener('click', listen);
			}

			$scope.$watch('show', function (val, newVal) {
				if (val) {
					window.document.addEventListener('click', listen)
				} else {
					window.document.removeEventListener('click', listen);
				}
			});
			$scope.$on('$destroy', function () {
                $scope.show = false;
                console.log("destroy");
                $scope.calendarElement && $scope.calendarElement[0].parentNode.removeChild($scope.calendarElement[0]);
                cleanup();
			});
		}],
		link: function ($scope, $element) {
			var content = null;
			$scope.show = false;
            $scope.content;
			function init() {
				var linkFn = $compile($templateCache.get('module/partials/calendar-view.html'));
				content = linkFn($scope);
				content.css('display','none')
				var body  =  angular.element(document.body);
				body.append(content);
				$scope.calendarElement = content;
				$timeout(function(){
					$scope.show = true;
					content.css('display','inherit');
                    content.css('left', factoryPosition($element[0]).x+100+'px' )
                    content.css('top', factoryPosition($element[0]).y+25+'px' )

				},1)
			}
			$scope.click = function () {
				if (!content) {
					init()
					return
				}
				$scope.show = !$scope.show
			}
		}
	}
}]);