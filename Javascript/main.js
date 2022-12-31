import { dijkstraAlgo, setanimEnd, animEnd } from './DijkstraAlgo.js';
import { setNodes, createGrid, wallEdit, setClick, setnodeList, nodeList} from './boardCreation.js';
import { aStarAlgo } from './AstarAlgo.js';
import { floydAlgo } from './FloydAlgo.js';


export var adjList;

var gridComputedStyle = window.getComputedStyle(document.getElementById('Grid'));
export const gridY = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
export const gridX = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;

window.wallEdit = wallEdit; //necessary for html onclick events, DO NOT TOUCH!!
window.start = start;   //necessary for html onclick events, DO NOT TOUCH!!
window.refresh = refresh;


function refresh() {
    let childrenNodes = document.getElementById('Grid').childNodes;
    for (let i = gridX * gridY - 1; i > -1; i--) { //only works in reverse?
        childrenNodes[i].remove();
    }
    try{
        document.getElementById('distanceText').remove()
    }
    catch{}
    setanimEnd(true);
    setClick();
    createGrid();
    setNodes();
    adjListBuilder();
    setnodeList(document.getElementById('Grid').childNodes)
}

function adjListBuilder () {
    adjList = new Map(); //need to clear variables before refreshin
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
    if (algoSelection === "Dijkstra" && animEnd === true){
        clearforStart();
        try{
            document.getElementById('distanceText').remove()
        }
        catch{}
        let distance = dijkstraAlgo();
        let textElement = document.createElement('p');
        textElement.setAttribute('id', 'distanceText')
        textElement.style.textAlign = 'center';
        textElement.style.margin = '0.2rem'
        textElement.innerHTML = 'The total distance is ' + distance;
        let mainEle = document.getElementsByTagName('main')[0];
        let childEle = document.getElementById('Grid');
        mainEle.insertBefore(textElement, childEle);
    }
    else if (algoSelection === "A*" && animEnd === true) {
        clearforStart();
        try{
            document.getElementById('distanceText').remove()
        }
        catch{}
        let distance = aStarAlgo();
        let textElement = document.createElement('p');
        textElement.setAttribute('id', 'distanceText')
        textElement.style.textAlign = 'center';
        textElement.style.margin = '0.5rem'
        textElement.innerHTML = 'The total distance is ' + distance;
        let mainEle = document.getElementsByTagName('main')[0];
        let childEle = document.getElementById('Grid');
        mainEle.insertBefore(textElement, childEle);
    }
    else if (algoSelection === "Floyd" && animEnd === true) {
        clearforStart();
        try{
            document.getElementById('distanceText').remove()
        }
        catch{}
        let distance = floydAlgo();
        let textElement = document.createElement('p');
        textElement.setAttribute('id', 'distanceText')
        textElement.style.textAlign = 'center';
        textElement.style.margin = '0.5rem'
        textElement.innerHTML = 'The total distance is ' + distance;
        let mainEle = document.getElementsByTagName('main')[0];
        let childEle = document.getElementById('Grid');
        mainEle.insertBefore(textElement, childEle);
        

    }
}
function clearforStart() {
    for (let x of nodeList) {
        try{
            x.classList.remove('visited');
            x.classList.remove('finalPath');
        }
        catch{}
    }
    setanimEnd(true);
    setClick();
    adjListBuilder();
    setnodeList(document.getElementById('Grid').childNodes)
}

window.onload = () => {
    createGrid();
    setNodes();
    adjListBuilder();
}


