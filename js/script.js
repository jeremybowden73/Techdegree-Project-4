/*

		Treehouse techdegree project 4

		TIC TAC TOE

		All code contsined in this JS file is the work of me, Jeremy Bowden
		jeremy@jeremybowden.net

*/

function game() {
	// function to update the gameboard screen headers depending on whose turn it is (player 1 or player 2)
	function updateHeaders(currentPlayer) {
		document.getElementById("player1").classList.remove("active"); // var for the player1 header ('O')
		document.getElementById("player2").classList.remove("active"); // var for the player2 header ('X')
		if (currentPlayer === 1) {
			document.getElementById("player1").classList.add("active");
		} else {
			document.getElementById("player2").classList.add("active");
		}
	}

	function showTilePreview(player) {
		if (player === 1) {
			event.target.style.backgroundImage = "url(img/o.svg)";
		} else {
			event.target.style.backgroundImage = "url(img/x.svg)";
		}
	}


	// function to invoke when it is the next player's turn
	function turn(player) {
		//player = 1;
		//symbol = "O";
		updateHeaders(player);
		const boardUL = document.querySelector(".boxes"); // var for the whole board
		boardUL.addEventListener("mouseover", function () {
			showTilePreview(player)
		}); // event listener for when any part of the whole board is moused over
		boardUL.addEventListener("mouseout", function () {
			event.target.style.backgroundImage = "";
		}); // event listener for when any part of the whole board is moused out
	}

	//
	// start of the game
	divStart.style.display = "none"; // hide the Start screen
	//divWinner.style.display = "none"; // hide the Winner screens
	divBoard.style.display = ""; // unhide the Board screen
	let player = 1; // let's start with player 1 ('O')
	//let symbol = "O";
	turn(player);



}

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






