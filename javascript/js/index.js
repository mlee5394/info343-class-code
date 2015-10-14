/**
 * application script for index.html
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict'; // they made it into a string b/c IE8 would silently ignored it.

    function forEachElement(collection, fn) {
        var num;
        for(num = 0; num < collection.length; num++) {
            fn(collection[num]);
        }
    }


    var clickMeButton = document.getElementById("click-me");
    clickMeButton.addEventListener('click', function() {
        var alerts = document.querySelectorAll('.alert');
        forEachElement(alerts,function(alert) {
            alert.style.display = 'block';
        });
    });

    var closeButtons = document.querySelectorAll('.alert .close');
    //var idx;
    //var closeButton;
    // declare variables outside of for blocks
    //for(idx = 0; idx < closeButtons.length; idx++) {
    //    closeButton = closeButtons[idx];
    //    closeButton.addEventListener('click', function() {
    //        this.parentElement.style.display = 'none';
    //    });
    //}
    // above is the same as:
    forEachElement(closeButtons, function(button) {
        button.addEventListener('click', function() {
            button.parentElement.style.display = 'none';
        });
    });



});