/*

		Treehouse techdegree project 4

		TIC TAC TOE

		All code contained in this JS file is the work of me, Jeremy Bowden
		email: jeremy@jeremybowden.net

*/

// initial set-up; create the start screen and the winner screen, and hide all the screens
function setUp() {
	const divBoard = document.getElementById("board"); // create variable for the Board div (main game board screen)
	divBoard.style.display = "none"; // hide it initially
	const divBody = divBoard.parentNode;
	divBody.id = ("body");
	const divStart = document.createElement("div"); // create element for the Start page div
	divStart.classList.add("screen", "screen-start"); // give it some classes
	divStart.id = ("start"); // and give it an id
	divBody.insertBefore(divStart, divBoard); // insert the Start page div into the <body> element before the Board div

	// inject html content into the Start Screen main div
	let startScreenHTML =
		"<header>" +
		"<h1> Tic Tac Toe</h1>" +
		"<a href='#' class='button' id='startButton'>Start game</a>" +
		"</header >";
	divStart.innerHTML = startScreenHTML;

	const divWinner = document.createElement("div"); // create element for the Winner page div
	divWinner.classList.add("screen", "screen-win"); // add classes
	divWinner.id = ("winner"); // and an id
	divBody.insertBefore(divWinner, divBoard); // and insert it into the DOM

	let winnerScreenHTML =
		"<header>" +
		"<h1>Tic Tac Toe</h1>" +
		"<p class='message'></p>" +
		"<a href='#' class='button' id='newGameButton'>New game</a>" +
		"</header>";
	divWinner.innerHTML = winnerScreenHTML;

	// call the function to show the start screem
	showStartScreen();
}

function showStartScreen() {
	hideAllThreeMainDivScreens();
	document.getElementById("start").style.display = "";
	const startButton = document.getElementById("startButton");
	startButton.addEventListener("click", showBoardScreen, false);
}

function showBoardScreen() {
	// function to update the gameboard screen headers depending on whose turn it is (player 1 or player 2)
	function updateHeaders(player) {
		if (player === 1) {
			document.getElementById("player1").classList.add("active");
			document.getElementById("player2").classList.remove("active");
		} else {
			document.getElementById("player2").classList.add("active");
			document.getElementById("player1").classList.remove("active");
		}
	}

	function showTilePreview(player) {
		if (player === 1) {
			event.target.style.backgroundImage = "url(img/o.svg)";
		} else {
			event.target.style.backgroundImage = "url(img/x.svg)";
		}
	}

	function selectTile(player) {
		if (player === 1) {
			event.target.classList.add("box-filled-1"); // changes the display of the tile per player1 colour
		} else {
			event.target.classList.add("box-filled-2"); // changes the display of the tile per player2 colour
		}
	}

	// function to invoke when it is the next player's turn
	function turn(player) {
		if (player === 1) {
			player = 2;
		} else {
			player = 1;
		}
		updateHeaders(player);
		playerChooseTile(player);
	}

	function playerChooseTile(player) {
		// event listener for when any part of the whole board is moused over
		boardUL.addEventListener("mouseover", mousedOver, false);
		function mousedOver(event) {
			if (!event.target.classList.contains("box-filled-1") && !event.target.classList.contains("box-filled-2")) {
				showTilePreview(player);
			}
		}

		// event listener for when any part of the whole board is moused out
		boardUL.addEventListener("mouseout", mousedOut, false);
		function mousedOut(event) {
			event.target.style.backgroundImage = "";
		}

		// event listener for when a tile is clicked on
		boardUL.addEventListener("click", clickedOn, false);
		function clickedOn(event) {
			if (!event.target.classList.contains("box-filled-1") && !event.target.classList.contains("box-filled-2")) {
				boardUL.removeEventListener("mouseover", mousedOver, false);
				boardUL.removeEventListener("mouseout", mousedOut, false);
				boardUL.removeEventListener("click", clickedOn, false);
				selectTile(player);
				const winner = checkForWinner(player, boardUL);
				if (winner) {
					let timeoutID = window.setTimeout(showWinnerScreen, 1500, winner); // delay for 2 seconds for effect
				} else {
					turn(player);
				}
			}
		}
	}

	function checkForWinner(player, boardUL) {
		// variable to store the class name that we are going to be searching for
		let playerClass = "box-filled-1"; // if player === 1
		if (player === 2) {
			playerClass = "box-filled-2"; // if player === 2
		}
		//const allBoardLIs = boardUL.getElementsByTagName("li"); // array of all the tile <li> elements
		const board = []; // array in which to store true or false values for each tile depending on whether the tile "belongs" to the current player
		for (let i = 0; i < 9; i++) {
			if (allBoardLIs[i].classList.contains(playerClass)) {
				board[i] = true;
			} else {
				board[i] = false;
			}
		}

		// check for all 8 possible winning combinations and return if the current player is a winner
		if ((board[0] && board[1] && board[2]) || (board[3] && board[4] && board[5]) ||
			(board[6] && board[7] && board[8]) || (board[0] && board[3] && board[6]) ||
			(board[1] && board[4] && board[7]) || (board[2] && board[5] && board[8]) ||
			(board[0] && board[4] && board[8]) || (board[2] && board[4] && board[6])) {
			return player;
		}
		// check for a tie by counting how many "true" elements are in the board array if there
		// are 5 then player 1 must have had 5 turns, and there is no winner, so it must be a tie
		if (board.filter(item => item === true).length === 5) {
			return 3; // "player 3" is a tie
		}


	}

	// local variables for the showBoardScreen function
	const boardUL = document.querySelector(".boxes"); // var for the whole board
	const allBoardLIs = boardUL.getElementsByTagName("li"); // array of all the tile <li> elements
	// reset the board tiles
	for (let j = 0; j < 9; j++) {
		allBoardLIs[j].classList.remove("box-filled-1");
		allBoardLIs[j].classList.remove("box-filled-2");
		allBoardLIs[j].style.backgroundImage = "";
	}
	// to start the game, hide all screen divs except "board"
	hideAllThreeMainDivScreens();
	document.getElementById("board").style.display = "";
	turn(2); // invoke the "turn" function for the first move to take place (turn toggles the player, so passing 2 to it will result in player 1 having the first go)
}

function showWinnerScreen(player) {
	hideAllThreeMainDivScreens();
	const winnerScreen = document.getElementById("winner");
	// clear all the 'screen-win-x' classes from the winner div
	winnerScreen.classList.remove("screen-win-one");
	winnerScreen.classList.remove("screen-win-two");
	winnerScreen.classList.remove("screen-win-tie");
	// show the winner screen div
	winnerScreen.style.display = "";
	if (player === 1) {
		winnerScreen.classList.add("screen-win-one");
		winnerScreen.querySelector(".message").innerHTML = "Winner: Player 1"
	} else if (player === 2) {
		winnerScreen.classList.add("screen-win-two");
		winnerScreen.querySelector(".message").innerHTML = "Winner: Player 2"
	} else {
		winnerScreen.classList.add("screen-win-tie");
		winnerScreen.querySelector(".message").innerHTML = "It's A Tie"
	}

	// tweak the CSS to space the elements on the winner page a little
	const message = winnerScreen.querySelector(".message");
	message.style.marginTop = "15rem";
	const newGameButton = document.getElementById("newGameButton");
	newGameButton.style.marginTop = "5rem";
	newGameButton.addEventListener("click", showBoardScreen, false);
}

function hideAllThreeMainDivScreens() {
	document.getElementById("start").style.display = "none";
	document.getElementById("board").style.display = "none";
	document.getElementById("winner").style.display = "none";
}


setUp();






