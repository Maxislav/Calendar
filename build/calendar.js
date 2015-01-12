var calendarModule=angular.module("calendarModule",[]).constant("constantCalendar",{days:["П","B","C","Ч","П","С","B"],month:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]});calendarModule.directive("calendar",["$compile","$templateCache","constantCalendar","$timeout","factoryOffset",function($compile,$templateCache,constantCalendar,$timeout,factoryOffset){function formatMonth(date,_after,_before){function checkCurrentDate(d){var value="";return dateNowValue==d.getTime()&&(value+="current"),afterValue<=d.getTime()&&d.getTime()<=beforeValue&&(value+=" select"),value}for(var dateNowValue=new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()).getTime(),afterValue=_after.getTime(),beforeValue=_before.getTime(),array=[],i=0;50>i;i++){var d=new Date(date.getFullYear(),date.getMonth(),i);d.getMonth()==date.getMonth()&&array.push({date:d,value:d.getTime(),dayWeek:d.getDay(),"class":checkCurrentDate(d)})}for(var fillBefore=0==array[0].dayWeek?6:array[0].dayWeek-1,fillAfter=0==array[array.length-1].dayWeek?0:7-array[array.length-1].dayWeek,i=0;fillBefore>i;i++)array.unshift(null);for(var i=0;fillAfter>i;i++)array.push(null);for(var rows=parseFloat((array.length/7).toFixed(0)),arrMonth=[],k=0,i=0;rows>i;i++){arrMonth[i]=[];for(var d=0;7>d;d++)arrMonth[i].push(array[k]),k++}return arrMonth}return{restrict:"EA",replace:!0,templateUrl:"module/partials/calendar-label.html",scope:{before:"=before",after:"=after",link:"@link"},controller:["$scope","$element","$attrs","$timeout","$templateCache",function($scope,$element){function render(date){previousMonth=new Date(date.getFullYear(),date.getMonth()-1,date.getDate()),nextMonth=new Date(date.getFullYear(),date.getMonth()+1,date.getDate()),$scope.months[0]={formatMonth:formatMonth(previousMonth,$scope.after,$scope.before),value:previousMonth.getTime(),btn:"module/partials/btn-back.html"},$scope.months[1]={formatMonth:formatMonth(date,$scope.after,$scope.before),value:date.getTime(),btn:null},$scope.months[2]={formatMonth:formatMonth(nextMonth,$scope.after,$scope.before),value:nextMonth.getTime(),btn:"module/partials/btn-forward.html"}}function listen(e){var val=!1;angular.forEach($element.find("*"),function(el){return angular.equals(angular.element(el),angular.element(e.target))?void(val=!0):void 0}),val||($scope.show=!1,$scope.$apply())}function cleanup(){window.document.removeEventListener("click",listen)}"true"==$scope.link?!0:!1;$scope.show=!1,$scope.constantCalendar=constantCalendar,$scope.months=[],$scope.beforeLabelValue=$scope.before,$scope.afterLabelValue=$scope.after;var previousMonth,nextMonth,currentViewDate=new Date($scope.after.getTime()+($scope.before.getTime()-$scope.after.getTime())/2);$scope.includeMonths="module/partials/container-months.html",render(currentViewDate),$scope.stepBack=function(){var date=new Date(currentViewDate.getFullYear(),currentViewDate.getMonth()-1,currentViewDate.getDate());currentViewDate=date,render(date)},$scope.stepForward=function(){var date=new Date(currentViewDate.getFullYear(),currentViewDate.getMonth()+1,currentViewDate.getDate());currentViewDate=date,render(date)},$scope.selectEvent=function(day){$scope.before.getTime()<day.value?$scope.before=new Date(day.value):day.value<$scope.after.getTime()?$scope.after=new Date(day.value):($scope.after=new Date(day.value),$scope.before=new Date(day.value))},$scope.apply=function(){$scope.click()},$scope.$watch("before",function(){render(currentViewDate)}),$scope.$watch("after",function(){render(currentViewDate)}),$scope.$watch("show",function(val){val?window.document.addEventListener("click",listen):window.document.removeEventListener("click",listen)}),$scope.$on("$destroy",function(){console.log("destroy"),cleanup()})}],link:function($scope,$element){function init(){var linkFn=$compile($templateCache.get("module/partials/calendar-view.html"));$scope.content=content=linkFn($scope),content.css("display","none"),$element.append(content),console.log(factoryOffset.getOffset($element[0]).top),$timeout(function(){$scope.show=!0,content.css("display","inherit")},1)}var content=null;$scope.show=!1,$scope.content,$scope.click=function(){return content?(console.log(factoryOffset.getOffset($element[0]).top),void($scope.show=!$scope.show)):void init()}}}}]),calendarModule.directive("daysweek",["$compile","constantCalendar",function($compile,constantCalendar){return{restrict:"E",replace:!0,scope:{},templateUrl:"module/partials/calendar-days.html",controller:["$scope",function($scope){$scope.constantCalendar=constantCalendar}]}}]),angular.module("calendarModule").factory("factoryOffset",function(){function getOffset(elem){return elem.getBoundingClientRect?getOffsetRect(elem):getOffsetSum(elem)}function getOffsetSum(elem){for(var top=0,left=0;elem;)top+=parseInt(elem.offsetTop),left+=parseInt(elem.offsetLeft),elem=elem.offsetParent;return{top:top,left:left}}function getOffsetRect(elem){var box=elem.getBoundingClientRect(),body=document.body,docElem=document.documentElement,scrollTop=window.pageYOffset||docElem.scrollTop||body.scrollTop,scrollLeft=window.pageXOffset||docElem.scrollLeft||body.scrollLeft,clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,top=box.top+scrollTop-clientTop,left=box.left+scrollLeft-clientLeft;return{top:Math.round(top),left:Math.round(left)}}return{getOffset:getOffset}}),angular.module("calendarModule").run(["$templateCache",function($templateCache){"use strict";$templateCache.put("module/partials/btn-back.html",'<div class="btn-back" ng-click="stepBack()">&#8249;</div>'),$templateCache.put("module/partials/btn-forward.html",'<div class="btn-forward" ng-click="stepForward()">&#8250;</div>'),$templateCache.put("module/partials/calendar-days.html",'<div class="row days"><div class="col-day text-right" ng-repeat="days in constantCalendar.days track by $index"><span ng-switch="$index"><span ng-switch-when="6" class="red">{{days}}</span> <span ng-switch-when="5" class="red">{{days}}</span> <span ng-switch-default>{{days}}</span></span></div></div>'),$templateCache.put("module/partials/calendar-label.html",'<div class="calendar-label"><div class="calendar-label-btn" ng-class="show && \'open\'">{{after | date:\'dd MMM\'}} - {{before | date:\'dd MMM\'}} {{before | date:\'yyyy\'}}</div><div class="calendar-label-ico" ng-click="click()"><div class="ico-calendar">&nbsp;</div></div></div>'),$templateCache.put("module/partials/calendar-view.html",'<div ng-show="show" class="calendar-view"><div class="container-months"><div ng-include="includeMonths"></div></div><div class="info-block"><div class="row info-label"><div class="col-4"><div class="info-label-value">{{ after | date:\'yyyy.MM.dd\' }}</div></div><div class="col-4"><div class="info-label-value">{{ before | date:\'yyyy.MM.dd\' }}</div></div><div class="col-4"><div class="button" ng-click="apply()">Применить</div></div></div></div></div>'),$templateCache.put("module/partials/container-months.html",'<table><tr><td ng-repeat="month in months track by $index"><!--текущий--><div class="block-month"><daysweek></daysweek><div class="border-line" ng-include="month.btn"></div><div class="row name-month">{{month.value | date:\'MMMM yyyy\'}}</div><div class="numeric"><div class="row" ng-repeat="week in month.formatMonth track by $index"><div class="col-day text-right {{day.class}}" ng-repeat="day in month.formatMonth[$index] track by $index" ng-click="selectEvent(day)"><span ng-switch="$index"><span ng-switch-when="6" class="red">{{day.value | date:\'d\'}}</span> <span ng-switch-when="5" class="red">{{day.value | date:\'d\'}}</span> <span ng-switch-default>{{day.value | date:\'d\'}}</span></span></div></div></div></div></td></tr></table>')}]);
//# sourceMappingURL=calendar.js.map