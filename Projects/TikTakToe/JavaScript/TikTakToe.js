currentPlayer = 0
computerPlayer = 1
board = []
current_state = []

function selectCellElement(cell) {
    if (cell.childElementCount > 0 || currentPlayer == computerPlayer || TikTakToe_isTerminal(current_state)){
        return;
    }
    let x = parseInt(cell.id[0]);
    let y = parseInt(cell.id[2]);
    current_state[y*3 + x] = currentPlayer;
    let icon = document.createElement('div');
    if (currentPlayer == 0){
        icon.classList.add("nought");
        currentPlayer = 1
    } else {
        icon.classList.add("cross");
        currentPlayer = 0
    }
    cell.appendChild(icon);
    if (!TikTakToe_isTerminal(current_state)) {
        let move = minmax(current_state, TikTakToe_isTerminal, TikTakToe_eval, TikTakToe_getActions, TikTakToe_result);
        current_state[move] = computerPlayer;
        window.setTimeout(selectCell, 1000, move);
    }
}

function selectCell(move) {

    let cell = document.getElementById(`${move % 3},${Math.floor(move/3)}`);
    let icon = document.createElement('div');
    if (currentPlayer == 0){
        icon.classList.add("nought");
        currentPlayer = 1
    } else {
        icon.classList.add("cross");
        currentPlayer = 0
    }
    cell.appendChild(icon);
}

function TikTakToe_isTerminal(state) {
    //check diagonals
    if (state[0] == state[4] && state[4] == state[8] && state[4] != -1) {
        return true;
    }
    if (state[6] == state[4] && state[4] == state[2] && state[4] != -1) {
        return true;
    }
    let sawempty = false
    for (let i = 0; i < 3; i++) {
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

function TikTakToe_eval(state, depth) {
    if (state[0] == state[4] && state[4] == state[8]) {
        if (state[4] == computerPlayer) {
            return 1/depth;
            } else {
                return -1/depth;
            }
    }
    if (state[6] == state[4] && state[4] == state[2]) {
        if (state[4] == computerPlayer) {
            return 1/depth;
            } else {
                return -1/depth;
            }
    }
    for (let i = 0; i < 3; i++) {
        //check rows
        if (state[i*3] == state[i*3 + 1] && state[i*3 + 1] == state[i*3 + 2]) {
            if (state[i*3 + 1] == computerPlayer) {
                return 1/depth;
            } else {
                return -1/depth;
            }
        }
        //check columns
        if (state[i] == state[3 + i] && state[3 + i] == state[6 + i]) {
            if (state[3 + i] == computerPlayer) {
                return 1/depth;
            } else {
                return -1/depth;
            }
        }
    }
    //must be a draw
    return 0;
}

function TikTakToe_result(state, action, player) {
    //return board state after action (x,y coord for given player)
    let res = [...state];
    res[action] = player;
    return res;
}

function TikTakToe_getActions(state) {
    //return list of possible next moves (in x,y coordinates)
    let actions = []
    for (let i = 0; i < 9; i++) {
        if (state[i] == -1) {
            actions.push(i);
        }
    }
    return actions;
}

function minmax(state, isTerminal, eval, getActions, result) {
    let actions = getActions(state);
    let costs = []
    for (let i = 0; i < actions.length; i++) {
        costs.push(min(result(state, actions[i], computerPlayer), 1, isTerminal, eval, getActions, result));
    }
    let index = 0;
    for (let i = 0; i < costs.length; i++) {
        if (costs[i] > costs[index]) {
            index = i;
        }
    }
    return actions[index];
}

function min(state, depth, isTerminal, eval, getActions, result) {
    if (isTerminal(state)) {
        return eval(state, depth);
    }
    let v = Infinity;
    let possibleActions = getActions(state);
    for (let i = 0; i < possibleActions.length; i++) {
        v = Math.min(v, max(result(state, possibleActions[i], (computerPlayer + 1) % 2), depth+1, isTerminal, eval, getActions, result));
    }
    return v;
}

function max(state, depth, isTerminal, eval, getActions, result) {
    if (isTerminal(state)) {
        return eval(state, depth);
    }
    let v = -Infinity;
    let possibleActions = getActions(state);
    for (let i = 0; i < possibleActions.length; i++) {
        v = Math.max(v, min(result(state, possibleActions[i], computerPlayer), depth+1, isTerminal, eval, getActions, result));
    }
    return v;
}

function resetGame() {
    current_state = []
    for (let i = 0; i < 9; i++) {
            current_state.push(-1);
    }
}

window.onload = function () {
    let container = document.getElementById("TikTakToe");
    for (let i = 0; i < 3; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
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

