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
				console.log('You Win' + gameHistory.at(-1)[1])
			};
		} else {
			if(algorithmCheck() == true){
				
			} else {
				
			}
			scoreReset();
		}
	};
	function algorithmCheck(){
		console.log('start');
		let currentRow = [];
		let allWin = [];
		let lastMove = gameHistory.at(-1)[2];
		currentRow.push([]);
		for(let i = 0 ;i <3;i++){
			currentRow[0] = currentRow[0] + place[lastMove[0]][i];
		}
		currentRow.push([]);
		for(let j = 0;j <3;j++){
			currentRow[1] = currentRow[1] + place[j][lastMove[1]];
		}
		//allWin = currentRow[1].reduce(rowReduce);
		allWin = currentRow.filter(rowFilter);
		console.log(allWin);
		return(allWin.length != 0);
	}
	function scoreWin(){
	}
	function getRoundCount(){
	}
	function getHistory(){
		return gameHistory;
	}
	function rowFilter(value,index,array){
		let userSymbol = gameHistory.at(-1)[1];
		return value[0] == userSymbol && value[1] == userSymbol && value[2] == userSymbol;
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
//console.log(tictactoe.scoreCheck());
