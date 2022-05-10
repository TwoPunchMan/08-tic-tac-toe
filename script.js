// Tic-Tac-Toe script.js file

// Gameboard Module immediately invoked function expression (IIFE)
const gameboard = (() => {
	// get all tic-tac-toe board slots
	const game_board_slots = document.querySelectorAll(".board-slot");
	const new_game_btn = document.querySelector(".new-game-btn");

	// game board representation by array
	let game_array = ["O","X","O","X","O","O","X","O","X"];
	
	const Player = (name, mark) => {
		player_name: name;
		player_mark: mark;
		return { player_name, player_mark }
	}
	
	const decide_first = () => {
		let rand = Math.random()
		
	}

	// event listener functions
	game_board_slots.forEach(slot => 
		slot.addEventListener('click', function(mark) {
			slot.innerHTML = "Doge";
		}
	));

	new_game_btn.addEventListener('click', function() {
		;
	});

	const is_slot_taken = (index) => {

		return game_array[index] != null;
	}

	const check_win_condition = (mark) => {
		/*
		Whoever gets three in a row first wins
		
		[0][1][2]
		[3][4][5]
		[6][7][8]
		
		*/
		
		if ((game_array[0] == mark && game_array[3] == mark && game_array[6] == mark) || 
			(game_array[1] == mark && game_array[4] == mark && game_array[7] == mark) ||
			(game_array[2] == mark && game_array[5] == mark && game_array[8] == mark) ||
			(game_array[0] == mark && game_array[4] == mark && game_array[8] == mark) || 
			(game_array[2] == mark && game_array[4] == mark && game_array[6] == mark)
			) {
			;
		}
		
	}

	const clear_board = () => {
		game_array = [,,,,,,,,];
		for (let i = 0; i < 9; i++) {
			let slot = document.querySelector("[id='" + i + "'");
			slot.innerHTML = "";
		}
	}

	let start_game = () => function() {
		clear_board();
	}

	const is_play_another_game = (response) => {
		if (response == 'Y') {
			;
		}

	}

	// Populate game board
	for (let i = 0; i < 9; i++) {
		let slot = document.querySelector("[id='" + i + "'");
		slot.innerHTML = game_array[i];
	}

	return { start_game }

	

})();

gameboard.start_game();