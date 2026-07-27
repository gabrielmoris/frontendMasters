# Part 1 - Initialize observer

1. Update toHTML of virtual-list.js to return the structure described in goal.png
2. Run index.html to see if we render it

# Part 2 - Register Bottom Observer

1.  Create a IntersectionObserver callback #handleIntersectionObserver in VirtualList class

2.  Within callback, extract id of the target element from the intersection entry (entry.target)

3.  based on the id (bottom or top) run required callback:
    3.1 Create empty handleTopObserver method
    3.2 Create empty handleBottomObserver method

4.  Inside #effect method, register the observer.
    4.1 Use intersectionObserver utility function
    4.2 First argument takes elements to track
    4.3 Second argument is a callback that you defined #handleIntersectionObserver
    4.4 Config options, provide { root: <container> , threshold: 0.2 } as configuration

# Part 3 - Rendering elements on bottom observer callback

Define property model of VirtualList component

1. `getPage` - A function that retrieves data for a given page number.

2. `pageSize` - A variable that determines how many elements to render, helping us understand the scope of each data chunk.

3. `getTemplate` - A function that takes a piece of data (datum) and returns an HTMLElement. This allows for flexible visual representation of each item.

4. `updateTemplate` - updates an HTMLElement with new data.

Load new elements

1. Open index.html

2. Create getTemplate and updateTemplate functions

3. Init virtual list with a new set of properties

4. Define "start" and "end" state variables on the Virtual List class. These variable will track
   the "window" / "slice" of the data that's currently rendered

5. Fetch data on bottom observer intersection

6. Append new card elements

# Part 4 - Creating element pool - Preparation phase

1. Create an array "pool" as a state variable

2. Define "poolLimit" variable which is equal "pageSize 2"

3. Update #handleBottomObserver:
   - When pool size exceeds limit - push items [0, pageSize] to the end

   - Update items with a new method - updateData - it should cycle through elements that were moved
     and call the template update callback

   - Increase -start- counter by 1 since we moved to page + 1

# Part 5 - Bottom Transitioning of updated elements

1. Move card elements to stacking context by rendering the as absolutely positioned items

2. #virtual-list should become relative container for card elements

3. Implement updateElement method for bottom recycling
   - it should cycle through all pool elements
   - Card (N + 1) should be assigned with Card(N) - y position
   - Use data-attributes to store positioning info

4. Use CSS Transform to move elements down

# Part 6 - Top Transitioning

1. Update updateElement method for top recycling
   - it should cycle through all pool elements
   - Card (N - 1) should be assigned with Card(N) - y position
   - Use data-attributes to store positioning info

2. Use CSS Transform to move elements down
