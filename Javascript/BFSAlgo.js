import { adjList, precison, setRuntime, speed} from "./main.js";
import { nodeStartId, nodeEndId, nodeList} from "./boardCreation.js";
import { setanimEnd } from "./DijkstraAlgo.js";

var visitedNodes; //dequeued items, pushed here.
var parentNodes; //holds parent node of each item. {k: node, v: parent}
var distanceMap; //holds the distance of each node from root node. {k: node, v: distance}
var finalPath;
var intervalId;

export function bfsAlgo() {
    // 1. Add root node to the queue, and mark it as visited(already explored).
    // 2. Loop on the queue as long as it's not empty.
    //    1. Get and remove the node at the top of the queue(current).
    //    2. For every non-visited child of the current node, do the following: 
    //        1. Mark it as visited, NOT for walls.
    //        2. Check if it's the goal node, If so, then return it.
    //        3. Otherwise, push it to the queue,parentNodes and distanceMAP, NOT FOR WALLS.
    // 3. If queue is empty, then goal node was not found!
    //clear inf distance from visited.
    let runTime = performance.now()
    parentNodes = new Map(); 
    distanceMap = new Map();
    finalPath = [];
    visitedNodes = [];

    var startN = nodeList[nodeStartId];
    var targetN = nodeList[nodeEndId]
    var queue = [];
    queue.push(startN);
    parentNodes.set(startN, null);
    distanceMap.set(startN, 0);
    visitedNodes.push(startN);
    while (queue.length !== 0) {
        let removedNode = queue.shift();
        let neighbourArr = adjList.get(removedNode);
        for(let neighbour of neighbourArr) {
            if (!visitedNodes.includes(neighbour[0]) && neighbour[0].getAttribute('phase') == 1) { //all atributes are str.
                visitedNodes.push(neighbour[0]);
                parentNodes.set(neighbour[0], removedNode);
                distanceMap.set(neighbour[0], distanceMap.get(removedNode) + neighbour[1]);
                if (neighbour[0] === targetN) {
                    break;
                }
                queue.push(neighbour[0]);
            }
            else if (neighbour[0].getAttribute('phase') == 0) {
                distanceMap.set(neighbour[0], Infinity);
                parentNodes.set(neighbour[0], null);
                
            }
        }
    }
    findFP();
    setanimEnd(false)
    visualiseNodes(visitedNodes, visualiseFP);
    let runTimeEnd = performance.now();
    setRuntime(Math.trunc((runTimeEnd - runTime)*precison)/precison);
    return distanceMap.get(targetN); // return the distance of the target node from the start node.

}

function visualiseNodes(iterable, callback) {
    var counter = 0;
    for(const node of iterable) {
        if (node != nodeList[nodeEndId] && node != nodeList[nodeStartId] && distanceMap.get(node) !== Infinity){ //randomstart changed
            counter = counter + speed;
            setTimeout(() => {node.classList.add('visited');} , counter);
        }
    } 
    intervalId = setInterval(() => { //solves async problem of final path loading before the end of first anim.
        let i = iterable.length - 3; //-1 for array, -2 for start and end nodes.
        if(iterable[i].classList.contains('visited')){
            setanimEnd(true);
            callback(finalPath)
        }
    },500)   

}

function findFP() { //tested
    let currentN = nodeList[nodeEndId];
    finalPath.push(currentN);
    while(!finalPath.includes(nodeList[nodeStartId])) {
        currentN = parentNodes.get(currentN);
        if (currentN === undefined) {
            break;
        }
        finalPath.push(currentN);
    }
}

function visualiseFP(Fp){
    var counter = 0;
    for(let i = 1; i < Fp.length-1; i++) {
        counter = counter + speed;
        setTimeout(() => {Fp[i].classList.add('finalPath');} , counter);
    } 
    clearInterval(intervalId);
}