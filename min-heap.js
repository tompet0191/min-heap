class MinHeap {
    constructor(array = null) {
        this.heap = [];
        this.size = 0;
        this.map = new Map();

        if (array) {
            this.buildHeap(array, null);
        }
    }

    addWithPriority(element, priority) {
        if (isNaN(priority)) {
            throw Error(`Priority must be a number: ${priority}`);
        }
        
        this.heap.push({ item: element, priority });
        this.size++;
        this.map.set(element, this.size - 1);
        this.#heapifyUp();
    }

    decreasePriority(element, newPriority) {
        const current = this.find(element);
        if (!current) {
            return null;
        }
        if (newPriority > current.priority) {
            throw Error(`New priority ${newPriority} is greater than the current priority ${current.priority}`)
        }

        current.priority = newPriority;
        this.#heapifyUp(this.map.get(element));
    }

    extractMin() {
        if (this.isEmpty()) {
            return null;
        }

        this.#swap(0, this.size - 1);
        const min = this.heap.pop();
        this.#heapifyDown();

        this.size--;
        this.map.delete(min.item);

        return min.item;
    }

    delete(element) {
        if (!this.find(element)) {
            return null;
        }
        this.decreasePriority(element, -Infinity);
        return this.extractMin();        
    }

    clear() {
        this.heap = [];
        this.size = 0;
        this.map.clear();
    }

    find = (element) => {
        const index = this.map.get(element);
        if (index === undefined) {
            return null;
        }

        return this.heap[index];
    }

    peek = () => this.isEmpty() ? null : this.heap[0].item;

    has = (element) => this.map.has(element);

    size = () => this.size;

    isEmpty = () => this.size === 0;

    toArray = () => this.heap.map(({ item }) => item);

    isMinHeap() {
        for (let i = 1; i < this.size; i++) {
            const parent = this.#getParent(i);
            if (this.heap[parent].priority > this.heap[i].priority) {
                return false;
            }
        }
        return true;
    }

    buildHeap(array, getPriority = null) {
        this.clear();
        for (let element of array) {
            const priority = getPriority ? getPriority(element) : element;
            this.addWithPriority(element, priority);
        }
    }

    #getParent = (i) => (i - 1) >> 1;

    #getLeftChild = (i) => (i << 1) + 1;

    #getRightChild = (i) => (i << 1) + 2;

    #heapifyUp(index = this.size - 1) {
        while (index > 0) {
            const parentIndex = this.#getParent(index);
            if (this.heap[index].priority >= this.heap[parentIndex].priority) {
                return;
            }

            this.#swap(index, parentIndex);
            index = parentIndex;
        }
    }

    #heapifyDown(index = 0) {
        while (index < this.size) {
            const minIndex = this.#getIndexOfChildWithMinimumPriority(index);
            if (minIndex === index) {
                return;
            }

            this.#swap(index, minIndex);
            index = minIndex;
        }
    }

    #getIndexOfChildWithMinimumPriority(parentIndex) {
        const leftChildIndex = this.#getLeftChild(parentIndex);
        const rightChildIndex = this.#getRightChild(parentIndex);
        let minIndex = parentIndex;

        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].priority < this.heap[minIndex].priority) {
            minIndex = leftChildIndex;
        }

        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].priority < this.heap[minIndex].priority) {
            minIndex = rightChildIndex;
        }

        return minIndex;
    }

    #swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
        this.#updateMap(i, j);
    }

    #updateMap(i, j) {
        this.map.set(this.heap[i].item, i);
        this.map.set(this.heap[j].item, j);
    }
}

module.exports = MinHeap;