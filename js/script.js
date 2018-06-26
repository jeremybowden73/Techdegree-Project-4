/*

		Treehouse techdegree project 4

		TIC TAC TOE

		All code contained in this JS file is the work of me, Jeremy Bowden
		email: jeremy@jeremybowden.net

*/

// Wrap entire code in a IIFE (immediately invoked function expression), or "basic Module Pattern"
// to de-clutter the global namespace. Here's a great blogpost about basic Module Patterns
// https://coryrylan.com/blog/javascript-module-pattern-basics
const gameModule = (function () {  // give the namespace the name "gameModule"
	// initial set-up; create the start screen and the winner screen, and hide all the screens
	function setUp() {
		const divBoard = document.getElementById("board"); // create variable for the Board div (main game board screen)
		divBoard.style.display = "none"; // hide it initially
		const divBody = divBoard.parentNode;
		divBody.id = ("body");

		// create the Start screen
		const divStart = document.createElement("div"); // create element for the Start page div
		divStart.classList.add("screen", "screen-start"); // give it some classes
		divStart.id = ("start"); // and give it an id
		divBody.insertBefore(divStart, divBoard); // insert the Start page div into the <body> element before the Board div

		// inject html content into the Start screen main div
		let startScreenHTML =
			"<header>" +
			"<h1> Tic Tac Toe</h1>" +
			"<br>" +
			"<div id=playersSelect></div>" +
			"<br>" +
			"<a href='#' class='button' id='startButton'>Start game</a>" +
			"</header >";
		divStart.innerHTML = startScreenHTML;

		const playerSelectDiv = document.getElementById("playersSelect");
		const playerSelectForm = document.createElement("form");
		playerSelectDiv.appendChild(playerSelectForm);
		const playerSelectFormHTML =
			"<form id='playerselectForm'>" +
			"<p>Please select game type...</p>" +
			"<p>" +
			"<input type='radio' id='1player' name='players' checked>" +
			"<label for='1player'>1 human vs computer</label>" +
			"</p>" +
			"<p>" +
			"<input type='radio' id='2players' name='players'>" +
			"<label for='2players'>2 humans</label>" +
			"</p>" + "<br>" +
			"<p>" +
			"<span class='playerName'>" + "<input type='text' id='player1Name' placeholder='Enter name of Player 1'>" + "</span>" +
			"<span class='playerName'>" + "<input type='text' id='player2Name' placeholder='Enter name of Player 2'>" + "</span>" +
			"</p>" +
			"</div>" +
			"</div>" +
			"</form>";
		playerSelectForm.innerHTML = playerSelectFormHTML;

		// create the Winner screen
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

		// call the function to show the start screen
		showStartScreen();
	}

	function showStartScreen() {
		hideAllThreeMainDivScreens();
		document.getElementById("start").style.display = "";
		// hide/show the text entry box for player 2 (not needed if it's player1 vs computer)
		const player2Name = document.getElementById("player2Name");
		player2Name.style.display = "none";
		const onePlayerRadioButton = document.getElementById("1player");
		onePlayerRadioButton.addEventListener("click", () => {
			player2Name.style.display = "none";
		});
		const twoPlayersRadioButton = document.getElementById("2players");
		twoPlayersRadioButton.addEventListener("click", () => {
			player2Name.style.display = "";
			player2Name.style.marginLeft = "2rem";
		});

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
		function turn(player, numberOfPlayers) {
			if (player === 1) {
				player = 2;
			} else {
				player = 1;
			}
			updateHeaders(player);
			if (player === 1) {
				playerChooseTile(player, numberOfPlayers);
			} else {
				if (numberOfPlayers === 2) {
					playerChooseTile(player, numberOfPlayers);
				} else {
					let timeoutID = window.setTimeout(cpuChooseTile, 1500, player, numberOfPlayers); // player 2 is the computer; delay for 1.5 seconds for effect
				}
			}
		}

		function cpuChooseTile(player, numberOfPlayers) {
			// choose a random tile
			let tile = (Math.floor(Math.random() * 9));
			if (!allBoardLIs[tile].classList.contains("box-filled-1") && !allBoardLIs[tile].classList.contains("box-filled-2")) {
				allBoardLIs[tile].classList.add("box-filled-2");
				const winner = checkForWinner(player, boardUL);
				if (winner) {
					let timeoutID = window.setTimeout(showWinnerScreen, 1500, winner, numberOfPlayers); // delay for 1.5 seconds for effect
				} else {
					turn(player, numberOfPlayers);
				}
			} else {
				cpuChooseTile(player, numberOfPlayers); // if the tile the cpu chose a tile that is not available, invoke the function again
			}
		}


		function playerChooseTile(player, numberOfPlayers) {
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
						let timeoutID = window.setTimeout(showWinnerScreen, 1500, winner, numberOfPlayers); // delay for 2 seconds for effect
					} else {
						turn(player, numberOfPlayers);
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

			// array in which to store true if the current player "owns" the tile or false if they don't
			const board = allBoardLIs.map(each => each.classList.contains(playerClass) ? true : false);

			// check for all 8 possible winning combinations and return if the current player is a winner
			if ((board[0] && board[1] && board[2]) || (board[3] && board[4] && board[5]) ||
				(board[6] && board[7] && board[8]) || (board[0] && board[3] && board[6]) ||
				(board[1] && board[4] && board[7]) || (board[2] && board[5] && board[8]) ||
				(board[0] && board[4] && board[8]) || (board[2] && board[4] && board[6])) {
				return player;
			}
			// check for a tie by counting how many "true" elements are in the board array, if there
			// are 5 then player 1 must have had 5 turns, and there is no winner, so it must be a tie
			if (board.filter(item => item === true).length === 5) {
				return 3; // "player 3" is a tie
			}
		}

		// local variables for the showBoardScreen function
		const boardUL = document.querySelector(".boxes"); // var for the whole board
		const allBoardLIs = Array.from(boardUL.getElementsByTagName("li")); // array of all the tile <li> elements
		// reset the board tiles
		allBoardLIs.forEach(function (each) {
			each.classList.remove("box-filled-1");
			each.classList.remove("box-filled-2");
			each.style.backgroundImage = "";
		});

		// determine how many human players there are
		let numberOfPlayers = 2;
		if (document.getElementById("1player").checked === true) {
			numberOfPlayers = 1;
		}

		// show the player names in the headers
		const player1LI = document.getElementById("player1");
		// if player 1 name doesn't exist, create it
		if (!document.getElementById("player1NameDiv")) {
			const player1NameDiv = document.createElement("div");
			player1NameDiv.id = ("player1NameDiv");
			player1LI.appendChild(player1NameDiv);
			if (document.getElementById("player1Name").value) {
				player1NameDiv.innerHTML = document.getElementById("player1Name").value;
			} else {
				player1NameDiv.innerHTML = "Unknown";
			}
		}

		const player2LI = document.getElementById("player2");
		// if player 2 name doesn't exist, create it
		if (!document.getElementById("player2NameDiv")) {
			const player2NameDiv = document.createElement("div");
			player2NameDiv.id = ("player2NameDiv");
			player2LI.appendChild(player2NameDiv);
			if (numberOfPlayers === 1) {
				player2NameDiv.innerHTML = "Computer";
			} else {
				if (document.getElementById("player2Name").value) {
					player2NameDiv.innerHTML = document.getElementById("player2Name").value;
				} else {
					player2NameDiv.innerHTML = "Unknown";
				}
			}
		}

		// to start the game, hide all screen divs except "board"
		hideAllThreeMainDivScreens();
		document.getElementById("board").style.display = "";
		turn(2, numberOfPlayers); // invoke the "turn" function for the first move to take place (turn toggles the player, so passing 2 to it will result in player 1 having the first go)
	}

	function showWinnerScreen(player, numberOfPlayers) {
		hideAllThreeMainDivScreens();
		const winnerScreen = document.getElementById("winner");
		// clear all the 'screen-win-...' classes from the winner div
		winnerScreen.classList.remove("screen-win-one");
		winnerScreen.classList.remove("screen-win-two");
		winnerScreen.classList.remove("screen-win-tie");
		// show the winner screen div
		winnerScreen.style.display = "";
		if (player === 1) {
			winnerScreen.classList.add("screen-win-one");
			winnerScreen.querySelector(".message").innerHTML = "Winner: " + document.getElementById("player1Name").value;
		} else if (player === 2) {
			winnerScreen.classList.add("screen-win-two");
			if (numberOfPlayers === 1) {
				winnerScreen.querySelector(".message").innerHTML = "Winner: " + "Computer";
			} else {
				if (document.getElementById("player2Name").value) {
					winnerScreen.querySelector(".message").innerHTML = "Winner: " + document.getElementById("player2Name").value;
				} else {
					winnerScreen.querySelector(".message").innerHTML = "Winner: " + "Unknown";
				}
			}
			// winnerScreen.querySelector(".message").innerHTML = "Winner: " + document.getElementById("player2Name").value;
		} else {
			winnerScreen.classList.add("screen-win-tie");
			winnerScreen.querySelector(".message").innerHTML = "It's A Tie"
		}

		if (numberOfPlayers === 1) {
			player2NameDiv.innerHTML = "Computer";
		} else {
			if (document.getElementById("player2Name").value) {
				player2NameDiv.innerHTML = document.getElementById("player2Name").value;
			} else {
				player2NameDiv.innerHTML = "Unknown";
			}
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

	setUp(); // invoke the initial function to set up the screens
}());







