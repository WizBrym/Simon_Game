// Creating a new array called buttonColours.
var buttonColours = ["red", "blue", "green", "yellow"];

// Creating a new empty array called gamePattern.
var gamePattern = [];

// Creating a new empty array called gamePattern.
var userClickedPattern = [];

var started = false
var level = 0;

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  };

  console.log(started);
});

// Creating a new function called nextSequence()
function nextSequence() {

  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // increase the level by 1 every time nextSequence() is called, Inside nextSequence().
  level++;

  // updating the h1 with this change in the value of level,Inside nextSequence().
  $("#level-title").text("Level " + level);

  var randomNumb = Math.floor(Math.random() * 4); //generating a new random number between 0 and 3,
  var randomChosenColour = buttonColours[randomNumb];
  gamePattern.push(randomChosenColour);

  // selecting button using the randomChosenColour to get the Id selector and then create animation.
  $("#" + randomChosenColour).fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);

  // using randomChosenColour as input for playSound() to playb the simonSound
  playSound(randomChosenColour);
  console.log(randomChosenColour);
};

$("body").on("click", function(event) {
  var userChosenColour = (event.target.id);
  userClickedPattern.push(userChosenColour);
  animatePress(event.target);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);

  // using userChosenColour (i.e when user Clicks the button ) as input for playSound() to play the simonSound
  playSound(userChosenColour);
  console.log(userChosenColour);
})

// To play the simonSound in respect to the colour choosen
function playSound(name) {
  var simonSound = new Audio("sounds/" + name + ".mp3");
  simonSound.play();
}

// Addind Animations to User Clicks
function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function() {
    $(currentColour).removeClass("pressed");
  }, 100);
};

// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    };

  } else {
    // play the wrong.mp3 sound when the user get the sequence wrong.
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    //"game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    // indicate when the user is wrong i.e Game over
    $("#level-title").text("You Go Collect OO , Press Any Key to Restart")
    console.log("wrong");

    //Call startOver() if the user gets the sequence wrong.
    startOver();
  };
};


//Inside this function, Reset the values of level, gamePattern, started.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
};
