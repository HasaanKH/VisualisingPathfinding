import { MinHeap } from "./MinheapClass.js";
import { adjList, distances } from "./main.js";
import { nodeList, randomStart} from "./boardCreation.js";
var visitNodes = [];
var calculatedNodes = [];
var path;
var speed = 75; //slow: 100, medium: 75; fast; 50
var finalPath;
var previousNodes;
var intervalId;

export function dijkstraAlgo() {
    // Create a MinHeap to store the nodes and their corresponding
    // distances from the start node
    var minHeap = new MinHeap();
    var graph = adjList;
    var startNode = nodeList[randomStart];

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

    // While the min heap is not empty, extract the minimum element
    // from the heap and update the distances of its neighbours
    while (minHeap.heap.length > 0) {
        // Extract the minimum element from the min heap
        const min = minHeap.extractMin();
        if (!calculatedNodes.includes(min.node)){
            calculatedNodes.push(min.node);
        }
        // Update the distances of the neighbours
        const neighbours = graph.get(min.node);
        for (const [neighbour, weight] of neighbours) { //needs to be fixed.
            // Calculate the new distance to the neighbour
            var newDistance = Infinity;
            if(neighbour.style.backgroundColor != 'black')
            {
            newDistance = distances.get(min.node) + weight;
            if (!visitNodes.includes(neighbour)){
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

    path = {distances, previousNodes, calculatedNodes, visitNodes};
    finalPath = [];
    VisualColor(visitNodes, FindFP);
    
}

function VisualColor(iterable, callback) {
    var counter = 0;
    for(const node of iterable) {
        if (node != nodeList[249] && node != nodeList[randomStart] && distances.get(node) != Infinity){ //randomstart changed
            counter = counter + speed;
            setTimeout(() => {node.classList.add('visited');} , counter);
        }
    } 
    intervalId = setInterval(() => { //solves async problem of final path loading before the end of first anim.
        if(visitNodes[248].classList.contains('visited')){
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

