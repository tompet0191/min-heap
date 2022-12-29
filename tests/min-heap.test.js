const MinHeap = require('../min-heap');

describe('MinHeap', () => {
    let heap;

    beforeEach(() => {
        heap = new MinHeap();
    });

    describe('addWithPriority()', () => {
        it('adds an element to the heap', () => {
            heap.addWithPriority('A', 1);
            expect(heap.heap).toEqual([{ item: 'A', priority: 1 }]);
        });
    });

    describe('decreasePriority()', () => {
        it('updates the priority of an element and restores the heap', () => {
            heap.addWithPriority('A', 2);
            heap.addWithPriority('B', 1);
            heap.decreasePriority('A', 0);
            expect(heap.heap).toEqual([{ item: 'A', priority: 0 }, { item: 'B', priority: 1 }]);
        });

        it('returns null if the new priority is greater than the current priority', () => {
            heap.addWithPriority('A', 2);
            expect(heap.decreasePriority('A', 3)).toBe(null);
        });

        it('returns null if heap is empty', () => {
            expect(heap.decreasePriority('A', 3)).toBe(null);
        });

    });

    describe('extractMin()', () => {
        it('removes and returns the minimum element from the heap', () => {
            heap.addWithPriority('A', 1);
            heap.addWithPriority('B', 2);

            expect(heap.extractMin()).toBe('A');
            expect(heap.heap).toEqual([{ item: 'B', priority: 2 }]);
        });

        it('extractMin returns null if the heap is empty', () => {
            expect(heap.extractMin()).toBe(null);
        });

        it("always returns the minimum value from large sets", () => {
            let nextPriority = 0;

            for (let i = 0; i < 10000; i++) {
                heap.addWithPriority(i, nextPriority);
                nextPriority++;
            }

            for (let i = 0; i < 10000; i++) {
                expect(heap.extractMin()).toBe(i);
            }
        });

        it("always returns the minimum value from jumbled large sets", () => {
            let nextPriority = 0;

            let expected = []
            for (let i = 0; i < 10000; i++) {
                expected.push({ i, priority: nextPriority++ });
            }
            expected.sort((a, b) => Math.random() - 0.5);

            for (const { item, priority } of expected) {
                heap.addWithPriority(item, priority);
            }

            for (const { item } of expected) {
                expect(heap.extractMin()).toBe(item)
            }
        });
    });

    describe('has()', () => {
        it('returns true if the element is in the heap, false otherwise', () => {
            heap.addWithPriority('A', 1);
            expect(heap.has('A')).toBe(true);
            expect(heap.has('B')).toBe(false);
        });
    });

    describe('isEmpty()', () => {
        it('returns true if the heap is empty, false otherwise', () => {
            expect(heap.isEmpty()).toBe(true);
            heap.addWithPriority('A', 1);
            expect(heap.isEmpty()).toBe(false);
        });

        it('extractMin followed by IsEmpty returns true if heap is empty, false otherwise', () => {
            expect(heap.isEmpty()).toBe(true);
            heap.addWithPriority('A', 1);
            heap.extractMin();
            expect(heap.isEmpty()).toBe(true);

        });
    });

    describe('peek()', () => {
        it('returns the min item without removing it', () => {
            heap.addWithPriority(1, 1);
            heap.addWithPriority(2, 2);
            heap.addWithPriority(3, 3);
            expect(heap.peek()).toBe(1);
            heap.extractMin();
            expect(heap.peek()).toBe(2);
        });

        it('returns null if the heap is empty', () => {
            expect(heap.peek()).toBe(null);
        });
    });

    describe('clear()', () => {
        it('empties the heap', () => {
            heap.addWithPriority(1, 1);
            heap.addWithPriority(2, 2);
            heap.addWithPriority(3, 3);
            heap.clear();
            expect(heap.isEmpty()).toBe(true);
            expect(heap.size).toBe(0);
        });
    });
});
