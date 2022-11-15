//Creating a node factory function
function createNode(row, col, weight) {
    var node = document.createElement("div");
    node.setAttribute("class", "node");
    node.setAttribute("row", row);
    node.setAttribute("column", col);
    node.setAttribute("weight", weight);
    return node;
}

//returns a random weight between 0 and 100.
function randomWeight(){
    if (document.querySelector('.weightButton').checked == true)
        {return Math.ceil(Math.random() * 100);}
    else
    {
        return 1;
    }

}


function createGrid() {
    var grid = document.getElementsByClassName("Grid");
    grid.innerHtml = "";
    for (row = 1; row <= grid.getAttribute("grid-template-rows");row++){
        for (col = 1; col <= grid.getAttribute("grid-template-column");col++){
            temp = createNode(row, col, randomWeight())
            grid.appendChild(temp);
        }
    }
}
