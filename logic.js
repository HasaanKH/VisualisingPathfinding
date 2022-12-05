var weightsArray = [];
var grid;
var nodeList;
var gridY = 10;
var gridX = 25;
var adjList = new Map();

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

class MinHeap { //stores arrays [node, distance, parent], starts 0 indexed.
    constructor() {
        this.minHeap = [null];
    }

    delete() { 
        temp = this.minHeap[0];
        this.minHeap[0] = null;
        let index;
        if (this.minHeap[1][2] > this.minHeap[2][2]) {
            this.minHeap[0] = this.minHeap[2];
            this.minHeap[2] = null;
            index = 2;
        }
        else{
            this.minHeap[0] = this.minHeap[1];
            this.minHeap[1] = null;
            index = 1;
        }
        for (i = index; i < this.minHeap.length; i ++) 
        {
            if (this.minHeap[2*i + 1][2] > this.minHeap[2*i+2][2] && this.minHeap[floor((i-1)/2)] == null) {
                this.minHeap[floor((i-1)/2)] =  this.minHeap[2*i+2];
                this.minHeap[2*i+2] = null;
            }
            else if (this.minHeap[2*i + 1][2] < this.minHeap[2*i+2][2] && this.minHeap[floor((i-1)/2)] == null) {
                this.minHeap[floor((i-1)/2)] =  this.minHeap[2*i+1];
                this.minHeap[2*i+1] = null;
            }
            else {continue;}
        } 
        return temp;
    }

    insert(ele) { //ele is an array consisting of a [node, distance, parent]
        this.minHeap.push(ele);
        let condition = false;
        if (this.minHeap.length > 0) 
        {
            index = this.minHeap.length - 1;
        }
        while (condition === false) {
            if (this.minHeap[floor(index - 1/2)][1] > ele[1]) {
                temp = this.minHeap[floor((index - 1)/2)] ;
                this.minHeap[floor((index - 1)/2)] = ele;
                this.minHeap[index] = temp;
            }
            else{condition = true;}
        }
    }

    update(ele) {
        let index = -1;
        for (x of this.minHeap) {
            count ++;
            if (x[0] === ele[0]) {
                x[1] = ele[1];
            }
        }
        let condition = false;
        while (condition === false) {
            if (this.minHeap[floor((index-1)/2)][1] > ele[1]) {
                temp = this.minHeap[floor((index-1)/2)] ;
                this.minHeap[floor((index-1)/2)] = ele;
                this.minHeap[index] = temp;
            }
            else{condition = true;}
        }
        
    }

    search(key) {
        for (x of this.minHeap) {
            if (key === x[0]){
                return x[1]
            }
        }
        return null;
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




function lowestValuefromMap(map , finalmap) { //needs work
    let array = Array.from(map, ([name, value]) => ([ name, value ]));
    let finalList = Array.from(finalmap, ([name, value]) => ([ name, value ]));
    console.log(finalList[0][1]);
    let minKey = array[0];
    minKey = minKey[0];
    console.log(minKey);
    let minValue = 1000;
    for (i = 0; i < array.length; i ++)
    {
        if (array[i][1] < minValue && !(finalList.includes(array[i]))){
            minValue = array[i][1];
            minKey = array[i][0];
        }
    }
    console.log(minKey);
    return [minKey, minValue];
}

  

function idtoNum(node) {
    var str = node.id;
    var stringArray = str.split(/(\s+)/);
    return [parseInt(stringArray[0]), parseInt(stringArray[2])]
}

function adjListBuilder () {
    for (y = 0; y < gridY - 1; y++){
        for(x = 0; x < gridX - 1; x++){
            let currentNode = document.getElementById('y'+' '+'x');
            let neighbourX = document.getElementById('y'+' '+ toString(x + 1));
            let neighbourY = document.getElementById(toString(y + 1)+' '+'x');
            adjList.set(currentNode, [[neighbourX, 1], [neighbourY, 1]]); //node, distance - default value 1, subject to change.
        }
    }
}

function dijkstraAlgo() {
    let childNodes = grid.childNodes;
    let minHeap = new MinHeap();
    let visitedNodes = [null]; //consists of [node, distance, parent], except start node.
    for (i = 0; i < childNodes.length; i++) { //creating minHeap
        if (i ===0) {
            minHeap.insert([childNodes[i], 0]);
        }
        else{
            minHeap.insert([childNodes[i], Infinity])
        }
    }
    while(visitedNodes.length <= gridX*gridY) {
        let temp = minHeap.delete();
        minHeap.delete();
        visitedNodes.push(temp);
        for (node of adjList.get(temp[0])) {
            heapDistance = minHeap.search(node[0]);
            if(heapDistance > temp[1] + node[1]) {
                minHeap.update([node[0], temp[1] + node[1]]);
                visitedNodes.push([node[0], temp[1] + node[1], temp[0] ]);
            }
        }
    }
}


window.onload = () => {
    createGrid();
    setNodes();
}


