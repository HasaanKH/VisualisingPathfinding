import { MinHeap } from "./MinheapClass.js";
import { adjList, precison, setRuntime, speed} from "./main.js";
import { nodeStartId, nodeEndId, nodeList} from "./boardCreation.js";
import { animEnd,setanimEnd } from "./DijkstraAlgo.js";

//these need to be refreshed when, the refresh button is pressed.
var finalPath;
var previousNodes;
var intervalId;
var distances; //map of node to distance.

export function aStarAlgo() {
    // Create a MinHeap to store the nodes and their corresponding
    // distances from the start node
    let runTime = performance.now()
    var visitNodes = [];
    distances = new Map();
    var minHeap = new MinHeap();
    var graph = adjList;
    var startNode = document.querySelector('[data-node = "Start"]');

    // Initialize the distances of all nodes to infinity, except
    // for the start node, which has a distance of 0
    for (const [node, neighbours] of graph.entries()) {
        distances.set(node, Number.POSITIVE_INFINITY);
    }
    distances.set(startNode, 0); //start node has a distance of 0.

    // Add all the nodes to the min heap
    for (const [node, distance] of distances.entries()) {
        minHeap.insert(node, distance, null);
    }

    // Create a map to store the previous node for each node
    // in the shortest path from the start node
    previousNodes = new Map();
    previousNodes.set(document.querySelector('[data-node = "Start"]', null)) //placing start node.
    let flag = false;
    // While the min heap is not empty, extract the minimum element
    // from the heap and update the distances of its neighbours
    while (minHeap.heap.length > 0 && flag == false) {
        // Extract the minimum element from the min heap
        const min = minHeap.extractMin();
        if(min.node == document.querySelector('[data-node = "End"]')){
            flag = true;
        }
        // Update the distances of the neighbours
        const neighbours = graph.get(min.node);
        for (const [neighbour, weight] of neighbours) { //needs to be fixed.
            // Calculate the new distance to the neighbour
            let newDistance = Infinity;
            if(neighbour.getAttribute('phase') == 1)
            {
                newDistance = distances.get(min.node) + Number(neighbour.getAttribute('heuristic'))+ weight;  //dijkstra is 1.
                if (!visitNodes.includes(neighbour) && newDistance !== Infinity){
                    visitNodes.push(neighbour);
                }
            }
            // If the new distance is shorter than the current distance,
            // update the distance and the previous node for the neighbour
            if (newDistance < distances.get(neighbour)) {
                minHeap.update(neighbour, newDistance, min.node) //needs work
                distances.set(neighbour, newDistance);
                previousNodes.set(neighbour, min.node);
            }
        }
    }
    finalPath = [];
    setanimEnd(false);
    VisualColor(visitNodes, FindFP);
    let runTimeEnd = performance.now();
    setRuntime(Math.trunc((runTimeEnd - runTime)*precison)/precison);
    return distances.get(document.querySelector('[data-node = "End"]'));
    
}

function VisualColor(iterable, callback) {
    var counter = 0;
    for(const node of iterable) {
        if (node != nodeList[nodeEndId] && node != nodeList[nodeStartId] && distances.get(node) != Infinity){ //randomstart changed
            counter = counter + speed;
            setTimeout(() => {node.classList.add('visited');} , counter);
        }
    } 
    intervalId = setInterval(() => { //solves async problem of final path loading before the end of first anim.
        let i = iterable.length - 2;
        if(iterable[i].classList.contains('visited')){
            setanimEnd(true);
            callback(document.querySelector('[data-node = "End"]'), finalPath, previousNodes, VisualiseFP)
        }
    },500)   
}

function FindFP (endNode, finalPath, previousNodes, callback) {
    while(endNode !== undefined) { //returns finalpath
        finalPath.push(endNode);
        endNode = previousNodes.get(endNode);
    }
    callback(finalPath)
}

function VisualiseFP(Fp){
    var counter = 0;
    for(let i = 1; i < Fp.length-1; i++) {
        counter = counter + speed;
        setTimeout(() => {Fp[i].classList.add('finalPath');} , counter);
    } 
    clearInterval(intervalId);
}

