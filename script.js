function createUser(name){
	let score = 0;
	let symbol = '';
	let playerName = name;
	function symbolAssign(inputSymbol){
		symbol = inputSymbol;
	};
	function scoreAdd(){
		score++;
	}
	function scoreReset(){
		score = 0;
	}
	function getSymbol(){
		return symbol;
	}
	function getName(){
		return playerName;
	}
	function getScore(){
		return score;
	}
	return {scoreAdd, symbolAssign, scoreReset, getSymbol, getName, getScore};
}

function createGame(player1,player2){
	let place = [[null,null,null],[null,null,null],[null,null,null]];
	let players = [player1,player2];
	let gameHistory = [];
	let currentPlayer = null;
	let lastTurn = null;
	let turnOrder = [];
	let turnCounter = 0;
	let roundCounter = 0;
	let roundMax = 0;
	let gameFinished = false;

	function scoreReset(){
		place = [[null,null,null],[null,null,null],[null,null,null]];
		lastTurn = null;
		roundCounter++;
		currentPlayer = null;
		turnCounter = 0;
	};
	function setRoundMax(num){
		roundMax = num;
	}
	function roundCheck(){
	}
	function roundReset(){
		roundCounter = 0;
	};
	function placeAdd(placement){
		if(place[placement[0]][placement[1]] == null){
			turnOrder = turnCounter % 2;
			turnCounter++;
			place[placement[0]][placement[1]] = players[turnOrder].getSymbol();
			gameHistory.push([roundCounter, players[turnOrder].getSymbol(),placement]);
			placeCheck(players[turnOrder]);
		} else {
			console.log('test');
		}
	};
	function scoreCheck(){
		let placeOutput = '';
		for(let i = 0; i<3;i++){
			for(let j=0;j<3;j++){
				placeOutput = placeOutput + ' | ' + place[i][j];
			}
			placeOutput = placeOutput +  '\n';
		}
		console.log(placeOutput);
		return(place);
	};
	function placeCheck(player){	
		let winCheck = false;
		if(place[0].includes(null) || place[1].includes(null) || place[2].includes(null)){
			if(algorithmCheck() == true){
				winCheck = true;
			};
		} else {
			if(algorithmCheck() == true){
				winCheck = true;
			} else {
				
			}
			scoreReset();
		}
		if(winCheck == true){
			console.log('test'  + players[0].getName());
			console.log('You Win' + gameHistory.at(-1)[1])
			player.scoreAdd();
			scoreReset();
			scoreWin();
		}
	};
	function algorithmCheck(){
		let currentRow = [];
		let allWin = [];
		let lastMove = gameHistory.at(-1)[2];
		let playerSymbol = gameHistory.at(-1)[1];
		currentRow.push([]);
		for(let i = 0 ;i <3;i++){
			currentRow[0] = currentRow[0] + place[lastMove[0]][i];
		}
		currentRow.push([]);
		for(let j = 0;j <3;j++){
			currentRow[1] = currentRow[1] + place[j][lastMove[1]];
		}
		if(place[1][1] == playerSymbol){
			// diagonal left to right
			currentRow.push([]);
			for(let i = 0;i<3;i++){
				for(let j=0;j<3;j++){
					if(i==j){
						currentRow[2] = currentRow[2] + place[i][j];
					}
				}
			}
			// diagonal right to left
			currentRow.push([]);
			for(let i = 0;i<3;i++){
				for(let j=0;j<3;j++){
					if(i == 2-j){
						currentRow[3] = currentRow[3] + place[i][j];
					}
				}
			}
		}
		allWin = currentRow.filter(rowFilter);
		return(allWin.length != 0);
	}
	function scoreWin(){
		if(roundCounter >= roundMax){
			if(players[0].getScore() > players[1].getScore()){
				console.log(players[0].getName() + ' WINS THE GAME!'); 
			} else if(player[0].getScore() < players[1].getScore()){
				console.log(players[1].getName() + ' WINS THE GAME!');
			}else {
				console.log('TIE GAME');
			}
		}
	}
	function getRoundCount(){
	}
	function getHistory(){
		return gameHistory;
	}
	function getTurnCounter(){
		return turnCounter;
	}
	function rowFilter(value,index,array){
		let userSymbol = gameHistory.at(-1)[1];
		return value[0] == userSymbol && value[1] == userSymbol && value[2] == userSymbol;
	}
	return {
	roundReset,
	placeAdd,
	scoreCheck,
	getRoundCount,
	getHistory,
	getTurnCounter,
	setRoundMax};
}

