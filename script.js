function createUser(name){
	let score = 0;
	let symbol = '';
	let playerName = name;
	function setSymbol(inputSymbol){
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
	return {scoreAdd, setSymbol, scoreReset, getSymbol, getName, getScore};
}

function createGame(player1,player2){
	let place = [[null,null,null],[null,null,null],[null,null,null]];
	let players = playerRandomize(player1,player2);
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
		turnOrder = turnCounter % 2;
		if(place[placement[0]][placement[1]] == null){
			turnCounter++;
			place[placement[0]][placement[1]] = players[turnOrder].getSymbol();
			gameHistory.push([roundCounter, players[turnOrder].getSymbol(),placement]);
			placeCheck(players[turnOrder]);
			scoreCheck();
			return(true);
		} else {
			return(false);
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
	function getTurn(){
		return players[turnCounter+1 % 2];
	}
	function playerRandomize(player1,player2){
		if(Math.random() > 0.5){
			return [player1,player2];
		} else {
			return [player2,player1];
		}
	}

	return {
	roundReset,
	placeAdd,
	scoreCheck,
	getRoundCount,
	getHistory,
	getTurnCounter,
	setRoundMax,
	getTurn};
}

function createDisplay(inputData){
	const imageAdd = './images/';
	const imageSymbol = ['circle.svg','cross.svg'];
	const divInput = document.querySelector('.divInitialize');
	createDisplay();
	const divGame = document.querySelector('.divGame');
	const player1 = createUser(inputData.get('player1Name'));
	const player2 = createUser(inputData.get('player1Name'));
	player1.setSymbol('X');
	player2.setSymbol('O');
	const tictactoe = createGame(player1,player2);
	tictactoe.setRoundMax(inputData.get('roundCount'));
	divGame.addEventListener('click', (event)=>{
		const placement = [event.target.getAttribute('data-value'),event.target.getAttribute('data-value2')];
		console.log(placement);
		if(tictactoe.placeAdd(placement) === true){
			setSymbolDisplay(event);
		};
	});
	function createDisplay(){
		const body = document.querySelector('body');
		const template = document.querySelector('#displayGame');
		const gameDisplay = template.content.cloneNode(true);
		body.appendChild(gameDisplay);
	}
	function displayRefresh(gameHistory){
	};
	function openGameBoard(){
		divGame.style.display = 'flex';
	};
	function closeGameBoard(){
		divGame.style.display = 'none';
	};
	function openInputBoard(){
		divInput.style.display = 'block';
	};
	function closeInputBoard(){
		divInput.style.display = 'none';
	};
	function checkPlayerConsole(){
		console.log('Player 1 Name= '+player1.getName()+' Player 1 Symbol= '+player1.getSymbol());
		console.log('Player 2 Name= '+player2.getName()+' Player 2 Symbol= '+player2.getSymbol());
	};
	function playConsole(num){
		tictactoe.placeAdd(num);
		tictactoe.getHistory();
	};
	function setSymbolDisplay(e){
		const lastSymbol = tictactoe.getHistory().at(-1)[1];
		let index = null;
		if(lastSymbol === 'X'){
			index = 1;
		} else if(lastSymbol === 'O'){
			index = 0;
		};
		event.target.style.backgroundImage = 'url('+ imageAdd + imageSymbol[index] + ')';
	};
	return {
	displayRefresh,
	openGameBoard,
	closeGameBoard,
	openInputBoard,
	closeInputBoard,
	checkPlayerConsole,
	playConsole};
}


const formInput = document.querySelector('form');
let displayGame;
formInput.addEventListener('submit', (event) =>{
	event.preventDefault();
	const inputData = new FormData(formInput);
	console.log(inputData.get('player1Name'))
	displayGame = createDisplay(inputData);
	displayGame.closeInputBoard();
	displayGame.openGameBoard();
});

/**
const player1 = createUser('player1');
const player2 = createUser('player2');
const tictactoe = createGame(player1,player2); 
player1.setSymbol('X');
player2.setSymbol('O');
tictactoe.setRoundMax('5');
tictactoe.placeAdd([1,1]);

**/

