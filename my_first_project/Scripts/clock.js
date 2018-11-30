﻿var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var radius = canvas.height / 2;

ctx.translate(radius, radius);
radius = radius * 0.90;

// Global Time Variables
var now;
var hour = 0;


setInterval(function () {
    date = new Date();


    date.setHours(date.getHours() + $("#map").data("timezonePicker").getValue()[0].offset);
    if (Number.isInteger($("#map").data("timezonePicker").getValue()[0].offset)) {
        date.setMinutes(date.getMinutes() + 0);
    }
    else if (Number.isInteger($("#map").data("timezonePicker").getValue()[0].offset * 2 )) {
        date.setMinutes(date.getMinutes() + 30);
    }
    else {
        date.setMinutes(date.getMinutes() + 45);
    }

    drawClock(date);
}, 1000);
    
$('#map').timezonePicker({ defaultValue: { value: "Europe/London", attribute: "timezone" } });


function drawClock(date) {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius, date);
}

function drawFace() {
    var grad;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
};

function drawTime(ctx, radius, date) {
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawRedHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawRedHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = "#ff0000";
    ctx.stroke();
    ctx.rotate(-pos);
}

// map
// console.logs array of objects of the selected timezone
    $("#map").on("map:country:clicked", function () {
        console.log($("#map").data('timezonePicker').getValue()[0].offset);
        pop = $("#map").data("timezonePicker").getValue()[0].offset;
        return pop;
    });

console.log($("#map").data("timezonePicker").getValue());