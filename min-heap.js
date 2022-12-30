class MinHeap {
    constructor(array = null) {
        this.heap = [];
        this.size = 0;
        this.map = new Map();

        if (array) {
            this.buildHeap(array);
        }
    }

    addWithPriority(element, priority) {
        this.heap.push({ item: element, priority });
        this.size++;
        this.map.set(element, this.size - 1);
        this.#heapifyUp();
    }

    decreasePriority(element, newPriority) {
        if (this.isEmpty()) {
            return null;
        }

        let index = this.map.get(element);

        if (index === undefined) {
            return null;
        }

        if (newPriority > this.heap[index].priority) {
            throw Error(`New priority ${newPriority} is greater than the current priority ${this.heap[index].priority}`)
        }

        this.heap[index].priority = newPriority
        this.#heapifyUp(index);
    }

    extractMin() {
        if (this.isEmpty()) {
            return null;
        }
        const min = this.heap[0];
        this.heap[0] = this.heap[this.size - 1];
        this.heap.pop();
        this.#heapifyDown();

        this.size--;
        this.map.delete(min.item);

        return min.item;
    }

    clear() {
        this.heap = [];
        this.size = 0;
        this.map.clear();
    }

    peek = () => this.isEmpty() ? null : this.heap[0].item;

    has = (element) => this.map.has(element);

    size = () => this.size;

    isEmpty = () => this.size === 0;

    toArray = () => this.heap.map(({ item }) => item);

    isMinHeap() {
        for (let i = 1; i < this.size; i++) {
            const parentIndex = this.#getParent(i);
            if (this.heap[parentIndex].priority > this.heap[i].priority) {
                return false;
            }
        }
        return true;
    }

    buildHeap(array) {
        this.clear();
        for (let element of array) {
            this.addWithPriority(element, element);
        }
    }

    #getParent = (i) => (i - 1) >> 1;

    #getLeftChild = (i) => (i << 1) + 1;

    #getRightChild = (i) => (i << 1) + 2;

    #heapifyUp(index) {
        let currentIndex = index || this.size - 1;
        while (currentIndex > 0) {
            const parentIndex = this.#getParent(currentIndex);
            if (this.heap[currentIndex].priority < this.heap[parentIndex].priority) {
                this.swap(currentIndex, parentIndex);
                this.map.set(this.heap[currentIndex].item, currentIndex);
                this.map.set(this.heap[parentIndex].item, parentIndex);
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    #heapifyDown(index) {
        let currentIndex = index || 0;
        while (currentIndex < this.size) {
            const leftChildIndex = this.#getLeftChild(currentIndex);
            const rightChildIndex = this.#getRightChild(currentIndex);
            let minIndex = currentIndex;
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].priority < this.heap[minIndex].priority) {
                minIndex = leftChildIndex;
            }

            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].priority < this.heap[minIndex].priority) {
                minIndex = rightChildIndex;
            }

            if (minIndex !== currentIndex) {
                this.swap(currentIndex, minIndex);
                this.map.set(this.heap[currentIndex].item, currentIndex);
                this.map.set(this.heap[minIndex].item, minIndex);
                currentIndex = minIndex;
            } else {
                break;
            }
        }
    }

    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}

module.exports = MinHeap;