import { nodeStartId, nodeEndId, nodeList} from "./boardCreation.js";
import { adjList} from "./main.js";
import { animEnd,setanimEnd } from "./DijkstraAlgo.js";
var finalPath;
var distances;
var intervalId;
var visitNodes; //to preserve the order
var speed = 5;
var INF = Infinity;


export function floydAlgo() {
    visitNodes = new Map();
    finalPath = [];
    distances = [];
    var distanceMatrix = [];
    var routeMatrix = [];
    var childNodes = document.getElementById('Grid').childNodes;
    let startN = document.querySelector('[data-node = "Start"]');
    let endN = document.querySelector('[data-node = "End"]');
    //these variables must be assigned in order to allow the function to be repeatable.
    for(let [node, neighbourList] of adjList){
        let workingMap = [];
        let routeMap = [];
        let nNodes = Array.from(neighbourList, x => x[0])
        for (let i = 0 ;i < childNodes.length; i ++) {
            if (childNodes[i] !== node && !nNodes.includes(childNodes[i]) && childNodes[i].getAttribute('phase') == 1 ){
                workingMap.push([childNodes[i], INF]);
                routeMap.push([childNodes[i], node]); //setting up both tables
            }
            else if (childNodes[i] === node && childNodes[i].getAttribute('phase') == 1) {
                workingMap.push([childNodes[i], 0]);
                routeMap.push([childNodes[i], null]); 
            }
            else if (nNodes.includes(childNodes[i]) && childNodes[i].getAttribute('phase') == 1 ){
                for (let x of neighbourList) {
                    if (x[0] === childNodes[i]) 
                    { //need to add condition
                        workingMap.push([childNodes[i], x[1]]);
                        routeMap.push([childNodes[i], node]); 
                        break;
                    }
                }
            }
        }
        if(node.getAttribute('phase') == 1){
            distanceMatrix.push([node, workingMap]);
            routeMatrix.push([node, routeMap])
        }
    }
    //updating values in matrix.
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

    //final path output

    findFP(startN, endN, routeMatrix);
    debugger;
    
    setanimEnd(false);
    let nodesfromDistanceMat = Array.from(distanceMatrix, x => x[0]);
    for(let i = 0; i < nodesfromDistanceMat.length; i++) {
        if (nodesfromDistanceMat[i] === startN){
            distances = distanceMatrix[i][1]
            distances = new Map(distances.map(([x,y]) => [x, y]))
            cleanVN (visitNodes, distances);
        }
    }
    console.log(finalPath);
    visitNodes = Array.from(visitNodes.keys()); //clean this up, only nodes that have non inf dist
    VisualColor(visitNodes, VisualiseFP);
    debugger;
    return distances.get(endN);
}

function VisualColor(iterable, callback) {
    var counter = 0;
    for(const node of iterable) {
        if (node != nodeList[nodeEndId] && node != nodeList[nodeStartId] && distances.get(node) !== INF){ //randomstart changed
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

function cleanVN(VN, distanceMap) { //
    for (let [key, value] of distanceMap) {
        if (value === INF) {
            console.log('ran')
            VN.delete(key);
        }
    }
}


function findFP(startN, endN, routeMatrix){
    var lowID = 0;
    finalPath.push(startN, endN);
    while(lowID !== finalPath.length - 1) {
        let intermediateResult = getIntermediateNode(finalPath[lowID], finalPath[lowID + 1], routeMatrix);
        console.log(intermediateResult);
        if (!intermediateResult[1]){ //if no intermediate
            lowID = lowID + 1;
        }
        else {
            finalPath.splice(lowID + 1, 0, intermediateResult[0] );
            debugger;
        }
    }
}

function getIntermediateNode(node1, node2, routeMatrix) {
    const nodesFromRouteMat =  Array.from(routeMatrix, x => x[0]);
    let idx;
    for (let i = 0; i < nodesFromRouteMat.length; i++) {
        if(nodesFromRouteMat[i] === node1) {
            idx = i; //finding index - potentially use map to improve efficiency
            //finding intermediate node;
            let routeRow = routeMatrix[i][1];
            for(let [node, intermediate] of routeRow) {
                console.log(node === node2);
                if (node === node2 && node !== node1 && intermediate !== null && intermediate !== node1){ //dodge line
                    return [intermediate, true];
                }
            }
            return[null, false] //if no intermediate node
        }
    }

}