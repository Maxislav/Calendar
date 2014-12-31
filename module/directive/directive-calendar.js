calendarModule.directive('calendar', ['$compile', '$templateCache','constantCalendar', function ($compile, $templateCache, constantCalendar) {
    function formatMonth(date){
        var dateNowValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
        function checkCurrentDate(d){
            if(dateNowValue == d.getTime()){
                return true
            }
            return false
        }
        var array = [];
        for (var i = 0; i<50; i++){
            var d = new Date(date.getFullYear(), date.getMonth(),i)
            if(d.getMonth() == date.getMonth() ){
                array.push({
                    date: d,
                    value: d.getTime(),
                    dayWeek: d.getDay(),
                    class: checkCurrentDate(d) ? "current" :''
                })
            }
        }
        //console.log(array);
        var fillBefore = (array[0].dayWeek == 0) ? 6 : array[0].dayWeek-1;
        var fillAfter = 7 - array[array.length-1].dayWeek;
        for(var i = 0; i<fillBefore; i++){
            array.unshift(null)
        }
        for(var i = 0; i<fillAfter; i++){
            array.push(null)
        }

        var rows = parseFloat((array.length/7).toFixed(0));
        var arrMonth = [];
        var k = 0
        for(var i = 0; i<rows;i++){
            arrMonth[i]=[];
            for(var d = 0; d<7;d++){
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
            after: '=after'
        },
        controller: ['$scope', '$element', '$attrs', '$timeout', '$templateCache', function ($scope, $element, $attrs, $timeout, $templateCache) {
            var content = null;
            $scope.show = false;
            $scope.constantCalendar = constantCalendar;
            var date = new Date();
            //var currentMonth = date.getMonth()


            $scope.arrMonth = formatMonth(date);
            $scope.arrMonth.value = date.getTime();

            var dateBefore = new Date(date.getFullYear(),date.getMonth()-1,1)
            $scope.arrMonthBefore = formatMonth(dateBefore)
            $scope.arrMonthBefore.value = dateBefore.getTime()

            var dateAfter = new Date(date.getFullYear(),date.getMonth()+1,1)
            $scope.arrMonthAfter = formatMonth(dateAfter)
            $scope.arrMonthAfter.value = dateAfter.getTime()

            function init() {
                var linkFn = $compile($templateCache.get('module/partials/calendar-view.html'));
                content = linkFn($scope);
                $element.append(content);
            }
            $scope.click = function () {
                if (!content) {
                    init()
                }
                $scope.show = !$scope.show
            }
            console.log($scope.before)


        }]
    }
}])