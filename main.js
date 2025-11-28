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
	let tempBoard = [];
	for (let rowIndex = 0; rowIndex < board.length; rowIndex++){
		tempBoard.push([])
		for (let colIndex = 0; colIndex < board[0].length; colIndex++){
			if (playerRow === rowIndex && playerCol === colIndex) {
				tempBoard[rowIndex].push(PLAYER);
			} else {
				tempBoard[rowIndex].push(board[rowIndex][colIndex]);
			}
		}
	}
	tempBoard.forEach((row) => console.log(row.join("")));
	console.log(`previous: ${prevPlayerRow}, ${prevPlayerCol}`)
	console.log(`after: ${playerRow}, ${playerCol}`);
}


function isValidInput(input) {
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
		console.log("Game Over!")
		playing = false
	} else if (playerRow > board.length - 1) {
		console.log("Game Over!")
		playing = false
	} else if (playerCol < 0) {
		console.log("Game Over!")
		playing = false
	} else if (playerCol > board[0].length - 1) {
		console.log("Game Over!")
		playing = false
	} else if (board[playerRow][playerCol] === "O") {
		console.log("Game Over!")
		playing = false
	} else if (board[playerRow][playerCol] === "^") {
		console.log("DAMN THIS HAT IS SO COOL!!")
		playing = false
	} else if (board[playerRow][playerCol] === "░"){
		playing = true
	}
}

while (playing) {
	// Game play loop
	printBoard(board);
	const input = prompt("Which way? (w/a/s/d): ");
	// get input and update our position
	isMoving(isValidInput(input));
	// console.log(playerRow, playerCol)
	// check if our position still in boundaries
	ruleChecker();
}



