var weightsArray = [];
var grid;
var nodeList;
var gridY = 10;
var gridX = 25;
var adjList = new Map();
var path

function createNode (row, column, heuristic, phase) { //returns node
    var node = document.createElement("div");
    node.setAttribute("row", row);
    node.setAttribute("column", column);
    node.setAttribute("heuristic", heuristic);
    node.setAttribute("phase", phase) //determines if passable, 1 is true
    node.setAttribute('sig', 0) //whether the node is significant or not e.g start = 1.
    node.setAttribute("id", row.toString() +' '+ column.toString());
    node.classList.add("gridElement");
    node.addEventListener("mouseover", function(){
        if (this.classList.contains('wallEditing')){
        this.style.backgroundColor = 'black';
        this.phase = 0;
    }
    }
    );
    return node;
}




class MinHeap 
{
    constructor() {
        this.heap = [];
    }

    insert(node, weight, parent) {
        this.heap.push({node, weight, parent});
        this.bubbleUp(this.heap.length - 1);
    }
    update(node, weight, parent){
        for (let i = 0; i < this.heap.length; i++){
            if (this.heap[i].node == node){
                this.heap[i].weight = weight;
                console.log(this.heap[i].weight);
                this.heap[i].parent = parent;
                this.bubbleUp(i); //new value is smaller, so bubble up.
                break;
            }
        }
    }

    bubbleUp(index) {  
        while (index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[parentIndex].weight > this.heap[index].weight) {
            let temp = this.heap[parentIndex];
            this.heap[parentIndex] = this.heap[index];
            this.heap[index] = temp;
            index = parentIndex;
        } else {
            break;
        }
        }
    }

    extractMin() {
        let min = this.heap[0]; //min is the first element
        this.heap[0] = this.heap[this.heap.length - 1]; //last element is now first
        this.heap.splice(this.heap.length - 1); //removes last element
        this.bubbleDown(); //reorders the heap
        return min;
    }
    bubbleDown() {
        let index = 0;
        while (index < this.heap.length) {
            let leftChildIndex = index * 2 + 1;
            let rightChildIndex = index * 2 + 2;
            let minIndex = index;
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].weight < this.heap[minIndex].weight) {
                minIndex = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].weight < this.heap[minIndex].weight) {
                minIndex = rightChildIndex;
            }
            if (minIndex !== index) { //if the minIndex is not the index, swap the two.
                let temp = this.heap[minIndex];
                this.heap[minIndex] = this.heap[index];
                this.heap[index] = temp;
                index = minIndex;
            } else {
                break;
            }
        }
    }
}
    
var distances = new Map(); //map of node to distance.
function dijkstraAlgo() {
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
var visitNodes = [];

function VisualColor() {
    var counter = 1000;
    for(const node of visitNodes) {
        counter = counter + 10;
        setTimeout(() => {node.style.backgroundColor = 'purple';} , counter);
    }
    
}

function createGrid () {  //appends x axis wise
    grid = document.getElementById('Grid');
    let workingArray = [];
    for (y = 1; y <= 10; y ++ ){
        for (x = 1; x<= 25; x++) {
            var tempNode = createNode (y, x, 1, 1);
            grid.appendChild(tempNode);
            workingArray.push(tempNode);
        }
        weightsArray.push(workingArray);
    }
}

function setNodes () { 
    nodeList = document.getElementById('Grid').childNodes;
    nodeList[0].style.backgroundColor = 'red';
    nodeList[0].sig = 1;
    nodeList[249].style.backgroundColor = 'red';
}

var click = 0;
function wallEdit() {
    click ++;
    let children = document.getElementById("Grid").childNodes;
    for (i = 1; i <= 248; i++) {
        let tempNode = children[i];
        if (click % 2 === 1){
            tempNode.classList.add("wallEditing");
        }
        else {
            tempNode.classList.remove("wallEditing");
        }
    }
}




function lowestValuefromMap(map , finalmap) {
    let array = Array.from(map, ([name, value]) => ([ name, value ]));
    let finalList = Array.from(finalmap, ([name, value]) => ([ name, value ]));
    let minKey = array[0];
    minKey = minKey[0];
    let minValue = 1000;
    for (i = 0; i < array.length; i ++)
    {
        if (array[i][1] < minValue && !(finalList.includes(array[i]))){
            minValue = array[i][1];
            minKey = array[i][0];
        }
    }
    return [minKey, minValue];
}

  

function idtoNum(node) {
    var str = node.id;
    var stringArray = str.split(/(\s+)/);
    return [parseInt(stringArray[0]), parseInt(stringArray[2])]
}

function adjListBuilder () {
    for (y = 1; y < gridY; y++){
        for(x = 1; x < gridX; x++){
            let currentNode = document.getElementById(y.toString()+' '+x.toString());
            let neighbourX = document.getElementById(y.toString()+' '+ (x+1).toString());
            let neighbourY = document.getElementById((y+1).toString()+' '+ x.toString());
            adjList.set(currentNode, [[neighbourX, 1], [neighbourY, 1]]); //node, distance - default value 1, subject to change.
        }
    }
    for (x=1; x<gridX; x++) {
        let currentNode = document.getElementById('10'+' '+x.toString());
        adjList.set(currentNode, []); 
    }
    for(y=1; y<gridY; y++) {
        let currentNode = document.getElementById(y.toString()+' '+'25');
        adjList.set(currentNode, []); 
    }
    adjList.set(document.getElementById('9'+' '+'25'), [[document.getElementById('10'+' '+'25'), 1]]);
    adjList.set(document.getElementById('10'+' '+'24'), [[document.getElementById('10'+' '+'25'), 1]]);
    adjList.set(document.getElementById('10'+' '+'25'), []);
}


window.onload = () => {
    createGrid();
    setNodes();
    adjListBuilder();
}


