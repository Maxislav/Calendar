calendarModule.directive('calendar', ['$compile', '$templateCache', 'constantCalendar','$timeout', function ($compile, $templateCache, constantCalendar, $timeout) {
	function formatMonth(date, _after, _before) {
		var dateNowValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
		var afterValue = _after.getTime();
		var beforeValue = _before.getTime();

		function checkCurrentDate(d) {
			var value = ''
			if (dateNowValue == d.getTime()) {
				value += 'current'
			}
			if (afterValue <= d.getTime() && d.getTime() <= beforeValue) {
				value += ' select'
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
		var k = 0
		for (var i = 0; i < rows; i++) {
			arrMonth[i] = [];
			for (var d = 0; d < 7; d++) {
				arrMonth[i].push(array[k])
				k++;
			}

		}
		//  console.log(arrMonth)
		return arrMonth
	}


	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'module/partials/calendar-label.html',
		scope: {
			before: '=before',
			after: '=after',
			link: '@link'
		},
		controller: ['$scope', '$element', '$attrs', '$timeout', '$templateCache', function ($scope, $element, $attrs, $timeout, $templateCache) {
			var link = $scope.link == 'true' ? true : false ;

			$scope.show = false;
			$scope.constantCalendar = constantCalendar;

			$scope.beforeLabelValue =  $scope.before;
			$scope.afterLabelValue =  $scope.after;

			var currentViewDate = new Date($scope.after.getTime() + (($scope.before.getTime() - $scope.after.getTime()) / 2));   // $scope.date;
			var previousMonth, nextMonth;
			$scope.includeMonths = 'module/partials/container-months.html'

			function render(date) {
				previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
				nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
				$scope.arrMonth = formatMonth(date, $scope.after, $scope.before);
				$scope.arrMonth.value = date.getTime();
				$scope.arrMonthBefore = formatMonth(previousMonth, $scope.after, $scope.before);
				$scope.arrMonthBefore.value = previousMonth.getTime();
				$scope.arrMonthAfter = formatMonth(nextMonth, $scope.after, $scope.before);
				$scope.arrMonthAfter.value = nextMonth.getTime();
			}

			render(currentViewDate);

			$scope.stepBack = function () {
				var date = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() - 1, currentViewDate.getDate())
				currentViewDate = date;
				render(date);
			}
			$scope.stepForward = function () {

				var date = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, currentViewDate.getDate())
				currentViewDate = date
				render(date)

			}
			$scope.selectEvent = function (day) {
				if ($scope.before.getTime() < day.value) {
					$scope.before = new Date(day.value)

				} else if (day.value < $scope.after.getTime()) {
					$scope.after = new Date(day.value)
				} else {
					$scope.after = new Date(day.value)
					$scope.before = new Date(day.value)
				}

				if(link){
					$scope.beforeLabelValue  = $scope.before
					$scope.afterLabelValue =  $scope.after;
				}
			}

			$scope.apply = function(){
				$scope.beforeLabelValue  = $scope.before
				$scope.afterLabelValue =  $scope.after;
				$scope.click()
			}

			$scope.$watch('before', function () {
				render(currentViewDate)
			})
			$scope.$watch('after', function () {
				render(currentViewDate)
			})

			function listen(e) {
				console.log($scope.calendarElement)

				var val = false
				angular.forEach($scope.calendarElement.find('*'), function (el) {
					if (angular.equals(angular.element(el), angular.element(e.target))) {
						val = true
						return
					}
				})
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
			})
			$scope.$on('$destroy', function () {
				console.log("destroy");
				cleanup();
			});
		}],
		link: function ($scope, $element) {
			var content = null;
			$scope.show = false;
			function init() {
				var linkFn = $compile($templateCache.get('module/partials/calendar-view.html'));
				content = linkFn($scope);
				content.css('display','none')

				var body  =  angular.element(document.body)
				body.append(content);
				$scope.calendarElement = content;
				$timeout(function(){
					$scope.show = true
					content.css('display','inherit')
				},1)
			}
			$scope.click = function () {
				if (!content) {
					init()
					return
				}
				$scope.show = !$scope.show
				console.log($scope.show)
			}
		}

	}
}])