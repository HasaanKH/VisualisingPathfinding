import { MinHeap } from './MinheapClass.js';
import { dijkstraAlgo } from './DijkstraAlgo.js';
import { createNode } from './nodeFactoryfunc.js';

export var nodeList;
export var distances = new Map(); //map of node to distance.
export var adjList = new Map();

var weightsArray = [];
var grid;
var gridY = 10;
var gridX = 25;

window.dijkstraAlgo = dijkstraAlgo; //necessary for onclick events
window.wallEdit = wallEdit;


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
    for (let y = 1; y < gridY + 1; y++){
        for(let x = 1; x < gridX + 1; x++){
            let currentNode = document.getElementById(y +' '+x);
            let currentNeighbour = [];
            currentNeighbour.push(document.getElementById(y+1 + ' ' + x.toString()));
            currentNeighbour.push(document.getElementById(y-1 + ' ' + x.toString()));
            currentNeighbour.push(document.getElementById(y + ' ' + (x-1).toString()));
            currentNeighbour.push(document.getElementById(y + ' ' + (x+1).toString()));
            currentNeighbour = currentNeighbour.filter(element => {
                return element !== undefined && element !== null;
              }
            );
            let neighbourList = [];
            for(let i = 0; i < currentNeighbour.length; i++) {
               neighbourList.push([currentNeighbour[i], 1])
            }
            adjList.set(currentNode, neighbourList);
        }
    }
}


window.onload = () => {
    createGrid();
    setNodes();
    adjListBuilder();
}


