# Family Tree

## Assumptions
- There are no two users with the same name
- There is only one partner and two parents of a user
- There are only two genders

## Approaches Used

### 1. Javascript Object based tree
This approach occurred after seeing those family trees in wikipedia. In this approach, I thought of storing the family tree in a type of nested javascript object and each generation would further be nested into the children field of a particular element (mainly the parent element). But the main drawback of this method was searching. For an infinite number of generations, I would need an infinite number of nested for loops to search for a particular name. So this idea was dismissed.

### 2. Graph algorithm
I thought of creating a graph using adjacency matrix. I would have stored the users as vertex and the relationship between them as edges. Implementing or representing the relations through edges was bit difficult as I could not name a particular edge as `aunt` or `father` but I found a way around it using nested maps for storing the edges separately. But this proved to be highly efficient as I was using two different data structures - `matrix` and `nested maps` to store the same graph. Also I planned to implement relations using the BFS algorithm as it would find the shortest path between any two members or their `closest relative` but as mentioned earlier, this method method proved to be inefficient.

### 3. Using OOP
I implemented a User class with all the details. Mainly my motive here was that, whenever I visualize a family tree, the links between the edges are only between the closest blood relations and partner - like to a particular vertex, the only relations connected with the help of lines are parents, children and partner. So I used this realization and made a User class. When it would come to visualization, it can be done easily with the help of the level field, as the oldest member in a family tree would have the lowest level. And the tree could be drawn from there using the `children` and `partner` attributes.