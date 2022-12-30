import { dijkstraAlgo, setanimEnd } from './DijkstraAlgo.js';
import { setNodes, createGrid, wallEdit, setClick} from './boardCreation.js';

export var distances = new Map(); //map of node to distance.
export var adjList = new Map();

export var gridY = 10;
export var gridX = 25;

window.wallEdit = wallEdit; //necessary for html onclick events, DO NOT TOUCH!!
window.start = start;   //necessary for html onclick events, DO NOT TOUCH!!
window.refresh = refresh;


function refresh() {
    let childrenNodes = document.getElementById('Grid').childNodes;
    for (let i = 249; i > -1; i--) { //only works in reverse?
        childrenNodes[i].remove();
    }
    adjList = new Map(); //need to clear variables before refreshing.
    setanimEnd(true);
    setClick;
    createGrid();
    setNodes();
    adjListBuilder();
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
               neighbourList.push([currentNeighbour[i], Number(currentNeighbour[i].getAttribute('heuristic'))])
            }
            adjList.set(currentNode, neighbourList);
            
        }
    }
    console.log(adjList);
}

function start() {
    let algoSelection = document.getElementById('algorithm').value;
    if (algoSelection === "Dijkstra"){
        let distance = dijkstraAlgo();
        document.getElementsByTagName('nav')[0].innerHTML = distance;
    }
}


window.onload = () => {
    createGrid();
    setNodes();
    adjListBuilder();
}


