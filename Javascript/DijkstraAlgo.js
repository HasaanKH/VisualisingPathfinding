import { MinHeap } from "./MinheapClass.js";
import { adjList, distances, visitNodes, nodeList } from "./logic.js";
var path;

export function dijkstraAlgo() {
    // Create a MinHeap to store the nodes and their corresponding
    // distances from the start node
    var minHeap = new MinHeap();
    var graph = adjList;
    var startNode = nodeList[0];

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
    const previousNodes = new Map();

    // While the min heap is not empty, extract the minimum element
    // from the heap and update the distances of its neighbours
    while (minHeap.heap.length > 0) {
        // Extract the minimum element from the min heap
        const min = minHeap.extractMin();
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

    path = {distances, previousNodes};
    console.log(path);
    VisualColor();
    return path;
}

function VisualColor() {
    var counter = 1000;
    for(const node of visitNodes) {
        counter = counter + 10;
        setTimeout(() => {node.style.backgroundColor = 'purple';} , counter);
    } 
}