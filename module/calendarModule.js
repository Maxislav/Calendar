var calendarModule =
	angular.module('calendarModule', [])
		.constant('constantCalendar', {
			days: ['П', 'B', 'C', 'Ч', 'П', 'С', 'B'],
			month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
		})
