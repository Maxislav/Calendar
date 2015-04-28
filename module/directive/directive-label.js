angular
    .module('calendarModule')
    .directive('labelTemplate', ['$templateCache', 'calendarSettings', 'serviceDaysWeek', function ($templateCache, calendarSettings, serviceDaysWeek) {
        return {
            restrict: 'C',
            template: calendarSettings.config.labelTemlate || $templateCache.get('module/partials/calendar-label-template.html')
        }
    }])
    .directive('labelTemplateExact', ['$templateCache', 'calendarSettings', 'serviceDaysWeek', function ($templateCache, calendarSettings, serviceDaysWeek) {
        return {
            restrict: 'C',
            template: $templateCache.get('module/partials/calendar-label-template-exact.html')
        }
    }]);
