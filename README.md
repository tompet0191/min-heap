# min-heap
A lightweight min heap implemented as a binary tree, in JavaScript.

## Methods

#### addWithPriority(element, priority)
This method adds a new element to the heap with a given priority. The element is added to the end of the heap and the heapifyUp() method is called to maintain the min heap property.

#### decreasePriority(element, newPriority)
This method decreases the priority of a given element in the heap. If the new priority is greater than the current priority, an error is thrown. Otherwise, the priority of the element is updated and the heapifyUp() method is called to maintain the min heap property.

#### extractMin()
This method removes and returns the minimum element from the heap. If the heap is empty, an error is thrown. Otherwise, the minimum element is removed from the front of the heap and the heapifyDown() method is called to maintain the min heap property.

#### has(element)
This method returns true if the given element is in the heap, and false otherwise.

#### isEmpty()
This method returns true if the heap is empty, and false otherwise.
