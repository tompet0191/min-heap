const MinHeap = require('../min-heap');

describe('MinHeap', () => {
  let heap;

  beforeEach(() => {
    heap = new MinHeap();
  });

  test('addWithPriority adds an element to the heap', () => {
    heap.addWithPriority('A', 1);
    expect(heap.heap).toEqual([{ item: 'A', priority: 1 }]);
  });

  test('decreasePriority updates the priority of an element and restores the heap', () => {
    heap.addWithPriority('A', 2);
    heap.addWithPriority('B', 1);
    heap.decreasePriority('A', 0);
    expect(heap.heap).toEqual([{ item: 'A', priority: 0 }, { item: 'B', priority: 1 }]);
  });

  test('decreasePriority throws an error if the new priority is greater than the current priority', () => {
    heap.addWithPriority('A', 2);
    expect(() => heap.decreasePriority('A', 3)).toThrowError('New priority 3 is greater than current priority 2');
  });

  test('extractMin removes and returns the minimum element from the heap', () => {
    heap.addWithPriority('A', 1);
    heap.addWithPriority('B', 2);
    
    expect(heap.extractMin()).toBe('A');
    expect(heap.heap).toEqual([{ item: 'B', priority: 2 }]);
  });

  test('extractMin throws an error if the heap is empty', () => {
    expect(() => heap.extractMin()).toThrowError('Cannot extract from an empty heap');
  });

  test('has returns true if the element is in the heap, false otherwise', () => {
    heap.addWithPriority('A', 1);
    expect(heap.has('A')).toBe(true);
    expect(heap.has('B')).toBe(false);
  });

  test('isEmpty returns true if the heap is empty, false otherwise', () => {
    expect(heap.isEmpty()).toBe(true);
    heap.addWithPriority('A', 1);
    expect(heap.isEmpty()).toBe(false);
  });

  test('extractMin followed by IsEmpty returns true if heap is empty, false otherwise', () => {
    expect(heap.isEmpty()).toBe(true);
    heap.addWithPriority('A', 1);
    heap.extractMin();
    expect(heap.isEmpty()).toBe(true);
    
  });
});
