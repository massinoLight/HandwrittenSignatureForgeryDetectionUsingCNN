/*

*/

const fs = require('fs');

$.pressureConfig({
  polyfill: false
});
var startTime;
var block = {
  start: function(event) {
    startTime = new Date().getTime();
    console.log('start signature', event);


  },

 change: function(force, event) {
     //event.preventDefault();
     var endTime = new Date().getTime();




    console.log('X', event.clientX,'Y', event.clientY,'Pression', force,(endTime-startTime),'ms');


  },

  /*startDeepPress: function(event) {
    console.log('start deep press', event);

  },

  endDeepPress: function() {
    console.log('end deep press');

  },

  end: function() {
    console.log('end');

  },*/

  unsupported: function() {
    console.log(this);

  }
}

Pressure.set(document.querySelectorAll('#el1'), block);
/*Pressure.set(document.querySelectorAll('#el2'), block, {only: 'mouse'});
Pressure.set($('#el3'), block, {only: 'touch'});
Pressure.set('#el4', block, {only: 'pointer'});*/

$('#el1-jquery').pressure(block);
/*$('#el2-jquery').pressure(block, {only: 'mouse'});
$('#el3-jquery').pressure(block, {only: 'touch'});
$('#el4-jquery').pressure(block, {only: 'pointer'});*/

