var calendarModule=angular.module("calendarModule",[]).constant("constantCalendar",{days:["П","B","C","Ч","П","С","B"],month:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]});calendarModule.directive("calendar",["$compile","$templateCache","constantCalendar","$timeout","factoryOffset",function($compile,$templateCache,constantCalendar,$timeout){function formatMonth(date,params){function checkCurrentDate(d){var value="";return dateNowValue==d.getTime()&&(value+="current"),afterValue<=d.getTime()&&d.getTime()<=beforeValue&&(value+=" select"),getBlocked(d)&&(value+=" blocked"),value}function getBlocked(d){return maxDate&&maxDate.getTime()<d.getTime()?!0:minDate&&d.getTime()<minDate.getTime()?!0:!1}for(var dateNowValue=new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()).getTime(),afterValue=params.after.getTime(),beforeValue=params.before.getTime(),maxDate=params.maxDate||null,minDate=params.minDate||null,array=[],i=0;50>i;i++){var d=new Date(date.getFullYear(),date.getMonth(),i);d.getMonth()==date.getMonth()&&array.push({date:d,value:d.getTime(),dayWeek:d.getDay(),blocked:getBlocked(d),"class":checkCurrentDate(d)})}for(var fillBefore=0==array[0].dayWeek?6:array[0].dayWeek-1,fillAfter=0==array[array.length-1].dayWeek?0:7-array[array.length-1].dayWeek,i=0;fillBefore>i;i++)array.unshift(null);for(var i=0;fillAfter>i;i++)array.push(null);for(var rows=parseFloat((array.length/7).toFixed(0)),arrMonth=[],k=0,i=0;rows>i;i++){arrMonth[i]=[];for(var d=0;7>d;d++)arrMonth[i].push(array[k]),k++}return arrMonth}return{restrict:"EA",replace:!0,templateUrl:"module/partials/calendar-label.html",scope:{before:"=before",after:"=after",link:"@link",viewMonths:"@viewMonths",formatDate:"@formatDate",maxDate:"=",minDate:"=",startWeek:"@"},controller:["$scope","$element","$attrs","$timeout","$templateCache",function($scope,$element){function render(date){function getdate(i){var k=-1*Math.ceil($scope.viewMonths/2)+i+1;return new Date(date.getFullYear(),date.getMonth()+k,date.getDate())}for(var i=0;i<$scope.viewMonths;i++){var d=getdate(i),btnBack=!1,btnForward=!1;0===i&&(btnBack=!0),i===$scope.viewMonths-1&&(btnForward=!0),$scope.months[i]={formatMonth:formatMonth(d,{after:$scope.afterLabelValue,before:$scope.beforeLabelValue,maxDate:$scope.maxDate,minDate:$scope.minDate}),value:d.getTime(),btnBack:btnBack,btnForward:btnForward}}}function listen(e){var val=!1;angular.forEach($element.find("*"),function(el){return el==e.target?void(val=!0):void 0}),val||($scope.show=!1,$scope.$apply())}function cleanup(){window.document.removeEventListener("click",listen)}var link="true"==$scope.link?!0:!1;$scope.viewMonths=parseFloat($scope.viewMonths)||3,$scope.formatDate=$scope.formatDate||"yyyy.MM.dd",this.startWeek=$scope.startWeek,$scope.show=!1,$scope.constantCalendar=constantCalendar,$scope.months=[],$scope.beforeLabelValue=$scope.before,$scope.afterLabelValue=$scope.after;var currentViewDate=new Date($scope.afterLabelValue.getTime()+($scope.beforeLabelValue.getTime()-$scope.afterLabelValue.getTime())/2);$scope.includeMonths="module/partials/container-months.html",render(currentViewDate),$scope.stepBack=function(){var date=new Date(currentViewDate.getFullYear(),currentViewDate.getMonth()-1,currentViewDate.getDate());currentViewDate=date,render(date)},$scope.stepForward=function(){var date=new Date(currentViewDate.getFullYear(),currentViewDate.getMonth()+1,currentViewDate.getDate());currentViewDate=date,render(date)},$scope.selectEvent=function(day){day&&!day.blocked&&($scope.beforeLabelValue.getTime()<day.value?($scope.beforeLabelValue=new Date(day.value),link&&($scope.before=$scope.beforeLabelValue)):day.value<$scope.afterLabelValue.getTime()?($scope.afterLabelValue=new Date(day.value),link&&($scope.after=$scope.afterLabelValue)):($scope.afterLabelValue=new Date(day.value),$scope.beforeLabelValue=new Date(day.value),link&&($scope.before=$scope.beforeLabelValue,$scope.after=$scope.afterLabelValue)))},$scope.apply=function(){$scope.before=$scope.beforeLabelValue,$scope.after=$scope.afterLabelValue,$scope.click()},$scope.$watch("before",function(val){val!=$scope.beforeLabelValue&&($scope.beforeLabelValue=val),render(currentViewDate)}),$scope.$watch("after",function(val){val!=$scope.afterLabelValue&&($scope.afterLabelValue=val),render(currentViewDate)}),$scope.$watchCollection("[beforeLabelValue,afterLabelValue,maxDate, minDate]",function(){render(currentViewDate)}),$scope.$watch("show",function(val){val?window.document.addEventListener("click",listen):($scope.beforeLabelValue=$scope.before,$scope.afterLabelValue=$scope.after,window.document.removeEventListener("click",listen))}),$scope.$on("$destroy",function(){console.log("destroy"),cleanup()})}],link:function($scope,$element){function init(){var linkFn=$compile($templateCache.get("module/partials/calendar-view.html"));$scope.content=content=linkFn($scope),content.css("display","none"),$element.append(content),$timeout(function(){$scope.show=!0,content.css("display","inherit")},1)}var content=null;$scope.show=!1,$scope.content,$scope.click=function(){return content?void($scope.show=!$scope.show):void init()}}}}]),calendarModule.directive("daysweek",["$compile","constantCalendar",function($compile,constantCalendar){return{restrict:"E",replace:!0,scope:{},require:"^calendar",templateUrl:"module/partials/calendar-days.html",link:function($scope,$element,$attr,$contrl){$scope.constantCalendar=constantCalendar,console.log($contrl.startWeek)},controller:["$scope",function(){}]}}]),angular.module("calendarModule").factory("factoryOffset",function(){function getOffset(elem){return elem.getBoundingClientRect?getOffsetRect(elem):getOffsetSum(elem)}function getOffsetSum(elem){for(var top=0,left=0;elem;)top+=parseInt(elem.offsetTop),left+=parseInt(elem.offsetLeft),elem=elem.offsetParent;return{top:top,left:left}}function getOffsetRect(elem){var box=elem.getBoundingClientRect(),body=document.body,docElem=document.documentElement,scrollTop=window.pageYOffset||docElem.scrollTop||body.scrollTop,scrollLeft=window.pageXOffset||docElem.scrollLeft||body.scrollLeft,clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,top=box.top+scrollTop-clientTop,left=box.left+scrollLeft-clientLeft;return{top:Math.round(top),left:Math.round(left)}}return{getOffset:getOffset}}),angular.module("calendarModule").run(["$templateCache",function($templateCache){"use strict";$templateCache.put("module/partials/calendar-days.html",'<div class="row days"><div class="col-day text-right" ng-repeat="days in constantCalendar.days track by $index"><span ng-switch="$index"><span ng-switch-when="6" class="red">{{days}}</span> <span ng-switch-when="5" class="red">{{days}}</span> <span ng-switch-default>{{days}}</span></span></div></div>'),$templateCache.put("module/partials/calendar-label.html",'<div class="calendar-label"><div class="calendar-label-btn" ng-class="show && \'open\'">{{after | date:\'dd MMM\'}} - {{before | date:\'dd MMM\'}} {{before | date:\'yyyy\'}}</div><div class="calendar-label-ico" ng-click="click()"><div class="ico-calendar">&nbsp;</div></div></div>'),$templateCache.put("module/partials/calendar-view.html",'<div ng-show="show" class="calendar-view"><div class="container-months"><div ng-include="includeMonths"></div></div><div class="info-block"><div class="info-label"><div class="col-4"><div class="info-label-value">{{ after | date:formatDate }}</div></div><div class="col-4"><div class="info-label-value">{{ before | date:formatDate }}</div></div><div class="col-4"><div class="button" ng-click="apply()">Применить</div></div></div></div></div>'),$templateCache.put("module/partials/container-months.html",'<table><tr><td ng-repeat="month in months track by $index"><div class="block-month"><daysweek></daysweek><div class="border-line"><div class="btn-back" ng-click="stepBack()" ng-if="month.btnBack">&#8249;</div><div class="btn-forward" ng-click="stepForward()" ng-if="month.btnForward">&#8250;</div></div><div class="row name-month">{{month.value | date:\'MMMM yyyy\'}}</div><div class="numeric"><div class="row" ng-repeat="week in month.formatMonth track by $index"><div class="col-day text-right {{day.class}}" ng-repeat="day in month.formatMonth[$index] track by $index" ng-click="selectEvent(day)"><span ng-switch="$index"><span ng-switch-when="6" class="red">{{day.value | date:\'d\'}}</span> <span ng-switch-when="5" class="red">{{day.value | date:\'d\'}}</span> <span ng-switch-default>{{day.value | date:\'d\'}}</span></span></div></div></div></div></td></tr></table>')}]);
//# sourceMappingURL=calendar.js.map