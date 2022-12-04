var weightsArray = [];
var grid;
var nodeList;

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

function createMinHeap(arr) { //insert, delete and update.
    minHeap = []; //stores [node, distance], where distance is the distance from start node.
    this.insert = function() {
        for (i = 0; i < arr.length; i++)
        {   
            if (arr[i].sig == 1) {minHeap.push = [arr[i], 1];}
            else { minHeap.push = [arr[i], Infinity];} //default.
            let condition = false;
            while (condition = false) {
                if (minHeap[floor(i/2)] > minHeap[i]){
                    temp = minHeap[floor(i/2)];
                    minHeap[floor(i/2)] = minHeap[i];
                    minHeap[i] = temp;
                }
                else {
                    condition = true;
                }
            }
        }
    }
    this.update = function(node, val) {
        var count = -1;
        for (const i of minHeap) {
            count ++;
            if (i[0] == node) {
                i[1] = val;
                condition = false;
                while (condition = false) {
                    if (minHeap[floor(count/2)] > minHeap[count]){
                        temp = minHeap[floor(count/2)];
                        minHeap[floor(count/2)] = minHeap[count];
                        minHeap[count] = temp;
                    }
                    else {
                        condition = true;
                    }
                }
        }

    }
    this.delete = function() {
        let temp = minHeap.pop();
        minHeap.pop;
        for(i = 0; i < ceil(minHeap.length/2); i++) {
            if(minHeap[2*i] > minHeap[2*i + 1]) {
                minHeap[i] = minHeap[2*i];
            }
            else{
                minHeap[i] = minHeap[2*i + 1];
            }
        }
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
    nodeList[249].sig = 1;
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



window.onload = () => {
    createGrid();
    setNodes();
}


