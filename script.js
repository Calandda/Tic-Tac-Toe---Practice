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
	return {scoreAdd, symbolAssign, scoreReset, getSymbol, getName};
}

function createGame(){
	let place = [[null,null,null],[null,null,null],[null,null,null]];
	let gameHistory = [];
	let lastTurn = null;
	let roundCounter = 1;
	let roundMax = 0;
	function symbolAssign(player1,player2){
		player1.symbolAssign('X');
		player2.symbolAssign('O');
	};
	function scoreReset(){
		place = [[null,null,null],[null,null,null],[null,null,null]];
		lastTurn = null;
		roundCounter++;
	};
	function roundCheck(){
	}
	function roundReset(){
		roundCounter = 0;
	};
	function placeAdd(player,placement){
		if(place[placement[0]][placement[1]] == null){
			place[placement[0]][placement[1]] = player.getSymbol();
			gameHistory.push([roundCounter, player.getSymbol(),placement]);
			placeCheck(player);
		}
	};
	function scoreCheck(){
		return(place);
	};
	function placeCheck(player){	
		if(place[0].includes(null) || place[1].includes(null) || place[2].includes(null)){
			if(algorithmCheck() == true){
				console.log('test');
			};
		} else {
			if(algorithmCheck() == true){
				console.log('test1');
			} else {
				console.log('tie');
				scoreReset();
			}
		}
	};
	function algorithmCheck(){
		return(true);
	}
	function scoreWin(){
	}
	function getRoundCount(){
	}
	function getHistory(){
		return gameHistory;
	}
	return {symbolAssign,
	roundReset,
	placeAdd,
	scoreCheck,
	getRoundCount,
	getHistory};
}

// Javascript side test run
const tictactoe = createGame(); 
const player1 = createUser('player1');
const player2 = createUser('player2');
tictactoe.symbolAssign(player1,player2);
console.log('Player ' + player1.getName() + ' Assigned Symbol: ' + player1.getSymbol());
console.log('Player ' + player2.getName() + ' Assigned Symbol: ' + player2.getSymbol());
tictactoe.placeAdd(player1, [0,1]);
tictactoe.placeAdd(player2, [1,2]);
tictactoe.placeAdd(player1, [1,1]);
tictactoe.placeAdd(player2, [2,2]);
tictactoe.placeAdd(player1, [0,0]);
tictactoe.placeAdd(player2, [2,0]);
tictactoe.placeAdd(player1, [2,1]);
console.log(tictactoe.scoreCheck());
tictactoe.placeAdd(player2, [0,2]);
tictactoe.placeAdd(player1, [1,0]);
console.log(tictactoe.scoreCheck());
console.log(tictactoe.getHistory());

