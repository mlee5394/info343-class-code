/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/
// when the DOM content has been loaded...
$(function() {
    'use strict';
    $('a').attr('target', '_blank');
    $('article').hide().fadeIn(100).fadeOut(100).fadeIn(500);

    $('#toggle-article').click(function() {
       //$('article').slideToggle(1500);
        $('article').text('You clicked');
    });

    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f'
    $.getJSON(url)
        .then(function(data) {
            // console.log(data);
            // this following code puts the current temperature and updates it with the data given
            var temperature = data.main.temp;
            $('#temp').text(Math.round(temperature));
    });

});