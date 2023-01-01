# min-heap
A min priority queue implemented as a min heap in JavaScript

## Constructor
This creates a new instance of the MinHeap class with an empty heap:  
`const heap = new MinHeap();`


Alternatively, you can pass in an array as an argument to the constructor to build a heap from the array:   
`const heap = new MinHeap([5, 3, 8, 1]);`

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

#### `find(element) `
Returns the element and its priority if it exists in the heap, otherwise `null`.  
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

#### `buildHeap(array, getPriority = null)` 
Constructs a new heap from the given array by adding each element to the heap with its value as the priority.  
Alternatively, a priority function may be sent in instead.  
Time complexity: O(n log n)
