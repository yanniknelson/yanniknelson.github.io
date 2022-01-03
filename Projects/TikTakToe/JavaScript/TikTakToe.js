currentPlayer = 0
computerPlayer = 1
board = []
current_state = []

function selectCellElement(cell) {
    if (cell.childElementCount > 0 || currentPlayer == computerPlayer || isTerminal(current_state)){
        return;
    }
    var x = parseInt(cell.id[0]);
    var y = parseInt(cell.id[2]);
    current_state[y*3 + x] = currentPlayer;
    var icon = document.createElement('div');
    if (currentPlayer == 0){
        icon.classList.add("nought");
        currentPlayer = 1
    } else {
        icon.classList.add("cross");
        currentPlayer = 0
    }
    cell.appendChild(icon);
    if (!isTerminal(current_state)) {
        var move = minmax(current_state);
        current_state[move] = computerPlayer;
        window.setTimeout(selectCell, 1000, move);
    }
}

function selectCell(move) {

    var cell = document.getElementById(`${move % 3},${Math.floor(move/3)}`);
    var icon = document.createElement('div');
    if (currentPlayer == 0){
        icon.classList.add("nought");
        currentPlayer = 1
    } else {
        icon.classList.add("cross");
        currentPlayer = 0
    }
    cell.appendChild(icon);
}

function isTerminal(state) {
    //check diagonals
    if (state[0] == state[4] && state[4] == state[8] && state[4] != -1) {
        return true;
    }
    if (state[6] == state[4] && state[4] == state[2] && state[4] != -1) {
        return true;
    }
    var sawempty = false
    for (var i = 0; i < 3; i++) {
        if (state[i*3] == -1 || state[i*3 + 1] == -1 || state[i*3 + 2] == -1) {
            sawempty = true
        }
        //check rows
        if (state[i*3] == state[i*3 + 1] && state[i*3 + 1] == state[i*3 + 2] && state[i*3 + 1] != -1) {
            return true;
        }
        //check columns
        if (state[i] == state[3 + i] && state[3 + i] == state[6 + i] && state[3 + i] != -1) {
            return true;
        }
    }
    //if we saw an empty space, the game isn't over, otherwise the game is over (and it was a draw)
    return !sawempty;
}

function eval(state) {
    if (state[0] == state[4] && state[4] == state[8]) {
        if (state[4] == computerPlayer) {
            return 1;
        } else {
            return -1;
        }
    }
    if (state[6] == state[4] && state[4] == state[2]) {
        if (state[4] == computerPlayer) {
            return 1;
        } else {
            return -1;
        }
    }
    for (var i = 0; i < 3; i++) {
        //check rows
        if (state[i*3] == state[i*3 + 1] && state[i*3 + 1] == state[i*3 + 2]) {
            if (state[i*3 + 1] == computerPlayer) {
                return 1;
            } else {
                return -1;
            }
        }
        //check columns
        if (state[i] == state[3 + i] && state[3 + i] == state[6 + i]) {
            if (state[3 + i] == computerPlayer) {
                return 1;
            } else {
                return -1;
            }
        }
    }
    //must be a draw
    return 0;
}

function result(state, action, player) {
    //return board state after action (x,y coord for given player)
    var res = [...state];
    res[action] = player;
    return res;
}

function getActions(state) {
    //return list of possible next moves (in x,y coordinates)
    var actions = []
    for (var i = 0; i < 9; i++) {
        if (state[i] == -1) {
            actions.push(i);
        }
    }
    return actions;
}

function minmax(state) {
    var actions = getActions(state);
    var costs = []
    for (var i = 0; i < actions.length; i++) {
        costs.push(min(result(state, actions[i], computerPlayer)));
    }
    var index = 0;
    for (var i = 0; i < costs.length; i++) {
        if (costs[i] > costs[index]) {
            index = i;
        }
    }
    return actions[index];
}

function min(state) {
    if (isTerminal(state)) {
        return eval(state);
    }
    var v = Infinity;
    var possibleActions = getActions(state);
    for (var i = 0; i < possibleActions.length; i++) {
        v = Math.min(v, max(result(state, possibleActions[i], (computerPlayer + 1) % 2)));
    }
    return v;
}

function max(state) {
    if (isTerminal(state)) {
        return eval(state);
    }
    var v = -Infinity;
    var possibleActions = getActions(state);
    for (var i = 0; i < possibleActions.length; i++) {
        v = Math.max(v, min(result(state, possibleActions[i], computerPlayer)));
    }
    return v;
}

function resetGame() {
    current_state = []
    for (var i = 0; i < 9; i++) {
            current_state.push(-1);
    }
}

window.onload = function () {
    var container = document.getElementById("TikTakToe");
    for (var i = 0; i < 3; i++) {
        var row = [];
        for (var j = 0; j < 3; j++) {
            cell = document.createElement('div');
            cell.classList.add("Cell");
            cell.setAttribute("id", `${j},${i}`);
            console.log(`${j},${i}`);
            cell.setAttribute("onClick", "selectCellElement(this)");
            container.appendChild(cell);
            row.push(cell);
        }
        board.push(row);
    }
    resetGame();
}

