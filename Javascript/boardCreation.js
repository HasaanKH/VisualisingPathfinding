import { gridX, gridY } from "./main.js";
export var nodeList;
export var nodeStartId = 0; //choose the location of the start node.
export var nodeEndId = 249;
var editSigNodes = false; //checks whether sig nodes can be moved, true is yes.
var nodeOrder; //whether the node is start or end for changing data-node.

var grid; //holds all the nodes, the board.

function createNode (row, column, heuristic, phase) { //returns node
    var node = document.createElement("div");
    node.setAttribute("row", row);
    node.setAttribute("column", column);
    node.setAttribute("heuristic", heuristic);
    node.setAttribute("phase", phase) //determines if passable, 1 is true
    node.setAttribute("id", row.toString() +' '+ column.toString());
    node.classList.add("gridElement");
    node.addEventListener("mouseover", function(){
        if (this.classList.contains('wallEditing'))
        {
            this.style.backgroundColor = 'black';
            this.phase = 0;
        }
        else if (editSigNodes) {
            this.classList.add('potentialSigNode');
        }
    }
    );
    node.addEventListener('click', function(){
        if (this.dataset.node == 'Start'){
            this.style.backgroundColor = 'white';
            editSigNodes = true;
            nodeOrder = 'Start';
            this.removeAttribute('data-node')

        }
        else if (this.dataset.node == 'End'){
            this.style.backgroundColor = 'white';
            editSigNodes = true;
            nodeOrder = 'End';
            this.removeAttribute('data-node');

        }
        else if (editSigNodes) {
            editSigNodes = false;
            this.classList.remove('potentialSigNode');
            this.style.background = 'red';
            this.setAttribute('data-node', nodeOrder);
            if (nodeOrder === 'Start'){
                nodeStartId = gridX * (row - 1) + column - 1;
            }
            else {
                nodeEndId = gridX * (row - 1) + column - 1;
            }
        }
    }
    )
    node.addEventListener('mouseout', function(){
        if (editSigNodes) {
            this.classList.remove('potentialSigNode');
            this.style.background = 'white';
        }  
    })
    return node;
}

export function setNodes () {  //sets start and end nodes.
    nodeList = document.getElementById('Grid').childNodes;
    nodeList[nodeStartId].style.backgroundColor = 'red'; //var changed
    nodeList[nodeStartId].setAttribute('data-node', 'Start'); //var changed
    nodeList[249].setAttribute('data-node', 'End');
    nodeList[249].style.backgroundColor = 'red';
}

export function createGrid () {  //appends x axis wise
    grid = document.getElementById('Grid');
    for (var y = 1; y <= 10; y ++ ){
        for (var x = 1; x<= 25; x++) {
            var tempNode = createNode (y, x, 1, 1);
            grid.appendChild(tempNode);
        }
    }
}

var click = 0;
export function wallEdit() { //needs updating
    click ++;
    let children = document.getElementById("Grid").childNodes;
    for (let i = 1; i <= 248; i++) {
        let tempNode = children[i];
        if (click % 2 === 1){
            tempNode.classList.add("wallEditing");
        }
        else {
            tempNode.classList.remove("wallEditing");
        }
    }
}