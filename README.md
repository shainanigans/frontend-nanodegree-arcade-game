#Arcade Game

##Files

##JavaScript Patterns
Objects have been made using the **pseudoclassical pattern**.

In the prototypical pattern, new objects are created with a set of properties using `Object.create(originalObject)`. Instances of the object delegate their failed lookups to `originalObject`. This class pattern creates a prototype object automatically.

The pseudoclassical pattern is nearly identical. However, it uses the keyword `new` when instantiating an object to run in construction mode. In construction mode, the interpreter inserts `this = Object.create(yourObject.prototype);` and `return this;` into the function that creates the object (this does not show up in the code).

Subclasses can be created to have additional and/or differing properties to their parent and siblings. In the pseudoclassical pattern, subclasses require `originalObject.call(this, anyOtherParameters)`, which binds the keyword `this` to `newObject`, and to use a prototype chain so that `newObject.prototype` delegates to `originalObject.prototype`. These two distinct steps are required because unique values of an object are defined separately from shared methods.

##License