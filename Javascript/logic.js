import { MinHeap } from './MinheapClass.js';
import { dijkstraAlgo } from './DijkstraAlgo.js';

export var nodeList;
export var distances = new Map(); //map of node to distance.
export var visitNodes = [];
export var adjList = new Map();

var weightsArray = [];
var grid;
var gridY = 10;
var gridX = 25;

window.dijkstraAlgo = dijkstraAlgo; //necessary for onclick events


function createNode (row, column, heuristic, phase) { //returns node
    var node = document.createElement("div");
    node.setAttribute("row", row);
    node.setAttribute("column", column);
    node.setAttribute("heuristic", heuristic);
    node.setAttribute("phase", phase) //determines if passable, 1 is true
    node.setAttribute('sig', 0) //whether the node is significant or not e.g start = 1.
    node.setAttribute("id", row.toString() +' '+ column.toString());
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

function createGrid () {  //appends x axis wise
    grid = document.getElementById('Grid');
    let workingArray = [];
    for (var y = 1; y <= 10; y ++ ){
        for (var x = 1; x<= 25; x++) {
            var tempNode = createNode (y, x, 1, 1);
            grid.appendChild(tempNode);
            workingArray.push(tempNode);
        }
        weightsArray.push(workingArray);
    }
}

function setNodes () { 
    nodeList = document.getElementById('Grid').childNodes;
    nodeList[0].style.backgroundColor = 'red';
    nodeList[0].sig = 1;
    nodeList[249].style.backgroundColor = 'red';
}

var click = 0;
function wallEdit() {
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


function adjListBuilder () {
    for (let y = 1; y < gridY; y++){
        for(let x = 1; x < gridX; x++){
            let currentNode = document.getElementById(y.toString()+' '+x.toString());
            let neighbourX = document.getElementById(y.toString()+' '+ (x+1).toString());
            let neighbourY = document.getElementById((y+1).toString()+' '+ x.toString());
            adjList.set(currentNode, [[neighbourX, 1], [neighbourY, 1]]); //node, distance - default value 1, subject to change.
        }
    }
    for (let x=1; x<gridX; x++) {
        let currentNode = document.getElementById('10'+' '+x.toString());
        adjList.set(currentNode, []); 
    }
    for(let y=1; y<gridY; y++) {
        let currentNode = document.getElementById(y.toString()+' '+'25');
        adjList.set(currentNode, []); 
    }
    adjList.set(document.getElementById('9'+' '+'25'), [[document.getElementById('10'+' '+'25'), 1]]);
    adjList.set(document.getElementById('10'+' '+'24'), [[document.getElementById('10'+' '+'25'), 1]]);
    adjList.set(document.getElementById('10'+' '+'25'), []);
}


window.onload = () => {
    createGrid();
    setNodes();
    adjListBuilder();
}


