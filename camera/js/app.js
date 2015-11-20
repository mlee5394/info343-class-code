
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    navigator.getUserMedia = navigator.getUserMedia ||
                                navigator.webkitGetUserMedia ||
                                navigator.mozGetUserMedia ||
                                navigator.msGetUserMedia;

    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var videoStream;
    var mouseIsDown = false;

    // takes two properties:
    // video request
    //streams the video
    navigator.getUserMedia({video: true}, function(stream) {
        //grab the stream
        videoStream = stream;
        video.src = window.URL.createObjectURL(stream);
    }, function(err) {
        console.error(err);
    });

    video.addEventListener('click', function() {
        if (videoStream) {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            // finds the source uses video element as its source to draw the image
            ctx.drawImage(video, 0, 0);
        }
    });

    canvas.addEventListener('mousedown', function(evt) {
        var x = evt.clientX - canvas.offsetLeft;
        var y = evt.clientY - canvas.offsetTop + window.scrollY;
        ctx.beginPath();
        ctx.moveTo(x, y);
        mouseIsDown = true;
    });

    canvas.addEventListener('mousemove', function(evt) {
        var x = evt.clientX - canvas.offsetLeft;
        var y = evt.clientY - canvas.offsetTop + window.scrollY;

        if (mouseIsDown) {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function(evt) {
        mouseIsDown = false;

    });

    var snapshot = document.querySelector('img');
    document.querySelector('#btnSnapshot').addEventListener('click', function() {
        snapshot.src = canvas.toDataURL();
    });

    //allows you to draw
    var mouseDown = false;

    canvas.addEventListener('mousedown', function(evt) {
        ctx.beginPath();
        var canvasY = evt.clientY - canvas.offsetTop;
        var canvasX = evt.clientX - canvas.offsetLeft;
        ctx.moveTo(canvasX, canvasY);
        mouseDown = true;
    });

    canvas.addEventListener('mouseup', function(evt) {
        var canvasX = evt.clientX - canvas.offsetLeft;
        var canvasY = evt.clientY - canvas.offsetTop;
        ctx.lineTo(canvasX, canvasY);
        ctx.stroke();
        mouseDown = false;
    });

    canvas.addEventListener('mousemove', function(evt) {
        if (mouseDown) {
            var canvasX = evt.clientX - canvas.offsetLeft;
            var canvasY = evt.clientY - canvas.offsetTop;
            ctx.lineTo(canvasX, canvasY);
            ctx.stroke();
        }

        var color = document.getElementById('line-color-inp').value;
        ctx.strokeStyle = color;

        var width = document.getElementById('line-width').value;
        ctx.lineWidth = width;

        var join = document.getElementById('join-style').value;
        ctx.lineJoin = join;

        var cap = document.getElementById('end-cap').value;
        ctx.lineCap = cap;
    });

});

