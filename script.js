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
	let winningLine = [];
	let winningLineHistory = [];

	function scoreReset(){
		place = [[null,null,null],[null,null,null],[null,null,null]];
		lastTurn = null;
		roundCounter++;
		currentPlayer = null;
		turnCounter = 0;
		winningLineHistory.push(winningLine);
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
			//placeCheck();
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
	function placeCheck(){	
		let winCheck = false;
		winningLine = algorithmCheck();
		if(place[0].includes(null) || place[1].includes(null) || place[2].includes(null)){
			if(winningLine.length != 0){
				winCheck = true;
			};
		} else {
			if(winningLine.length != 0){
				winCheck = true;
			} else {
				console.log('Tie');
				scoreReset();
				return(true);
			}
		}
		if(winCheck == true){
			console.log('You Win' + gameHistory.at(-1)[1]);
			console.log(players[turnOrder].getSymbol());
			players[turnOrder].scoreAdd();
			scoreReset();
			//scoreWin();
			return(true);
		}
	};
	function algorithmCheck(){
		let currentRow = [];
		let allWin = [];
		let lastMove = gameHistory.at(-1)[2];
		let playerSymbol = gameHistory.at(-1)[1];
		currentRow.push([]);
		for(let i = 0 ;i <3;i++){
			//currentRow[0] = currentRow[0] + place[lastMove[0]][i];	
			currentRow[0].push([parseInt(lastMove[0]),i]);
		}
		console.log('test' + currentRow[0])
		//currentRow[0][1] = [[lastMove[0],0],[lastMove[0],1],[lastMove[0],2]];
		currentRow.push([]);
		for(let j = 0;j <3;j++){
			//currentRow[1] = currentRow[1] + place[j][lastMove[1]];
			currentRow[1].push([j,parseInt(lastMove[1])]);
		}
		if(place[1][1] == playerSymbol){
			// diagonal left to right
			currentRow.push([]);
			for(let i = 0;i<3;i++){
				for(let j=0;j<3;j++){
					if(i==j){
						currentRow[2].push([i,j]);
					}
				}
			}
			// diagonal right to left
			currentRow.push([]);
			for(let i = 0;i<3;i++){
				for(let j=0;j<3;j++){
					if(i == 2-j){
						currentRow[3].push([i,j]);
					}
				}
			}
		}
		allWin = currentRow.filter(rowFilter);
		console.log('TEST History');
		console.log(allWin);
		return(allWin);
	}
	function scoreWin(){
		if(roundCounter >= roundMax){
			if(players[0].getScore() > players[1].getScore()){
				return(players[0].getName());
			} else if(players[0].getScore() < players[1].getScore()){
				return(players[1].getName());
			}else {
				return('tie');
			}
		} else {
			return(false);
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
	
		return place[value[0][0]][value[0][1]] == userSymbol && place[value[1][0]][value[1][1]] == userSymbol && place[value[2][0]][value[2][1]] == userSymbol;
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
	function getWinningLine(){
		console.log(winningLine);
		return winningLine;
	}

	return {
	roundReset,
	placeAdd,
	scoreCheck,
	getRoundCount,
	getHistory,
	getTurnCounter,
	setRoundMax,
	getTurn,
	placeCheck,
	getWinningLine,
	scoreWin};
}

function createDisplay(inputData){
	const imageAdd = './images/';
	const imageSymbol = ['circle.svg','cross.svg'];
	const divInput = document.querySelector('.divInitialize');
	const player1 = createUser(inputData.get('player1Name'));
	const player2 = createUser(inputData.get('player2Name'));
	let matchEnd = false;
	let winStallCheck = false;
	player1.setSymbol('X');
	player2.setSymbol('O');
	createDisplay();
	const divGame = document.querySelector('.divGame');
	const tictactoe = createGame(player1,player2);
	tictactoe.setRoundMax(inputData.get('roundCount'));
	divGame.addEventListener('click', (event)=>{
		const placement = [event.target.getAttribute('data-value'),event.target.getAttribute('data-value2')];
		console.log(placement);
		if(matchEnd == false){
			if(winStallCheck == false){
				if(tictactoe.placeAdd(placement) == true){
					setSymbolDisplay(event);
				}
			};
			if(tictactoe.placeCheck() == true){
				setScoreDisplay();
				console.log('winCheck');
				winStallCheck = true;
				setWinningLine(tictactoe.getWinningLine());
				const matchWinCheck = tictactoe.scoreWin();
				if(matchWinCheck != false){
					matchEnd = true;
					setMatchWinInfo();
				}
			} else if(winStallCheck == true){
				winStallCheck = false;
				console.log('winCheckStall');
				resetSymbolDisplay();
			}
		} else if(matchEnd == true){
			const gameDisplay = document.querySelector('.divGame');
			const infoDisplay = document.querySelector('.divInfo');
			infoDisplay.remove();
			gameDisplay.remove();
			openInputBoard();
		}
	});
	function createDisplay(){
		const body = document.querySelector('body');
		const template = document.querySelector('#displayGame');
		const gameDisplay = template.content.cloneNode(true);
		body.appendChild(gameDisplay);
		const pPlayer1Name = document.querySelector('.pPlayer1Name');
		const pPlayer2Name = document.querySelector('.pPlayer2Name');
		const pPlayer1Score = document.querySelector('.pPlayer1Score');
		const pPlayer2Score = document.querySelector('.pPlayer2Score');
		pPlayer1Name.textContent = player1.getName();
		pPlayer2Name.textContent = player2.getName();
		pPlayer1Score.textContent = 0;
		pPlayer2Score.textContent = 0;
		resetSymbolDisplay();
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
	function resetSymbolDisplay(){
		console.log('reset');
		const sectionDisplay = document.querySelectorAll('.square');
		for(let i = 0; i < 9; i++){
			sectionDisplay[i].style.backgroundImage = 'none';
			sectionDisplay[i].style.filter = '';
		};
	}
	function setScoreDisplay(){
		const pPlayer1Score = document.querySelector('.pPlayer1Score');
		const pPlayer2Score = document.querySelector('.pPlayer2Score');
		pPlayer1Score.textContent = player1.getScore();
		pPlayer2Score.textContent = player2.getScore();
	}
	function setWinningLine(line){
		const sectionDisplay = document.querySelectorAll('.square');
		console.log(line);
		for(let i = 0; i<3;i++){
			for(let j = 0; j<9;j++){
				if(sectionDisplay[j].getAttribute('data-value') == line[0][i][0] && sectionDisplay[j].getAttribute('data-value2') == line[0][i][1]){
					sectionDisplay[j].style.filter = 'invert(50%)';
				}
			}
		}
	};
	function setMatchWinInfo(){
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
	//displayGame.closeInputBoard();
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

