class MinHeap {
    constructor() {
        this.heap = [];
        this.size = 0;
    }

    addWithPriority(element, priority) {
        this.heap.push({ item: element, priority });
        this.size++;
        this.heapifyUp();
    }

    decreasePriority(element, newPriority) {
        if (this.isEmpty()) {
            return null;
        }
        const index = this.heap.findIndex(x => x.item === element);
        if (index === -1) {
            return null;
        }

        if (newPriority > this.heap[index].priority) {
            return null;
        }

        this.heap[index].priority = newPriority
        this.heapifyUp(index);
    }

    extractMin() {
        if (this.isEmpty()) {
            return null;
        }
        const min = this.heap[0];
        this.heap[0] = this.heap[this.size - 1];
        this.heap.pop();
        this.heapifyDown();

        this.size--;

        return min.item;
    }

    clear() {
        this.heap = [];
        this.size = 0;
    }

    peek = () => this.isEmpty() ? null : this.heap[0].item;
    
    has = (element) => this.heap.some(x => x.item === element)

    isEmpty = () => this.size === 0;

    getParent = (i) => (i - 1) >> 1;

    getLeftChild = (i) => (i << 1) + 1;

    getRightChild = (i) => (i << 1) + 2;

    heapifyUp(index) {
        let currentIndex = index || this.size - 1;
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
        while (currentIndex < this.size) {
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