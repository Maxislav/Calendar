angular.module('calendarModule').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('module/partials/calendar-days.html',
    "<div class=\"row days\"><div class=\"col-day text-right\" ng-repeat=\"days in constantCalendar.days track by $index\"><span ng-switch=\"$index\"><span ng-switch-when=\"6\" class=\"red\">{{days}}</span> <span ng-switch-when=\"5\" class=\"red\">{{days}}</span> <span ng-switch-default>{{days}}</span></span></div></div>"
  );


  $templateCache.put('module/partials/calendar-label.html',
    "<div class=\"calendar-label\"><div class=\"calendar-label-btn\" ng-class=\"show && 'open'\">{{after | date:'dd MMM'}} - {{beforeLabelValue | date:'dd MMM'}} {{before | date:'yyyy'}}</div><div class=\"calendar-label-ico\" ng-click=\"click()\"><div class=\"ico-calendar\">&nbsp;</div></div></div>"
  );


  $templateCache.put('module/partials/calendar-view.html',
    "<div ng-show=\"show\" class=\"calendar-view\"><div class=\"container-months\"><div ng-include=\"includeMonths\"></div></div><div class=\"info-block\"><div class=\"info-label\"><div class=\"\"><div class=\"info-label-value\">{{ after | date:'yyyy.MM.dd' }}</div></div><div><div class=\"info-label-value\">{{ before | date:'yyyy.MM.dd' }}</div></div><div><div class=\"button\" ng-click=\"apply()\">Сегодня</div></div></div></div></div>"
  );


  $templateCache.put('module/partials/container-months.html',
    "<table><tr><td><!--текущий--><div class=\"block-month\"><daysweek></daysweek><div class=\"border-line\"><div class=\"btn-back\" ng-click=\"stepBack()\">&#8249;</div><div class=\"btn-forward\" ng-click=\"stepForward()\">&#8250;</div></div><div class=\"row name-month\">{{arrMonth.value | date:'MMMM yyyy'}}</div><div class=\"numeric\"><div class=\"row\" ng-repeat=\"week in arrMonth track by $index\"><div class=\"col-day text-right {{day.class}}\" ng-repeat=\"day in arrMonth[$index] track by $index\" ng-click=\"selectEvent(day)\"><span ng-switch=\"$index\"><span ng-switch-when=\"6\" class=\"red\">{{day.value | date:'d'}}</span> <span ng-switch-when=\"5\" class=\"red\">{{day.value | date:'d'}}</span> <span ng-switch-default>{{day.value | date:'d'}}</span></span></div></div></div></div></td></tr></table>"
  );

}]);
