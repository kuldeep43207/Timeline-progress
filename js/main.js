$('#menu-action').click(function() {
  $('.sidebar').toggleClass('siderbar-shrink');
  $('.sidebarToggler').toggleClass('sidebarToggler-shrink');
  $(".sidebarToggler .icon-left").toggleClass('icon-right');
  $("#main").toggleClass('main-active');
  $("#header").toggleClass('header-shrinked');
});

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});

$(document).ready(function(){
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 400);
      return false;
    });
  });


$('.all-devices-wrapper').hover(
 function(){ $(".view-detail", this).addClass('hover-btn') },
 function(){ $(".view-detail", this).removeClass('hover-btn') }
);

setInterval(function(){ 
   // toggle the class every five second
   $('.fa-battery-three-quarters').toggleClass('fa-battery-empty');  
   setTimeout(function(){
     // toggle back after 1 second
     $('.fa-battery-empty').toggleClass('fa-battery-three-quarters');  
   },1000);

},1000);

/*********************Counter**********************/

(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};
    
    return $(this).each(function () {
      // set options for current element
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from:            $(this).data('from'),
        to:              $(this).data('to'),
        speed:           $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals:        $(this).data('decimals')
      }, options);
      
      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;
      
      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};
      
      $self.data('countTo', data);
      
      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);
      
      // initialize the element with the starting value
      render(value);
      
      function updateTimer() {
        value += increment;
        loopCount++;
        
        render(value);
        
        if (typeof(settings.onUpdate) == 'function') {
          settings.onUpdate.call(self, value);
        }
        
        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;
          
          if (typeof(settings.onComplete) == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }
      
      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };
  
  $.fn.countTo.defaults = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };
  
  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
  formatter: function (value, options) {
    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
  var $this = $(this);
  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  $this.countTo(options);
  }
}); 


/*-----------------Charts-------------------*/
window.onload = function() {

var optionsTemp = {
  animationEnabled: true,  
  axisX: {
    valueFormatString: "MMM"
  },
  axisY: {
    
    prefix: "Deg",
    includeZero: false
  },
  data: [{
    yValueFormatString: "#,###",
    xValueFormatString: "MMMM",
    type: "spline",
    dataPoints: [
      { x: new Date(2017, 0), y: 23 },
      { x: new Date(2017, 1), y: 20 },
      { x: new Date(2017, 2), y: 23 },
      { x: new Date(2017, 3), y: 20 },
      { x: new Date(2017, 4), y: 24 },
      { x: new Date(2017, 5), y: 24 },
      { x: new Date(2017, 6), y: 21 },
      { x: new Date(2017, 7), y: 20 },
      { x: new Date(2017, 8), y: 23 },
      { x: new Date(2017, 9), y: 22 },
      { x: new Date(2017, 10), y: 20 },
      { x: new Date(2017, 11), y: 20 }
    ]
  }]
};
$("#chartContainerNew").CanvasJSChart(optionsTemp);


var optionsBin = {
  data: [{
      type: "pie",
      startAngle: 45,
      showInLegend: "true",
      legendText: "{label}",
      indexLabel: "{label} ({y})",
      yValueFormatString:"#,##0.#"%"",
      dataPoints: [
        { label: "Total Bins", y: 55 },
        { label: "Empty Bins", y: 31 },
        { label: "Filled Bins", y: 7 },
        { label: "Active Bins", y: 10 },
        { label: "Inactive Bins", y: 7 },
      ]
  }]
};
$("#chartContainerBin").CanvasJSChart(optionsBin);

var optionsBattery = {
  data: [{
      type: "pie",
      startAngle: 45,
      showInLegend: "true",
      legendText: "{label}",
      indexLabel: "{label} ({y})",
      yValueFormatString:"#,##0.#"%"",
      dataPoints: [
        { label: "Full", y: 55 },
        { label: "Empty Bins", y: 5 },
        { label: "Medium", y: 20 },
        { label: "High", y: 12 },
        { label: "Low", y: 18 },
      ]
  }]
};
$("#chartContainerBattery").CanvasJSChart(optionsBattery);

}
/*-----------------Charts-------------------*/ 