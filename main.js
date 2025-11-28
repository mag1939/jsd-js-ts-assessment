"use strict";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

// Board tiles
const PLAYER = "*";
const EMPTY = "░";
const HOLE = "O";
const HAT = "^";

// Hardcoded board
let board = [
	[PLAYER, EMPTY, HOLE],
	[EMPTY, HOLE, EMPTY],
	[EMPTY, HAT, EMPTY],
];

// Game state
let playerRow = 0;
let playerCol = 0;
let prevPlayerRow = 0;
let prevPlayerCol = 0;
let playing = true;

// Print board
function printBoard() {
	console.clear(); // call console.clear() before print each move
	let tempBoard = [];// create temporary board array[] for us to map our move with real board
	for (let rowIndex = 0; rowIndex < board.length; rowIndex++){
		tempBoard.push([]) // in board we also have array in array, we can't just straight add it, then every value will stay in the same array
		for (let colIndex = 0; colIndex < board[0].length; colIndex++){
			if (playerRow === rowIndex && playerCol === colIndex) {
				tempBoard[rowIndex].push(PLAYER);
			} else {
				tempBoard[rowIndex].push(board[rowIndex][colIndex]);
			}
		}
	}
	// if player leave the spawn spot it will print ░
	if (playerRow != prevPlayerRow || playerCol != prevPlayerCol) {
		tempBoard[prevPlayerRow][prevPlayerCol] = "░";
	}
	tempBoard.forEach((row) => console.log(row.join("")));
}

function getInput() {
	const input = prompt("Which way? (w/a/s/d): ");
	if (input === "w" || input === "s" || input === "a" || input === "d") {
		return input
	} else {
		console.log("Wrong input please try again.")
	}
}

function isMoving(validInput) {
	switch (validInput) {
		case "w":
			playerRow--
			break;
		case "s":
			playerRow++
			break;
		case "a":
			playerCol--
			break;
		case "d":
			playerCol++
			break;
		default:
			break;
	}
}

function ruleChecker(){
	if (playerRow < 0) {
		console.log("RIP! You fell out of the boundaries!")
		playing = false
	} else if (playerRow > board.length - 1) {
		console.log("RIP! You fell out of the boundaries!")
		playing = false
	} else if (playerCol < 0) {
		console.log("RIP! You fell out of the boundaries!")
		playing = false
	} else if (playerCol > board[0].length - 1) {
		console.log("RIP! You fell out of the boundaries!")
		playing = false
	} else if (board[playerRow][playerCol] === "O") {
		console.log("RIP! You fell into the 🕳️")
		playing = false
	} else if (board[playerRow][playerCol] === "^") {
		console.log("DAMN THIS 🧢 IS SO COOL!!")
		playing = false
	} else if (board[playerRow][playerCol] === "░"){
		playing = true
	}
}

while (playing) {
	// Game play loop
	printBoard(board);

	// get input(that will convert to lower case at any cost) and move our position
	isMoving(getInput());
	// check if we still on the floor and not falling
	ruleChecker();
}



