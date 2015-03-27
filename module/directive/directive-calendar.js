calendarModule.directive('calendar', ['$compile', '$templateCache', 'constantCalendar', '$timeout', 'factoryPosition','serviceDaysWeek',
	function ($compile, $templateCache, constantCalendar, $timeout, factoryPosition, serviceDaysWeek) {
	//function formatMonth(date, _after, _before) {
	function formatMonth(date, params) {
		var dateNowValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();

        var afterValue = params.after ?  params.after.getTime() : null;
		var beforeValue =  params.before ?  params.before.getTime() : null;
		var maxDate = params.maxDate || null;
		var minDate = params.minDate || null;
        var startWeek = params.startWeek || 1;

		function checkCurrentDate(d) {
			var value = ''
			if (dateNowValue == d.getTime()) {
				value += 'current'
			}
			if (afterValue <= d.getTime() && d.getTime() <= beforeValue) {
				value += ' select'
			}

			if (getBlocked(d)) {
				value += ' blocked'
			}
			return value
		}

		function getBlocked(d) {
			if (maxDate && maxDate.getTime() < d.getTime()) {
				return true
			}

			if (minDate && d.getTime() < minDate.getTime() ){
				return true
			}
			return false
		}

		var array = [];
		for (var i = 0; i < 50; i++) {
			var d = new Date(date.getFullYear(), date.getMonth(), i)
			if (d.getMonth() == date.getMonth()) {
				array.push({
					date: d,
					value: d.getTime(),
					dayWeek: d.getDay(),
					blocked: getBlocked(d),
					class: checkCurrentDate(d)
				})
			}
		}
		var fillBefore,fillAfter;
      //  console.log(startWeek)
        if(startWeek == 0){
            fillBefore =  array[0].dayWeek ;
            fillAfter =  6 - array[array.length - 1].dayWeek;
        }else{
            fillBefore = (array[0].dayWeek == 0) ? 6 : array[0].dayWeek - 1;
            fillAfter = (array[array.length - 1].dayWeek == 0) ? 0 : 7 - array[array.length - 1].dayWeek;
        }
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
			viewMonths: '@viewMonths',
			formatDate: '@formatDate',
			maxDate: '=',
			minDate:'=',
			startWeek: '@'
		},
		controller: ['$scope', '$element', '$attrs', '$timeout', '$templateCache', function ($scope, $element, $attrs, $timeout, $templateCache) {
			var link = $scope.link == 'true' ? true : false;
			$scope.viewMonths = parseFloat($scope.viewMonths) || 3;
			$scope.formatDate = $scope.formatDate || 'yyyy.MM.dd';
			//$scope.serviceDaysWeek = serviceDaysWeek;
			//serviceDaysWeek.startWeek =  $scope.startWeek;
			console.log($scope.startWeek)
			//$scope.serviceDaysWeek.startWeek =  $scope.startWeek;
            //this.startWeek =   $scope.startWeek = parseFloat($scope.startWeek);

			$scope.show = false;
			$scope.constantCalendar = constantCalendar;
			$scope.months = [];
			$scope.beforeLabelValue = $scope.before || new Date();
			$scope.afterLabelValue = $scope.after || new Date();

			var currentViewDate = new Date($scope.afterLabelValue.getTime() + (($scope.beforeLabelValue.getTime() - $scope.afterLabelValue.getTime()) / 2));   // $scope.date;

			$scope.includeMonths = 'module/partials/container-months.html'

			function render(date) {

				function getdate(i) {
					var k = (-1 * Math.ceil($scope.viewMonths / 2)) + i + 1;
					return new Date(date.getFullYear(), date.getMonth() + k, date.getDate());

				}

				for (var i = 0; i < $scope.viewMonths; i++) {
					var d = getdate(i);
					var btnBack = false, btnForward = false;
					if (i === 0) {
						btnBack = true
					}
					if (i === $scope.viewMonths - 1) {
						btnForward = true
					}


					$scope.months[i] = {
						formatMonth: formatMonth(d, {
							after: $scope.afterLabelValue,
							before: $scope.beforeLabelValue,
							maxDate: $scope.maxDate,
							minDate: $scope.minDate,
                            startWeek: $scope.startWeek
						}),
						value: d.getTime(),
						btnBack: btnBack,
						btnForward: btnForward
					};
				}
			}

			render(currentViewDate);

			$scope.stepBack = function () {
				var date = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() - 1, currentViewDate.getDate())
				currentViewDate = date;
				render(date);
			}
			$scope.stepForward = function () {

				var date = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, currentViewDate.getDate())
				currentViewDate = date;
				render(date)

			}
			$scope.selectEvent = function (day) {
				if (!day || day.blocked) {
					return
				}

				if ($scope.beforeLabelValue.getTime() < day.value) {
					$scope.beforeLabelValue = new Date(day.value)
					link && ( $scope.before = $scope.beforeLabelValue );
				} else if (day.value < $scope.afterLabelValue.getTime()) {
					$scope.afterLabelValue = new Date(day.value);
					link && ($scope.after = $scope.afterLabelValue );
				} else {
					$scope.afterLabelValue = new Date(day.value)
					$scope.beforeLabelValue = new Date(day.value)

					if (link) {
						$scope.before = $scope.beforeLabelValue;
						$scope.after = $scope.afterLabelValue;
					}
				}
			}

			$scope.apply = function () {
				$scope.before = $scope.beforeLabelValue;
				$scope.after = $scope.afterLabelValue;
				$scope.click();
			}

			$scope.$watch('before', function (val) {
				if (val != $scope.beforeLabelValue) {
					$scope.beforeLabelValue = val;
				}
				render(currentViewDate)
			})


			$scope.$watch('after', function (val) {
				if (val != $scope.afterLabelValue) {
					$scope.afterLabelValue = val;
				}
				render(currentViewDate)
			})

			$scope.$watchCollection('[beforeLabelValue,afterLabelValue,maxDate, minDate]',
				function () {
					render(currentViewDate)
				})

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

			/*$scope.$watch('show', function (val, newVal) {
				if (val) {
					window.document.addEventListener('click', listen);
				} else {
					$scope.beforeLabelValue = $scope.before;
					$scope.afterLabelValue = $scope.after;
					window.document.removeEventListener('click', listen);
				}
			});
			$scope.$on('$destroy', function () {
				console.log("destroy");
				cleanup();
			});*/

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
}])