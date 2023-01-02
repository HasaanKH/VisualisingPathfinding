import { adjList, precison, setRuntime, speed} from "./main.js";
import { nodeStartId, nodeEndId, nodeList} from "./boardCreation.js";
import { setanimEnd } from "./DijkstraAlgo.js";

var visitedNodes; //dequeued items, pushed here.
var parentNodes; //holds parent node of each item. {k: node, v: parent}
var distanceMap; //holds the distance of each node from root node. {k: node, v: distance}
var finalPath;
var intervalId;

export function dfsAlgo() {
    let runTime = performance.now()
    parentNodes = new Map(); 
    distanceMap = new Map();
    finalPath = [];
    visitedNodes = [];

    var startN = nodeList[nodeStartId];
    var targetN = nodeList[nodeEndId]
    var stack = []; //used to traverse graph as deep as possible

    //setting up the stack
    stack.push(startN);
    parentNodes.set(startN, null);
    distanceMap.set(startN, 0);

    while (stack.length !== 0 ) {
        let currentN = stack.pop();
        let neighbourR = adjList.get(currentN); //[node, weight]
        for(let node of neighbourR) { //updating key ds
            if ((node[0] === targetN)){
                parentNodes.set(node[0], currentN);
                distanceMap.set(node[0], distanceMap.get(currentN) + node[1]);
                break;
            }
            else if (!stack.includes(node[0]) && distanceMap.get(node[0]) === undefined){
                parentNodes.set(node[0], currentN);
                distanceMap.set(node[0], distanceMap.get(currentN) + node[1]);
                stack.push(node[0]);
                visitedNodes.push(node[0]);

            }
        }
    }
    console.log(parentNodes); //works
    findFP();
    setanimEnd(false)
    visualiseNodes(visitedNodes, visualiseFP);
    setanimEnd(true);
    let runTimeEnd = performance.now();
    setRuntime(Math.trunc((runTimeEnd - runTime)*precison)/precison);
    return distanceMap.get(targetN); // return the distance of the target node from the start node.
    
   
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

function visualiseFP(Fp){
    var counter = 0;
    for(let i = 1; i < Fp.length-1; i++) {
        counter = counter + speed;
        setTimeout(() => {Fp[i].classList.add('finalPath');} , counter);
    } 
    clearInterval(intervalId);
}