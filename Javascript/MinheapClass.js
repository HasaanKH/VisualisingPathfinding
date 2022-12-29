export class MinHeap 
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