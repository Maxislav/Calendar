angular
    .module('calendarModule')
    .factory('calendarSettings', function(){
        var params = {
            config: {
                labelTemlate: "{{after | date:'dd MMM'}} - {{before | date:'dd MMM'}} {{before | date:'yy'}}"
            }
        }
        return params
    });