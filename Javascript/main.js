import { dijkstraAlgo, setanimEnd, animEnd } from './DijkstraAlgo.js';
import { setNodes, createGrid, wallEdit, setClick, setnodeList, nodeList, nodeEndId} from './boardCreation.js';
import { aStarAlgo } from './AstarAlgo.js';
import { floydAlgo } from './FloydAlgo.js';
import {bfsAlgo} from './BFSAlgo.js';
import { dfsAlgo } from './DFSAlgo.js';


export var adjList;
export var precison = 100;
export var speed = 50;

var runTime;
export function setRuntime(x){runTime = x;}

var gridComputedStyle = window.getComputedStyle(document.getElementById('Grid'));
export const gridY = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
export const gridX = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;

window.wallEdit = wallEdit; //necessary for html onclick events, DO NOT TOUCH!!
window.start = start;   //necessary for html onclick events, DO NOT TOUCH!!
window.refresh = refresh;
window.assignSpeed = assignSpeed;

export function refresh() {
    if (animEnd === true) {
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
               neighbourList.push([currentNeighbour[i], Math.floor(Math.random() * 100)]) //change one for random weights, Math.floor(Math.random() * 100)
            }
            adjList.set(currentNode, neighbourList);
            
        }
    }
}
function writeToScreen (distance){
    let textElement = document.createElement('p');
    textElement.setAttribute('id', 'distanceText')
    textElement.style.textAlign = 'center';
    textElement.style.backgroundColor =  'rgb(232, 245, 51)';
    textElement.innerHTML = 'The total distance is ' + distance + 
    ', the algorithm took a total of ' + runTime + ' miliseconds.';
    let mainEle = document.getElementsByTagName('main')[0];
    let childEle = document.getElementById('Grid');
    mainEle.insertBefore(textElement, childEle);
} 
function writeToScreenFail() {
    let textElement = document.createElement('p');
    textElement.setAttribute('id', 'distanceText')
    textElement.style.textAlign = 'center';
    textElement.style.margin = '0.2rem'
    textElement.innerHTML = 'There is no solution!';
    let mainEle = document.getElementsByTagName('main')[0];
    let childEle = document.getElementById('Grid');
    mainEle.insertBefore(textElement, childEle);
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
        if(distance !== Infinity){
            writeToScreen(distance)
        }
        else {
            writeToScreenFail();
        }
    }
    else if (algoSelection === "A*" && animEnd === true) {
        clearforStart();
        try{
            document.getElementById('distanceText').remove()
        }
        catch{}
        let distance = aStarAlgo();
        if(distance !== Infinity){
            writeToScreen(distance)
        }
        else {
            writeToScreenFail();
        }
    }
    else if (algoSelection === "Floyd" && animEnd === true) {
        clearforStart();
        try{
            document.getElementById('distanceText').remove()
        }
        catch{}
        let distance = floydAlgo();
        if(distance !== Infinity){
            writeToScreen(distance)
        }
        else {
            writeToScreenFail();
        }
        

    }
    else if (algoSelection === "BFS" && animEnd === true) {
        clearforStart();
        try{
            document.getElementById('distanceText').remove()
        }
        catch{}
        let distance = bfsAlgo();
        if(distance !== undefined){
            writeToScreen(distance)
        }
        else {
            writeToScreenFail();
        }

    }
    else if (algoSelection === "DFS" && animEnd === true) {
        clearforStart();
        try{
            document.getElementById('distanceText').remove()
        }
        catch{}
        let distance = dfsAlgo();
        if(distance !== undefined){
            writeToScreen(distance)
        }
        else {
            writeToScreenFail();
        }

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
    setnodeList(document.getElementById('Grid').childNodes)
}
function assignSpeed() {
    let btn = document.getElementById('speedBtn');
    if(btn.value === 'slow') {
        speed = 30;
    }
    else if (btn.value === 'medium') {
        speed = 15;
    }
    else {
        speed = 5;
    }
}

window.onload = () => {
    createGrid();
    setNodes();
    adjListBuilder();
}



