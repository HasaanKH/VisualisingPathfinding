import { animEnd } from "./DijkstraAlgo.js";
export var nodeList;
export var nodeStartId = 0; //choose the location of the start node.
var editSigNodes = false; //checks whether sig nodes can be moved, true is yes.
var nodeOrder; //whether the node is start or end for changing data-node.
var click = 0; //tracks whether wall editing is active if mod 2 == 1, its active.
var gridComputedStyle = window.getComputedStyle(document.getElementById('Grid'));
const gridY = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
const gridX = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
export var nodeEndId = gridX * gridY -1;
export function setClick() {
    click = 0;
}
export function setnodeList(value) {
    nodeList = value;
}
var trigger;


var grid; //holds all the nodes, the board.

function createNode (row, column, heuristic, phase) { //returns node
    var node = document.createElement("div");
    node.setAttribute("row", row);
    node.setAttribute("column", column);
    node.setAttribute("heuristic", heuristic);
    node.setAttribute("phase", phase) //determines if passable, 1 is true
    node.setAttribute("id", row.toString() +' '+ column.toString());
    node.classList.add('unselectable');
    node.classList.add("gridElement");
    node.addEventListener("mouseover", function(){
        if (this.classList.contains('wallEditing') && animEnd && this.dataset.node !== 'End' && this.dataset.node !== 'Start' && trigger )
        {
            this.style.backgroundColor = 'black';
            this.phase = 0;
            try{
                this.classList.remove('visited');
                this.classList.remove('finalPath');
            }
            catch{}
        }
        else if (editSigNodes && this.dataset.node !== 'End' && this.dataset.node !== 'Start' && animEnd) {
            this.classList.add('potentialSigNode');
        }
    }
    );
    node.addEventListener('click', function(){
        if (this.dataset.node === 'Start' && click%2 === 0 && animEnd){
            this.style.backgroundColor = 'white';
            editSigNodes = true;
            nodeOrder = 'Start';
            this.removeAttribute('data-node')

        }
        else if (this.dataset.node === 'End' && click%2 === 0 && animEnd){
            this.style.backgroundColor = 'white';
            editSigNodes = true;
            nodeOrder = 'End';
            this.removeAttribute('data-node');

        }
        else if (editSigNodes && this.dataset.node !== 'End' && this.dataset.node !== 'Start' && animEnd) {
            editSigNodes = false;
            try{
                this.classList.remove('visited');
                this.classList.remove('potentialSigNode');
                this.classList.remove('finalPath');
            }
            catch{}
            this.style.backgroundColor = 'red';
            this.setAttribute('data-node', nodeOrder);
            if (nodeOrder === 'Start'){
                nodeStartId = gridX * (row - 1) + column - 1;
            }
            else {
                nodeEndId = gridX * (row - 1) + column - 1;
            }
        }
    })
    node.addEventListener('mousedown', function(){
        trigger = true;
        if (this.classList.contains('wallEditing') && animEnd && this.dataset.node !== 'End' && this.dataset.node !== 'Start') {
            this.style.backgroundColor = 'white';
            this.phase = 1;
        }
    })
    node.addEventListener('mouseout', function(){
        if (editSigNodes && this.dataset.node !== 'End' && this.dataset.node !== 'Start' && animEnd) {
            this.classList.remove('potentialSigNode');
            this.style.background = 'white';
        }  
    })
    node.addEventListener('mouseup', () => {trigger = false;})
    return node;
}

export function setNodes () {  //sets start and end nodes.
    nodeList = document.getElementById('Grid').childNodes;
    nodeList[nodeStartId].style.backgroundColor = 'red'; //var changed
    nodeList[nodeStartId].setAttribute('data-node', 'Start'); //var changed
    console.log(nodeEndId);
    nodeList[nodeEndId].setAttribute('data-node', 'End');
    nodeList[nodeEndId].style.backgroundColor = 'red';
}

export function createGrid () {  //appends x axis wise
    grid = document.getElementById('Grid');
    for (var y = 1; y <= gridY; y ++ ){
        for (var x = 1; x<= gridX; x++) {
            let num = 1;
            if (document.getElementById('weightButton').checked){
                num = Math.floor(Math.random() * 100);
            }
            var tempNode = createNode (y, x, num, 1);
            if(document.getElementById('weightButton').checked) {
                tempNode.innerHTML = num;
            }
            grid.appendChild(tempNode);
        }
    }
}

export function wallEdit() { 
    click ++;
    let children = document.getElementById("Grid").childNodes;
    for (let i = 0; i <= gridX * gridY - 1; i++) {
        let tempNode = children[i];
        if (click % 2 === 1 && animEnd){
            tempNode.classList.add("wallEditing");
        }
        else {
            tempNode.classList.remove("wallEditing");
        }
    }
}