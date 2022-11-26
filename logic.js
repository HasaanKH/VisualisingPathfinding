function createNode (row, column, weight) { //returns node
    var node = document.createElement("div");
    node.setAttribute("row", row);
    node.setAttribute("column", column);
    node.setAttribute("weight", weight);
    node.classList.add("gridElement");
    return node;
}


function createGrid () { 
    var grid = document.getElementById('Grid');
    var col = []; 
    var 
    for (x = 1; x <= 25; x ++ ){
        for (y = 1; y<= 10; y++) {
            var tempNode = createNode (y, x, 1);
            grid.appendChild(tempNode);
        }
    }
}

function setNodes () { 
    const nodeList = document.getElementById('Grid').childNodes;
    console.log(nodeList[0]);
    nodeList[0].style.backgroundColor = 'red';
    nodeList[249].style.backgroundColor = 'red';
}


window.onload = () => {
    createGrid();
    setNodes();
}