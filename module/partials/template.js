angular.module('calendarModule').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('module/partials/calendar-label.html',
    "<div class=\"calendar-label\"><div class=\"calendar-label-btn\">Дата</div><div class=\"calendar-label-ico\" ng-click=\"click()\"><div class=\"ico-calendar\">&nbsp;</div></div></div>"
  );


  $templateCache.put('module/partials/calendar-view.html',
    "<div ng-show=\"show\" class=\"calendar-view\"><div class=\"container-months\"><div class=\"block-month\"></div><div class=\"block-month\"></div><div class=\"block-month\"></div></div><div></div></div>"
  );

}]);
