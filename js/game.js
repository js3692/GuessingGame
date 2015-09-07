// Guessing Game
// by Jungho Son
// September 2015

var number = Math.floor(Math.random() * 100) + 1;
var guess = -1;
var counter = 5;
var userGuess = [];

function isValid (num) {
	return (num % 1 === 0) && (num >= 1) && (num <= 100) && !(duplicate(userGuess, num))
}

function duplicate (array, num) {
	var exists = false;

	for (var i = 0; i < array.length; i++) {
		if (array[i] == num) {
			exists = true;
		}
	}

	return exists;
}

$(document).ready(function() {
	$('#getHint').on('click', function() {
		$('#answer').text(number);
		$('#answer').fadeToggle(100);
	});
	$('#restart').on('click', function() {
		reset();
	});
	$('form').submit(function(event) {
		event.preventDefault();
		if (isValid(+$('input:first').val())){
			guess = +$('input:first').val();
			$('input:first').val("");

			addGuess(guess, counter);
			counter--;

			if (counter > 0) {
				guessStatus(guess, counter);	
			} else {
				$('.guess-round').text("(" + counter + "/5) remaining");
				endGame();
			}			
			return;
		}

		alert("Please enter a new integer between 1 and 100.");
		$('input:first').val("");
	});
});

function guessStatus (current, round) {
	var flag = true;

	if (current > number) {
		$('.guess-range').text("Guess lower");
	} else if (current < number) {
		$('.guess-range').text("Guess higher");
	} else {
		endGame();
		flag = false;
	}

	if (flag) {
		if (round == 4) {
			if (Math.abs(current-number) < 6) {
				$('.guess-proximity').text("Hot");
			} else if (Math.abs(current-number) < 100) {
				$('.guess-proximity').text("Cold");
			} 	
		} else if (round <= 3) {
			if (Math.abs(current-number) > Math.abs(userGuess[userGuess.length-2]-number)) {
				$('.guess-proximity').text("Colder");
			} else if (Math.abs(current-number) < Math.abs(userGuess[userGuess.length-2]-number)) {
				$('.guess-proximity').text("Hotter");
			}
		}
		
	}
	

	$('.guess-round').text("(" + counter + "/5) remaining");
}

function addGuess (num, round) {
	userGuess.push(num);
	if (round == 5) {
		$('.user-guesses').append(num);
	} else {
		$('.user-guesses').append("------" + num);
	}
	
}

function endGame() {
	if (guess == number) {
		alert("Win!");
	} else {
		alert("Game Over!");
	}

	reset();
}

function reset() {
	number = Math.floor(Math.random() * 100) + 1;
	guess = -1;
	counter = 5;
	userGuess = [];

	$('#answer').text(number);
	$('.guess-range').text("");
	$('.guess-proximity').text("");
	$('.guess-round').text("(" + counter + "/5) remaining");
	$('#answer').text(number);
	$('.user-guesses').text("");
}
