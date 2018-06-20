/*

		Treehouse techdegree project 4

		TIC TAC TOE

		All code contsined in this JS file is the work of me, Jeremy Bowden
		jeremy@jeremybowden.net

*/

function game() {
	const boardUL = document.querySelector(".boxes"); // var for the whole board
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
		} else if (player === 2) {
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
		console.log(`Current player is ${player}`);
		updateHeaders(player);
		playerChooseTile(player);
	}

	function playerChooseTile(player) {
		//console.log(boardUL);
		// event listener for when any part of the whole board is moused over
		boardUL.addEventListener("mouseover", mousedOver, false);
		function mousedOver(event) {
			console.log("mouse in");
			if (!event.target.classList.contains("box-filled-1") &&
				!event.target.classList.contains("box-filled-2")) {
				console.log("you can choose that one");
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
			if (!event.target.classList.contains("box-filled-1") &&
				!event.target.classList.contains("box-filled-2")) {
				console.log("valid selection");
				boardUL.removeEventListener("mouseover", mousedOver, false);
				boardUL.removeEventListener("mouseout", mousedOut, false);
				boardUL.removeEventListener("click", clickedOn, false);
				selectTile(player);
				turn(player);
			} else {
				console.log("NOT a valid selection");
			}
		}
	}



	//
	// start of the game
	divStart.style.display = "none"; // hide the Start screen
	//divWinner.style.display = "none"; // hide the Winner screens
	divBoard.style.display = ""; // unhide the Board screen
	let player = 2; // let's start with player 1 ('O') ///////////////////////////////////////////////////////
	console.log("starting with player 2");
	turn(player); // invoke the function "turn" for the first move to take place

}


// initial set-up; hide gameboard and show the start screen

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

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", game, false);






