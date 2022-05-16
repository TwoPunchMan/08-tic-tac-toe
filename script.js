// Tic-Tac-Toe script.js file

// Gameboard Module immediately invoked function expression (IIFE)
const gameboard = (() => {
	// html selectors
	const game_board_slots = document.querySelectorAll(".board-slot");
	const new_game_btn = document.querySelector(".new-game-btn");
	const current_player_html = document.querySelector("#current-player");
	const msg_box = document.querySelector(".message-box");
	
	let p1_input;
	let p2_input;
	let p1_avatar_name = document.querySelector("#p1-name");
	let p2_avatar_name = document.querySelector("#p2-name");

	let player_one_score_html;
	let player_two_score_html;

	// const variables
	const player_one_img_src = "images/pokeball.png";
	const player_two_img_src = "images/ultra-ball.png";

	// variables
	let player_one;
	let player_two;
	let current_player;
	let is_game_on;
	let game_array = [null, null, null, null, null, null, null, null, null];

	// Player object
	const Player = (name, mark) => {
		let player_score = 0;
		let player_name = name;

		const get_name = () => player_name;
		const set_name = (new_name) => player_name = new_name;
		const get_mark = () => mark;
		const get_score = () => player_score;
		const reset_score = () => player_score = 0;
		const add_score = () => ++player_score;
		return { get_name, set_name, get_mark, get_score, reset_score, add_score }
	}
	
	// coin flip to decide who goes first
	const decide_who_play_first = () => {
		let rand = Math.random()
		if (rand < .5) {
			current_player = player_one;
		} else {
			current_player = player_two;
		}
	}

	// generate either X or O randomly
	const generate_rand_xo = () => {
		let rand = Math.random();
		let img_xo = document.createElement("img");

		if (rand < .5) {
			img_xo.src = player_one_img_src;
		} else {
			img_xo.src = player_two_img_src;
		}

		return img_xo
	}

	// fill board with X's and O's randomly
	const generate_random_board_xos = (() => {
		for (let i = 0; i < 9; i++) {
			let slot = document.querySelector(`[id="${i}"]`);
			let img = generate_rand_xo();
			slot.appendChild(img);
		}
	})();
	
	// event listener functions
	game_board_slots.forEach(slot => 
		slot.addEventListener('click', () => {
			add_to_slot(slot);
		}
	));

	const add_to_slot = (slot) => {
		if (!is_game_on) {
			return
		}

		if (is_slot_taken(slot.id)) {
			console.log("That space is taken.");
			return;
		}
		
		if (current_player == player_one) {
			let p1_img = document.createElement("img");
			p1_img.src = player_one_img_src;
			slot.appendChild(p1_img);
		} else {
			let p2_img = document.createElement("img");
			p2_img.src = player_two_img_src;
			slot.appendChild(p2_img);
		}

		game_array[slot.id] = current_player.get_mark();
		let game = check_win_condition(current_player);
		
		if (!is_game_on) {
			show_game_result(game.game_status, game.current_player);
		}

		change_player();
	}

	new_game_btn.addEventListener('click', function() {
		start_game();
	});

	const is_slot_taken = (index) => {
		return game_array[index] != null;
	}

	const check_win_condition = (player) => {
		/*
		Whoever gets three in a row first wins
		If no winner then tie
		[0][1][2]
		[3][4][5]
		[6][7][8]
		
		*/
		let game_status;
		const mark = player.get_mark();
		if ((game_array[0] == mark && game_array[3] == mark && game_array[6] == mark) || 
			(game_array[1] == mark && game_array[4] == mark && game_array[7] == mark) ||
			(game_array[2] == mark && game_array[5] == mark && game_array[8] == mark) ||
			(game_array[0] == mark && game_array[4] == mark && game_array[8] == mark) || 
			(game_array[2] == mark && game_array[4] == mark && game_array[6] == mark) ||
			(game_array[0] == mark && game_array[1] == mark && game_array[2] == mark) ||
			(game_array[3] == mark && game_array[4] == mark && game_array[5] == mark) ||
			(game_array[6] == mark && game_array[7] == mark && game_array[8] == mark)
			) {
			is_game_on = false;
			game_status = "win";
			
			return { game_status, current_player };
		}
		
		let is_board_full = game_array.every((element) => {
			return element != null;
		});

		if (is_board_full) {
			game_status = "tie";
			is_game_on = false;
			return { game_status, current_player };
		}
	}

	// message of game outcome
	const show_game_result = (game_status, player=null) => {

		if (game_status == "tie") {
			msg_box.style.display = "flex";
			console.log("The game ends in a tie.");
			msg_box.innerHTML = "If he ties, he ties.";
		} else if (game_status == "win") {
			msg_box.style.display = "flex";
			if (player.get)
			console.log(`"The winner is ${player.get_name()}"`);
			msg_box.innerHTML = `The winner is ${player.get_name()}!`;
			player.add_score();
			document.querySelector(`#${parse_player_name_id(player.get_name())}`).innerHTML = player.get_score();
		}
	}

	// clears game board
	const clear_board = () => {
		game_array = [null, null, null, null, null, null, null, null, null];
		for (let i = 0; i < 9; i++) {
			let slot = document.querySelector(`[id="${i}"]`);
			slot.innerHTML = "";
		}
	}

	const initialize_players = (() => {
	
		// init p1, p2 input html selectors 
		p1_input = document.querySelector("#p1");
		p2_input = document.querySelector("#p2");

		p1_name = p1_input.value;
		p2_name = p2_input.value;

		// avatar naming
		p1_avatar_name.innerHTML = p1_name;
		p2_avatar_name.innerHTML = p2_name;

		player_one = Player(p1_name, "X");
		player_two = Player(p2_name, "O");

		// no spaces in name
		p1_name_no_space = p1_name.replace(/ /g, '-');
		p2_name_no_space = p2_name.replace(/ /g, '-');

		scores_html = document.querySelectorAll(".score");
		
		// score updating
		player_one_score_html = scores_html[0];
		player_one_score_html.setAttribute("id", p1_name_no_space);
		player_one_score_html.innerHTML = player_one.get_score();
		player_two_score_html = scores_html[1];
		player_two_score_html.setAttribute("id", p2_name_no_space);
		player_two_score_html.innerHTML = player_two.get_score();
		
		decide_who_play_first();
		current_player_html.innerHTML = current_player.get_name();
	})();

	// replace spaces with '-' in player name
	const parse_player_name_id = (name) => {
		return name.replace(/ /g, '-');
	}

	// alternate players turn
	const change_player = () => {
		const current_player_html = document.querySelector("#current-player");
		if (current_player == player_one) {
			current_player = player_two;
		} else {
			current_player = player_one;
		}

		current_player_html.innerHTML = current_player.get_name();
	}

	const start_game = () => {
		is_game_on = true;
		msg_box.style.display = "None";
		clear_board();

		// reset player score if name change
		if (player_one.get_name() != p1_input.value) {
			player_one.set_name(p1_input.value);
			player_one.reset_score();
			player_one_score_html.setAttribute("id", parse_player_name_id(p1_input.value));
			player_one_score_html.innerHTML = player_one.get_score();
			p1_avatar_name.innerHTML = p1_input.value; 
		}

		if (player_two.get_name() != p2_input.value) {
			player_two.set_name(p2_input.value);
			player_two.reset_score();
			player_two_score_html.setAttribute("id", parse_player_name_id(p2_input.value));
			player_two_score_html.innerHTML = player_two.get_score();
			p2_avatar_name.innerHTML = p2_input.value;
		}
	}

	return { start_game }
})();