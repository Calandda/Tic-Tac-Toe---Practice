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
	let place = [['','',''],['','',''],['','','']];
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
		
	};
	function scoreCheck(){
		return(place);
	};
	function scoreWin(){
	}
	function winCompare(player1,player2){
	}
	return {symbolAssign,
	scoreReset,
	roundReset,
	placeAdd,
	scoreCheck,
	scoreWin,
	winCompare};
}

const tictactoe = createGame(); 
const player1 = createUser('player1');
const player2 = createUser('player2');
tictactoe.symbolAssign(player1,player2);
console.log('Player ' + player1.getName() + ' Assigned Symbol: ' + player1.getSymbol());
console.log('Player ' + player2.getName() + ' Assigned Symbol: ' + player2.getSymbol());
