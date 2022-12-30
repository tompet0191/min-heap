const MinHeap = require('../min-heap');

describe('MinHeap', () => {
    let heap;

    beforeEach(() => {
        heap = new MinHeap();
    });

    describe('addWithPriority()', () => {
        it('should add an element to the heap', () => {
            heap.addWithPriority('A', 1);
            expect(heap.heap).toEqual([{ item: 'A', priority: 1 }]);
            expect(heap.size).toBe(1);
            expect(heap.map.size).toBe(1);
        });
    });

    describe('decreasePriority()', () => {
        it('should update the priority of an element and restore the heap', () => {
            heap.addWithPriority('A', 2);
            heap.addWithPriority('B', 1);
            expect(heap.map.get('A')).toBe(1);
            heap.decreasePriority('A', 0);
            expect(heap.heap).toEqual([{ item: 'A', priority: 0 }, { item: 'B', priority: 1 }]);
            expect(heap.map.get('A')).toBe(0);
        });

        it('should throw an error if the new priority is greater than the current priority', () => {
            heap.addWithPriority('a', 1);
            expect(() => heap.decreasePriority('a', 2)).toThrowError('New priority 2 is greater than the current priority 1');
        });

        it('should return null if heap is empty', () => {
            expect(heap.decreasePriority('A', 3)).toBe(null);
        });

        it('should return null if trying to decrease item that does not exist in the heap', () => {
            heap.addWithPriority('A', 2);
            expect(heap.decreasePriority('X', 3)).toBe(null);
        });

    });

    describe('extractMin()', () => {
        it('should remove and return the minimum element from the heap', () => {
            heap.addWithPriority('A', 1);
            heap.addWithPriority('B', 2);

            expect(heap.extractMin()).toBe('A');
            expect(heap.heap).toEqual([{ item: 'B', priority: 2 }]);
            expect(heap.map.get('A')).toBe(undefined);
        });

        it('should return null if the heap is empty', () => {
            expect(heap.extractMin()).toBe(null);
        });

        it("should always return the minimum value from large sets", () => {
            let nextPriority = 0;

            for (let i = 0; i < 10000; i++) {
                heap.addWithPriority(i, nextPriority);
                nextPriority++;
            }

            for (let i = 0; i < 10000; i++) {
                expect(heap.extractMin()).toBe(i);
            }
        });

        it("should always return the minimum value from jumbled large sets", () => {
            let nextPriority = 0;

            let expected = []
            for (let i = 0; i < 10000; i++) {
                expected.push({ i, priority: nextPriority++ });
            }
            expected.sort((a, b) => Math.random() - 0.5);

            for (const { item, priority } of expected) {
                heap.addWithPriority(item, priority);
            }

            expect(heap.isMinHeap()).toBe(true);

            for (const { item } of expected) {
                expect(heap.extractMin()).toBe(item)
            }
        });
    });

    describe('has()', () => {
        it('should return true if the element is in the heap, false otherwise', () => {
            heap.addWithPriority('A', 1);
            expect(heap.has('A')).toBe(true);
            expect(heap.has('B')).toBe(false);
        });
    });

    describe('isEmpty()', () => {
        it('should return true if the heap is empty, false otherwise', () => {
            expect(heap.isEmpty()).toBe(true);
            heap.addWithPriority('A', 1);
            expect(heap.isEmpty()).toBe(false);
        });

        it('should return true if heap is empty, false otherwise and called after extractMin on the last element', () => {
            expect(heap.isEmpty()).toBe(true);
            heap.addWithPriority('A', 1);
            heap.extractMin();
            expect(heap.isEmpty()).toBe(true);

        });
    });

    describe('peek()', () => {
        it('should return the min item without removing it', () => {
            heap.addWithPriority(1, 2);
            heap.addWithPriority(2, 1);
            heap.addWithPriority(3, 3);
            expect(heap.peek()).toBe(2);
            heap.extractMin();
            expect(heap.peek()).toBe(1);
        });

        it('should return null if the heap is empty', () => {
            expect(heap.peek()).toBe(null);
        });
    });

    describe('clear()', () => {
        it('should empty the heap', () => {
            heap.addWithPriority(1, 1);
            heap.addWithPriority(2, 2);
            heap.addWithPriority(3, 3);
            heap.clear();
            expect(heap.isEmpty()).toBe(true);
            expect(heap.size).toBe(0);
            expect(heap.map.size).toBe(0);
        });
    });

    describe('isMinHeap ()', () => {
        it('works correctly with an empty heap', () => {
            expect(heap.isMinHeap()).toBe(true);
        });

        it('works correctly with a heap of size 1', () => {
            heap.addWithPriority(1, 10);
            expect(heap.isMinHeap()).toBe(true);
        });

        it('works correctly with a heap of size 2 where the heap property is satisfied', () => {
            heap.addWithPriority(1, 10);
            heap.addWithPriority(2, 5);
            expect(heap.isMinHeap()).toBe(true);
        });

        it('works correctly with a heap of size 2 where the heap property is not satisfied', () => {
            heap.addWithPriority(1, 10);
            heap.addWithPriority(2, 5);
            heap.heap[0].priority = 20;
            expect(heap.isMinHeap()).toBe(false);
        });

        it('works correctly with a heap of size 3 where the heap property is satisfied', () => {
            heap.addWithPriority(1, 10);
            heap.addWithPriority(2, 5);
            heap.heap[0].priority = 20;
            heap.addWithPriority(4, 1);
            expect(heap.isMinHeap()).toBe(true);
        });

        it('works correctly with a heap of size 3 where the heap property is not satisfied', () => {
            heap.addWithPriority(1, 10);
            heap.addWithPriority(2, 5);
            heap.heap[0].priority = 20;
            heap.addWithPriority(5, 20);
            heap.heap[0].priority = 25;
            expect(heap.isMinHeap()).toBe(false);
        });

        it('works correctly with a heap of size 4 where the heap property is satisfied', () => {
            heap.addWithPriority(1, 10);
            heap.addWithPriority(2, 5);
            heap.addWithPriority(5, 20);
            heap.addWithPriority(6, 10);
            expect(heap.isMinHeap()).toBe(true);
        });

        test('isMinHeap function works correctly with a heap of size 4 where the heap property is not satisfied', () => {
            heap.addWithPriority(1, 10);
            heap.addWithPriority(7, 30);
            heap.addWithPriority(6, 10);
            heap.addWithPriority(2, 5);
            heap.heap[1].priority = 35;
            expect(heap.isMinHeap()).toBe(false);
        });
    });

    describe('buildHeap()', () => {
        it('should build a heap with an even number of elements', () => {
            heap.buildHeap([5, 3, 1, 4, 2, 6]);
            expect(heap.size).toBe(6);
            expect(heap.map.size).toBe(6);
            expect(heap.isMinHeap()).toBe(true);
        });

        it('should build a heap with an odd number of elements', () => {
            heap.buildHeap([5, 3, 8]);
            expect(heap.size).toBe(3);
            expect(heap.map.size).toBe(3);
            expect(heap.isMinHeap()).toBe(true);
        });

        it('should build a heap with already sorted elements', () => {
            heap.buildHeap([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            expect(heap.size).toBe(9);
            expect(heap.map.size).toBe(9);
            expect(heap.isMinHeap()).toBe(true);
        });

        it('should build a heap with reversed sorted elements', () => {
            heap.buildHeap([9, 8, 7, 6, 5, 4, 3, 2, 1]);
            expect(heap.size).toBe(9);
            expect(heap.map.size).toBe(9);
            expect(heap.isMinHeap()).toBe(true);
        });

        it('should work when called from constructor as well', () => {
            let initialized = new MinHeap([9, 8, 7, 6, 5, 4, 3, 2, 1]);
            expect(initialized.size).toBe(9);
            expect(initialized.map.size).toBe(9);
            expect(initialized.isMinHeap()).toBe(true);
        });

        it('should work correctly when received a priority function', () => {
            let array = [10, 20, 30, 40]
            heap.buildHeap(array, (element) => element * 2);
            expect(array.map(x => heap.getPriority(x))).toEqual([20,40,60,80]);
        });
    });

    describe('toArray()', () => {
        it('should return an empty array for an empty heap', () => {
            expect(heap.toArray()).toEqual([]);
        });

        it('should return an array with a single element for a heap with a single element', () => {
            heap.addWithPriority('A', 1);
            expect(heap.toArray()).toEqual(['A']);
        });

        it('should return an array with a single element for a heap with a single element', () => {
            heap.addWithPriority('A', 1);
            expect(heap.toArray()).toEqual(['A']);
        });

        it('should return an array in the correct order after extracting elements from the heap', () => {
            heap.addWithPriority('C', 3);
            heap.addWithPriority('A', 1);
            heap.addWithPriority('B', 2);
            heap.extractMin();
            expect(heap.toArray()).toEqual(['B', 'C']);
        });
    });

    describe('getPriority()', () => {
        it('should return the correct priority for an element in the heap', () => {
            heap.addWithPriority('A', 1);
            expect(heap.getPriority('A')).toBe(1);
        });
    
        it('should return null if the element is not in the heap', () => {
            heap.addWithPriority('A', 1);
            expect(heap.getPriority('B')).toBe(null);
        });
    
        it('should return null if the heap is empty', () => {
            expect(heap.getPriority('A')).toBe(null);
        });
    
        it('should return the correct priority for an element in the heap with multiple elements', () => {
            heap.addWithPriority('A', 1);
            heap.addWithPriority('B', 2);
            expect(heap.getPriority('A')).toBe(1);
        });
    });
    
});
