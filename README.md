# min-heap
A lightweight JavaScript min heap implementation

## Functions

#### `addWithPriority(element, priority)`
Adds a new element to the heap with a given priority.  
Time complexity: O(log n)

#### `decreasePriority(element, newPriority)`
Decreases the priority of a given element in the heap. If the new priority is greater than the current priority, an error is thrown.  
Time complexity: O(log n)

#### `extractMin()`
Removes and returns the minimum element from the heap. If the heap is empty, returns `null`.  
Time complexity: O(log n)

#### `peek()`
Returns the minimum element from the heap without removing it.  
Time complexity: O(1)

#### `has(element)`
Returns `true` if the given element is in the heap, and `false` otherwise.  
Time complexity: O(1)

#### `isEmpty()`
Returns `true` if the heap is empty, and `false` otherwise.  
Time complexity: O(1)

#### `clear()`
Empties the heap.  
Time complexity: O(1)

#### `toArray()`
Returns an array containing the elements of the heap in the same order as they appear in the heap.  
Time complexity: O(n)

#### `buildHeap()` 
Constructs a new heap from the given array by adding each element to the heap with its value as the priority.  
Time complexity: O(n log n)
