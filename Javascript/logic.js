import { dijkstraAlgo } from './DijkstraAlgo.js';
import { setNodes, createGrid } from './boardCreation.js';

export var distances = new Map(); //map of node to distance.
export var adjList = new Map();



var gridY = 10;
var gridX = 25;

window.dijkstraAlgo = dijkstraAlgo; //necessary for onclick events
window.wallEdit = wallEdit;



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


