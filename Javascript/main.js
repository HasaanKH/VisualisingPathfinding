import { dijkstraAlgo } from './DijkstraAlgo.js';
import { setNodes, createGrid, wallEdit} from './boardCreation.js';

export var distances = new Map(); //map of node to distance.
export var adjList = new Map();



var gridY = 10;
var gridX = 25;

window.wallEdit = wallEdit; //necessary for html onclick events, DO NOT TOUCH!!
window.start = start;   //necessary for html onclick events, DO NOT TOUCH!!



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

function start() {
    let algoSelection = document.getElementById('algorithm').value;
    if (algoSelection === "Dijkstra"){
        dijkstraAlgo();
    }
}


window.onload = () => {
    createGrid();
    setNodes();
    adjListBuilder();
}


