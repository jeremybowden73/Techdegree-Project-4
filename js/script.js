/*
// unadded
		Treehouse techdegree project 4

		TIC TAC TOE

		All code contsined in this JS file is the work of me, Jeremy Bowden
		jeremy@jeremybowden.net

*/

function game() {
	function headers(myTurn, notMyTurn) {
		myTurn.classList.add("active");
		notMyTurn.classList.remove("active");
	}

	function showPreviewOfOorX(symbol) {
		console.log(symbol);
		event.target.style.backgroundImage = "url(img/o.svg)";
		// if (symbol === "O") {
		// 	event.target.style.backgroundImage = "url(img/o.svg)";
		// } else {
		// 	event.target.style.backgroundImage = "url(img/x.svg)";
		// }
	}

	// function to invoke when it is player 1 ('O') turn
	function p1Turn() {
		player = 1;
		symbol = "O";
		headers(player1Header, player2Header);
		const boardUL = document.querySelector(".boxes"); // var for the whole board
		boardUL.addEventListener("mouseover", showPreviewOfOorX(symbol)); // event listener for when any part of the whole board is moused over
	}

	divStart.style.display = "none"; // hide the Start screen
	//divWinner.style.display = "none"; // hide the Winner screens
	divBoard.style.display = ""; // unhide the Board screen
	let player = 1; // let's start with player 1 ('O')

	const player1Header = document.getElementById("player1"); // var for the player1 header ('O')
	const player2Header = document.getElementById("player2"); // var for the player2 header ('X')

	p1Turn();



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






