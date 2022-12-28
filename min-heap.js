class MinHeap {
    constructor() {
        this.heap = [];
    }

    addWithPriority(element, priority) {
        this.heap.push({ item: element, priority });
        this.heapifyUp();
    }

    decreasePriority(element, newPriority) {
        const index = this.heap.findIndex(x => x.item === element);
        if (index === -1) {
            throw Error(`No such element ${element}`);
        }

        if (newPriority > this.heap[index].priority) {
            throw new Error(`New priority ${newPriority} is greater than current priority ${this.heap[index].priority}`);
        }

        this.heap[index].priority = newPriority
        this.heapifyUp(index);
    }

    extractMin() {
        if (this.isEmpty()) {
            throw new Error("Cannot extract from an empty heap");
        }
        const min = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();

        return min.item;
    }

    has = (element) => this.heap.some(x => x.item === element)

    isEmpty = () => this.heap.length === 0;

    getParent = (i) => Math.floor((i - 1) / 2);

    getLeftChild = (i) => 2 * i + 1;

    getRightChild = (i) => 2 * i + 2;

    heapifyUp(index) {
        let currentIndex = index || this.heap.length - 1;
        while (currentIndex > 0) {
            const parentIndex = this.getParent(currentIndex);
            if (this.heap[currentIndex].priority < this.heap[parentIndex].priority) {
                this.swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    heapifyDown(index) {
        let currentIndex = index || 0;
        while (currentIndex < this.heap.length) {
            const leftChildIndex = this.getLeftChild(currentIndex);
            const rightChildIndex = this.getRightChild(currentIndex);
            let minIndex = currentIndex;
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].priority < this.heap[minIndex].priority) {
                minIndex = leftChildIndex;
            }
    
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].priority < this.heap[minIndex].priority) {
                minIndex = rightChildIndex;
            }
    
            if (minIndex !== currentIndex) {
                this.swap(currentIndex, minIndex);
                currentIndex = minIndex;
            } else {
                break;
            }
        }
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

module.exports = MinHeap;