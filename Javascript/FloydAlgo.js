import { nodeStartId, nodeEndId, nodeList} from "./boardCreation.js";
import { adjList} from "./main.js";
import { animEnd,setanimEnd } from "./DijkstraAlgo.js";
var finalPath;
var distances;
var intervalId;
var visitNodes; //to preserve the order
var speed = 5;


export function floydAlgo() {
    visitNodes = new Map();
    finalPath = [];
    distances = [];
    var distanceMatrix = [];
    var routeMatrix = [];
    var childNodes = document.getElementById('Grid').childNodes;
    var INF = 10000000;
    let startN = document.querySelector('[data-node = "Start"]');
    let endN = document.querySelector('[data-node = "End"]');
    //these variables must be assigned in order to allow the function to be repeatable.
    for(let [node, neighbourList] of adjList){
        let workingMap = [];
        let routeMap = [];
        let nNodes = Array.from(neighbourList, x => x[0])
        for (let i = 0 ;i < childNodes.length; i ++) {
            if (childNodes[i] !== node && !nNodes.includes(childNodes[i]) ){
                workingMap.push([childNodes[i], INF]);
                routeMap.push([childNodes[i], node]); //setting up both tables
            }
            else if (childNodes[i] === node) {
                workingMap.push([childNodes[i], 0]);
                routeMap.push([childNodes[i], null]); 
            }
            else if (nNodes.includes(childNodes[i])){
                for (let x of neighbourList) {
                    if (x[0] === childNodes[i]) {
                        workingMap.push([childNodes[i], x[1]]);
                        routeMap.push([childNodes[i], node]); 
                        break;
                    }
                }
            }
        }
        distanceMatrix.push([node, workingMap]);
        routeMatrix.push([node, routeMap])
    }
    //init matricies complete.
    for(let i = 0 ; i < distanceMatrix.length; i ++) {
        let node = distanceMatrix[i][0];;
        let distanceMap = distanceMatrix[i][1]; //iterator not map
        for (let x = 0; x < distanceMap.length; x ++){
            for (let y = 0; y < distanceMap.length; y ++) {
                let distRow = distanceMatrix[x][1];
                if (distanceMap[x][1] + distanceMap[y][1] < distRow[y][1]) {
                    visitNodes.set(distRow[y][0], true);
                    distRow[y][1] = distanceMap[x][1] + distanceMap[y][1];
                    routeMatrix[x][1][y][1] = node;
                }
            }
        }
    }
    //code functional
    const nodesfromDistanceMat = Array.from(distanceMatrix, x => x[0]);
    let currentNode = endN; //keeping track of intermediate nodes.
    while (currentNode !== startN) {
        for (let i = 0; i < nodesfromDistanceMat.length; i++) {
            if (currentNode === nodesfromDistanceMat[i]) {
                finalPath.push(currentNode);
                let currentNoderow = routeMatrix[i][1];
                for (let x of currentNoderow) {
                    if (x[0] === startN) {
                        if (x[1] !== currentNode){
                            currentNode = x[1];
                        }
                        else {
                            finalPath.push(currentNode);
                            currentNode = startN;
                        }
                        break;
                    }
                }
            }
        }
    }
    setanimEnd(false);
    for(let i = 0; i < nodesfromDistanceMat.length; i++) {
        if (nodesfromDistanceMat[i] === startN){
            distances = distanceMatrix[i][1]
            distances = new Map(distances.map(([x,y]) => [x, y]))
        }
    }
    visitNodes = Array.from(visitNodes.keys());
    VisualColor(visitNodes, VisualiseFP);
    return distances.get(endN);
}

function VisualColor(iterable, callback) {
    var counter = 0;
    for(const node of iterable) {
        if (node != nodeList[nodeEndId] && node != nodeList[nodeStartId] && distances.get(node) != 10000000){ //randomstart changed
            counter = counter + speed;
            setTimeout(() => {node.classList.add('visited');} , counter);
        }
    } 
    intervalId = setInterval(() => { //solves async problem of final path loading before the end of first anim.
        let i = iterable.length - 2;
        if(iterable[i].classList.contains('visited')){
            setanimEnd(true);
            callback(finalPath)
        }
    },500)   
}


function VisualiseFP(Fp){
    var counter = 0;
    for(let i = 1; i < Fp.length-1; i++) {
        counter = counter + speed;
        setTimeout(() => {Fp[i].classList.add('finalPath');} , counter);
    } 
    clearInterval(intervalId);
}