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
	let lastTurn = null;
	let roundCounter = 0;
	let roundMax = 0;
	function symbolAssign(player1,player2){
		player1.symbolAssign('X');
		player2.symbolAssign('O');
	};
	function scoreReset(){
		place = [['','',''],['','',''],['','','']];
	};
	function roundCheck(){
	}
	function roundReset(){
		roundCounter = 0;
	};
	function placeAdd(player,placement){
		place[placement[0]][placement[1]] = player.getSymbol();
	};
	function scoreCheck(){
		return(place);
	};
	function scoreWin(){
	}
	return {symbolAssign,
	roundReset,
	placeAdd,
	scoreCheck};
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
console.log(tictactoe.scoreCheck());

