world = [];

width = 48;
height = 20;

function switch_State(clicked_elem) {
    clicked_elem.classList.toggle("Alive");
}

function getAliveNeighbours(row, column) {
    rows = [(row - 1 + height) % height, (row + height) % height, (row + 1 + height) % height];
    cols = [(column - 1 + width) % width, (column + width) % width, (column + 1 + width) % width];
    sum = 0;
    rows.forEach(rw => {
        cols.forEach(cl => {
            if (!(row == rw && column == cl) && world[rw][cl].classList.contains("Alive")) {
                sum++;
            }
        })
    });
    return sum;
}

function fillWorld(newWorldState) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            if (newWorldState[i][j] == 1) {
                if (!world[i][j].classList.contains("Alive")) {
                    world[i][j].classList.toggle("Alive")
                }
            } else {
                if (world[i][j].classList.contains("Alive")) {
                    world[i][j].classList.toggle("Alive")
                }
            }
        }
    }
}

function nextWorld() {
    nextWorldState = []
    for (var i = 0; i < height; i++) {
        var row = []
        for (var j = 0; j < width; j++) {
            var livingNeighbours = getAliveNeighbours(i, j);
            if (world[i][j].classList.contains("Alive")) {
                if (livingNeighbours >= 2 && livingNeighbours <= 3) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            } else {
                if (livingNeighbours == 3) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
        }
        nextWorldState.push(row)
    }
    fillWorld(nextWorldState)
}

function clearWorld() {
    nextWorldState = []
    for (var i = 0; i < height; i++) {
        var row = []
        for (var j = 0; j < width; j++) {
            row.push(0);
        }
        nextWorldState.push(row)
    }
    fillWorld(nextWorldState)
}

function play() {
    playHandle = window.setInterval(nextWorld, 400);
}

function pause() {
    clearInterval(playHandle)
}

window.onload = function () {
    var container = document.getElementById("GameOfLifeDemo");
    for (var i = 0; i < height; i++) {
        var row = [];
        for (var j = 0; j < width; j++) {
            cell = document.createElement('div');
            cell.classList.add("Cell");
            cell.setAttribute("id", `${i},${j}`);
            cell.setAttribute("onClick", "switch_State(this)");
            container.appendChild(cell);
            row.push(cell);
        }
        world.push(row);
    }
    document.getElementById("Step").setAttribute("onClick", "nextWorld()");
    document.getElementById("Clear").setAttribute("onClick", "clearWorld()");
    document.getElementById("Play").setAttribute("onClick", "play()");
    document.getElementById("Pause").setAttribute("onClick", "pause()");
}

