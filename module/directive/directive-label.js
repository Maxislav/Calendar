angular
    .module('calendarModule')
    .directive('labelTemplate',['$templateCache','calendarSettings',function($templateCache, calendarSettings){
        return {
            restrict: 'C',
            template: calendarSettings.config.labelTemlate || $templateCache.get('module/partials/calendar-label-template.html')
        }
    }])
