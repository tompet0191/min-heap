# min-heap
A lightweight min heap implemented as a list, in JavaScript.

## Methods

#### `addWithPriority(element, priority)`
Adds a new element to the heap with a given priority.

#### `decreasePriority(element, newPriority)`
Decreases the priority of a given element in the heap. If the new priority is greater than the current priority, an error is thrown.

#### `extractMin()`
Removes and returns the minimum element from the heap. If the heap is empty, an error is thrown.

#### `has(element)`
Returns `true` if the given element is in the heap, and `false` otherwise.

#### `isEmpty()`
Returns `true` if the heap is empty, and `false` otherwise.
