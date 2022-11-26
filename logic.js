function createNode (row, column, heuristic, phase) { //returns node
    var node = document.createElement("div");
    node.setAttribute("row", row);
    node.setAttribute("column", column);
    node.setAttribute("heuristic", heuristic);
    node.setAttribute("phase", phase) //determines if passable, 1 is true
    node.classList.add("gridElement");
    node.addEventListener("mouseover", function(){
        if (this.classList.contains('wallEditing')){
        this.style.backgroundColor = 'black';
        this.phase = 0;
    }
    }
    );
    return node;
}


function createGrid () { 
    var grid = document.getElementById('Grid');
    var col = []; 
    for (x = 1; x <= 25; x ++ ){
        for (y = 1; y<= 10; y++) {
            var tempNode = createNode (y, x, 1, 1);
            grid.appendChild(tempNode);
        }
    }
}

function setNodes () { 
    const nodeList = document.getElementById('Grid').childNodes;
    nodeList[0].style.backgroundColor = 'red';
    nodeList[249].style.backgroundColor = 'red';
}

var click = 0;

function wallEdit() {
    click ++;
    let children = document.getElementById("Grid").childNodes;
    for (i = 1; i <= 248; i++) {
        console.log(children[i]);
        let tempNode = children[i];
        if (click % 2 === 1){
            tempNode.classList.add("wallEditing");
        }
        else {
            tempNode.classList.remove("wallEditing");
        }
    }
}

function refresh() {
    createGrid();
}


window.onload = () => {
    createGrid();
    setNodes();
}