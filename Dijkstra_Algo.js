//dijkstra algorithm for adjacency list.
function dijkstraAlgo() {
    let childNodes = grid.childNodes; //returns left to right, then up to down list.
    let minHeap = createMinHeap(childNodes).create(); 
    let condition = false;
    let visitedNodes = new Map();
    while(condition === false) {
        let temp = minHeap.delete();
        temp[0].classList.add('addedNode');
        visitedNodes.set(temp[0], temp[1]);
        minHeap.delete();
        for(i=0;i<adjList.get(temp).Length; i++) {
            let lengthN = adjList.get(temp)[i][1]; //returns distance from node.
            adjList.get(temp)[i][0].classList.add('calcNode');
            let distance;
            for (x of minHeap) {
                if (x[0] === adjList.get(temp)[i])
                {
                    distance = x[1];
                }
            }
            if ((distance - temp[1]) > (temp[1] + lengthN)){
                minHeap.update(adjList.get(temp)[i][0], temp[1] + lengthN);
            }
        }
        if (visitedNodes.Length === gridX*gridY) {condition = true;}
    }
 
}

