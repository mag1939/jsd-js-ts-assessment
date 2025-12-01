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

// Input error message
let inputErrorMessage = "";

// Print board
function printBoard() {
	console.clear(); // call console.clear() before print each move

	// create temporary board array[] for us to compare our move with original board
	let tempBoard = [];
	for (let rowIndex = 0; rowIndex < board.length; rowIndex++){
		tempBoard.push([]) // in board we also have array in array, we can't just straight add vaule in it.
		for (let colIndex = 0; colIndex < board[0].length; colIndex++){
			// if our POS is in the same as POS of this N value metric, add ourself value instead. (cuz we walk in the same spot)
			if (playerRow === rowIndex && playerCol === colIndex) {
				tempBoard[rowIndex].push(PLAYER);
			// if not add the same value from the board
			} else {
				tempBoard[rowIndex].push(board[rowIndex][colIndex]);
			}
		}
	}

	// if player leave the spawn spot it will print ░
	if (playerRow != prevPlayerRow || playerCol != prevPlayerCol) {
		tempBoard[prevPlayerRow][prevPlayerCol] = "░";
	}
	// print our present move on the board.
	tempBoard.forEach((row) => console.log(row.join("")));
	// if you add the invaild input, this will jump scare you!
	if (inputErrorMessage) {
		console.log(inputErrorMessage);
	}
}

// Get input and check it
function getInput() {
	const input = prompt("Which way? (w/a/s/d): ");
	if (input === "w" || input === "s" || input === "a" || input === "d") {
        inputErrorMessage = ""; // ล้าง Error เมื่อ Input ถูก
		return input
	} else {
        inputErrorMessage = "⚠️  Invalid input. Please enter w, a, s, or d."; // เก็บข้อความ Error
        return undefined;
	}
}

// Move to the position decided by your input
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

// Check if you position is still in the game rules
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
	printBoard();
	// get input and move our position
	isMoving(getInput());
	// check if we still on the floor and not falling
	ruleChecker();
}