// Javascript side test run

const player1 = createUser('player1');
const player2 = createUser('player2');
const tictactoe = createGame(player1,player2); 
player1.symbolAssign('X');
player2.symbolAssign('O');
tictactoe.setRoundMax('5');
tictactoe.placeAdd([0,1]);
tictactoe.placeAdd([1,2]);
tictactoe.placeAdd([1,1]);
tictactoe.placeAdd([2,2]);
tictactoe.placeAdd([0,0]);
tictactoe.placeAdd([2,0]);
tictactoe.scoreCheck();
console.log(tictactoe.getTurnCounter());
tictactoe.placeAdd([2,1]);
console.log(tictactoe.getHistory());
console.log(tictactoe.getTurnCounter());
console.log(player1.getScore());
console.log(player2.getScore());
player1.symbolAssign('X');
player2.symbolAssign('O');
tictactoe.setRoundMax('5');
tictactoe.placeAdd([0,1]);
tictactoe.placeAdd([1,2]);
tictactoe.placeAdd([1,1]);
tictactoe.placeAdd([2,2]);
tictactoe.placeAdd([0,0]);
tictactoe.placeAdd([2,0]);
tictactoe.scoreCheck();
console.log(tictactoe.getTurnCounter());
tictactoe.placeAdd([2,1]);
console.log(tictactoe.getHistory());
console.log(tictactoe.getTurnCounter());
console.log(player1.getScore());
console.log(player2.getScore());
player1.symbolAssign('X');
player2.symbolAssign('O');
tictactoe.setRoundMax('5');
tictactoe.placeAdd([0,1]);
tictactoe.placeAdd([1,2]);
tictactoe.placeAdd([1,1]);
tictactoe.placeAdd([2,2]);
tictactoe.placeAdd([0,0]);
tictactoe.placeAdd([2,0]);
tictactoe.scoreCheck();
console.log(tictactoe.getTurnCounter());
tictactoe.placeAdd([2,1]);
console.log(tictactoe.getHistory());
console.log(tictactoe.getTurnCounter());
console.log(player1.getScore());
console.log(player2.getScore());
player1.symbolAssign('X');
player2.symbolAssign('O');
tictactoe.setRoundMax('5');
tictactoe.placeAdd([0,1]);
tictactoe.placeAdd([1,2]);
tictactoe.placeAdd([1,1]);
tictactoe.placeAdd([2,2]);
tictactoe.placeAdd([0,0]);
tictactoe.placeAdd([2,0]);
tictactoe.scoreCheck();
console.log(tictactoe.getTurnCounter());
tictactoe.placeAdd([2,1]);
console.log(tictactoe.getHistory());
console.log(tictactoe.getTurnCounter());
console.log(player1.getScore());
console.log(player2.getScore());
player1.symbolAssign('X');
player2.symbolAssign('O');
tictactoe.setRoundMax('5');
tictactoe.placeAdd([0,1]);
tictactoe.placeAdd([1,2]);
tictactoe.placeAdd([1,1]);
tictactoe.placeAdd([2,2]);
tictactoe.placeAdd([0,0]);
tictactoe.placeAdd([2,0]);
tictactoe.scoreCheck();
console.log(tictactoe.getTurnCounter());
tictactoe.placeAdd([2,1]);
console.log(tictactoe.getHistory());
console.log(tictactoe.getTurnCounter());
console.log(player1.getScore());
console.log(player2.getScore());


