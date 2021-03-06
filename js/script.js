/*----- constants -----*/
// This is the Model

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const LOOKUP = {
    '1': 'X',
    '-1': 'O',
    'null': '',
};



/*----- app's state (variables) -----*/
// This is also still part of the Model

let turn, winner, gameboard;



/*----- cached element references -----*/
// Technically the View

const $gameboardEl = $('#gameboard');
const $squareEls = $('.square');
const $buttonEl = $('#reset-btn');
const $messageEl = $('#message');

/*----- event listeners -----*/
// This is the Controller

$gameboardEl.on('click', handleMove);
$buttonEl.on('click', handleInit);

/*----- functions -----*/
// This is also part of the Controller
handleInit();

function handleInit() {
    //This function will do two things
        //Start the game
            //create an empty gameboard
            gameboard = new Array(9).fill().map(() => null);
            //assign the turn - player 1 goes first - x goes!
            turn = 1;
            //set the winner to false
            winner = false;
            //visualize the state of the game to the DOM - render()
            render();
        //Reset the game
}

function checkWinner() {
    //compare the positions of the players pieces (1 or -1) in the combos array
    for(let i = 0; i < COMBOS.length; i++) {
        if(Math.abs(gameboard[COMBOS[i][0]] + 
                    gameboard[COMBOS[i][1]] +
                    gameboard[COMBOS[i][2]]) === 3) {
                        return gameboard[COMBOS[i][0]]
                    }
    } if(gameboard.includes(null)) return false;
    return 'T'
}

 
function handleMove(event) {
    const position = event.target.dataset.index;
    if(winner || gameboard[position]) return;
    gameboard[position] = turn;

    //check to see if we have a winner
    winner = checkWinner();
    turn *= -1;
    render();
    
}

function render() {
    //render is going to look at the gameboard array
    gameboard.forEach(function(value, index) {
        $($squareEls[index]).text(LOOKUP[value])
    })
    //render will also update our message based on the turn or if we won
    if(!winner) {
        $messageEl.text(`It's Player ${LOOKUP[turn]}'s Turn`);
    } else if (winner === 'T') {
        $messageEl.text(`Tie Game`);
    } else {
        $messageEl.text(`Congratulations ${LOOKUP[winner]} Wins!`)
    }
}