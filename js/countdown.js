
var countDownDate = new Date("April 28, 2018 00:00:00").getTime();

function initialTime() {

  var now = new Date().getTime();

  var timeToGo = countDownDate - now;

  var days = Math.floor(timeToGo / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeToGo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeToGo % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeToGo % (1000 * 60)) / 1000);

  document.getElementById("dayCircle").innerHTML = days;
  document.getElementById("hourCircle").innerHTML = hours;
  document.getElementById("minCircle").innerHTML = minutes;
  document.getElementById("secCircle").innerHTML = seconds;
}

initialTime();
var interval = setInterval(initialTime, 1000);
