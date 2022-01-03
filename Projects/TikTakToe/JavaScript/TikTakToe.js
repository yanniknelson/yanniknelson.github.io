player = 0
board = []

function selectCellElement(cell) {
    if (cell.childElementCount > 0){
        return;
    }
    icon = document.createElement('div');
    if (player == 0){
        icon.classList.add("nought");
        player = 1
    } else {
        icon.classList.add("cross");
        player = 0
    }
    cell.appendChild(icon)
}

function selectCell(x,y) {
    selectCellElement(document.getElementById(`${x},${y}`));
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
}

