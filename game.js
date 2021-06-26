// array

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedpattern = [];
var level = 0;
var start = false;

// nextsequence


function nextsequence() {

  userClickedpattern = [];

  level++;
  $("h1").text("level " + level);
  gamePattern.push(buttonColors[Math.floor(Math.random() * (3 - 0 + 1)) + 0]);
  $("#" + buttonColors[Math.floor(Math.random() * (3 - 0 + 1)) + 0]).fadeOut(200).fadeIn(200);
  playsound(buttonColors[Math.floor(Math.random() * (3 - 0 + 1)) + 0]);

}

// sounds position


function playsound(event) {
  var audio = new Audio("sounds/" + event + ".mp3");
  audio.play();
}

$(".btn").click(function() {
var choosencolor = $(this).attr("id");
  userClickedpattern.push(choosencolor);

  animatePress(choosencolor);

  playsound(choosencolor);

  checkAnswer(userClickedpattern.length-1);


});


// animate
function animatePress(animation) {
  $("#" + animation).addClass("pressed");
  setTimeout(function() {
    $("#" + animation).removeClass("pressed");

  }, 100);

}

// level grading
$(document).keypress(function() {
  if (!start) {

    $("h1").text("level " + level);


    nextsequence();

    start = true;
  }

});

// check answer

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] ===userClickedpattern[currentLevel]) {
    if (userClickedpattern.length === gamePattern.length) {
      setTimeout(function() {
        nextsequence();
      }, 1000);
    }
  }
  else {
    playsound("wrong");
    $("body").addClass("game-over");
    $("h1").text("game over , press any key to restart");
    setTimeout(function() {
      $("body").removeClass("game-over");

    }, 200);
    startover();
  }
}


// restart
function startover() {
  level = 0;
  gamePattern = [];
  start = false;
}
