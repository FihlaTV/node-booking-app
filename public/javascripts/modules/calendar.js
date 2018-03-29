/* var jsCalendar = require('js-calendar');
var jsCal = new jsCalendar.Generator({
  weekStart: 0
});
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var currentYear = new Date().getFullYear();
var input = document.querySelector('input');
var buttons = document.querySelectorAll('button');
var target = document.querySelector('#calendar');

// mount HTML
buttons[0].addEventListener('click', function() {
  target.innerHTML = '';
  var year = parseInt(input.value, 10) || currentYear;
  for (var i = 0; i < 12; i++) {
    var div = document.createElement('div');
    var month = monthNames[i];
    var monthDiv = document.createElement('div');
    monthDiv.className = 'month';
    monthDiv.innerHTML = month + ' - ' + year;
    div.appendChild(monthDiv);
    jsCal(year, i, jsCalendar.addLabels).cells.forEach(function(cell, c) {
      var cellDiv = document.createElement('div');
      // add classes from "addLabels" plugin
      cellDiv.className = cell.class.join(' ');
      // add day number or 3 character long weekday label
      cellDiv.innerHTML = typeof cell.desc == 'string' ? cell.desc.slice(0, 3) : cell.desc;
      div.appendChild(cellDiv);
    });
    target.appendChild(div);
  }
});
buttons[0].click();

// new year inserted
input.addEventListener('change', function() {
  currentYear = Number(this.value);
  buttons[0].click();
});

function changeYear(direction) {
  return function() {
    currentYear += direction;
    input.value = currentYear;
    buttons[0].click();
  }
}
buttons[1].addEventListener('click', changeYear(-1));
buttons[2].addEventListener('click', changeYear(1));
 */

import moment from 'moment';
import $ from 'jquery';
import daterangepicker from 'daterangepicker';
import 'fullcalendar';

const heading = "<h1>Hello</h1>";
$('#dashboard').append(heading);

/* const picker = datepicker(document.querySelector('#calendar'), {
  position: 'bl', // Top right.
  startDate: new Date(), // This month.
  startDay: 1, // Calendar week starts on a Monday.
  dateSelected: new Date(), // Today is selected.
  minDate: new Date(2016, 1, 6), // June 1st, 2016.
  maxDate: new Date(2099, 0, 1), // Jan 1st, 2099.
  noWeekends: false, // Weekends will be unselectable.
  formatter: function(el, date) {
    // This will display the date as `1/1/2017`.
    el.value = date.toDateString();
  },
  onSelect: function(instance) {
    // Show which date was selected.
    console.log(instance.dateSelected);
  },
  onShow: function(instance) {
    console.log(this);
  },
  onHide: function(instance) {
    console.log('Calendar hidden.');
  },
  onMonthChange: function(instance) {
    // Show the month of the selected date.
    console.log(instance.currentMonthName);
  },
  customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
  customDays: ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'],
  overlayPlaceholder: 'Enter a 4-digit year',
  overlayButton: 'Go!',
  disableMobile: true // Conditionally disabled on mobile devices.
});

export { picker }; */


$('#cal').daterangepicker({
  "showDropdowns": true,
  "showWeekNumbers": true,
  "showISOWeekNumbers": true,
  "singleDatePicker": true,
  "dateLimit": {
    "days": 30
  },
  "parentEl": "#calendar",
  "locale": {
    "format": "YYYY-MM-DD"
  },
  "startDate": new Date(),
  "minDate": new Date(),
  "maxDate": "12/31/2099"
}, function(start) {
      let date = start.format('YYYY-MM-DD');
      $("#calc").val(date);
      console.log('New date selected: ' + start.format('DD-MM-YYYY'));
});

$('#booking').fullCalendar({
  dayClick: function() {
    fetch('/api/calendar')
      .then(response => response.json())
      .then(data => ({
        data: data,
        status: data.status
      }))
      .then(res => {
        (res.data[0].slots)
      })
  },
  eventSources: [

    // your event source
    {
      url: '/api/calendar', // use the `url` property
      color: 'yellow',    // an option!
      textColor: 'black',  // an option!
    }
  
    // any other sources...

  ],
  events: [
    {
      title  : 'event1',
      start  : '2018-03-01'
    },
    {
      title  : 'event3',
      start  : '2018-03-09T12:30:00',
      allDay : false // will make the time show
    }
  ],
  // Highlight day field in calendar if there's events on that day
  eventRender: function (event, element, view) { 
    var dateString = moment(event.start).format('YYYY-MM-DD');
    $('#booking').find('.fc-day[data-date="' + dateString + '"]').css('background-color', '#FAA732');
  }
})







