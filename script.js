function createUser(name){
	let score = 0;
	function scoreAdd(){
		score++;
		console.log(score);
	}
	return scoreAdd;
}
function createGame(){
	let place = [['','',''],['','',''],['','','']];
	function scoreReset(){
		place = [['','',''],['','',''],['','','']];
	};
	function scoreAdd(player,placement){
	};
	function scoreCheck(){
	};
}
const user1 = createUser('test');
user1();
user1();