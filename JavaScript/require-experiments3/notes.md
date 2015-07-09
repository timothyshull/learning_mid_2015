- a module that is defined and then called within a require as a dependency but not passed to the function will be 
executed
- A module with executable code that is required within a define within another module will be executed even if it is 
not passed to the function
- A module that simply passes an object within a define call will be available within another define or require to the 
function as an assignable variable
- A module that returns an object from a function will make that object available to another module as an object through
an argument within the internal function (same as previous)
- Within a define, the first internal function that is encountered is always evaluated as require's internal function 
and not as a returnable function
- A module that returns a function from define's internal function will make that object available to another module as 
a function through an argument within the internal function (same as previous)

Possibilities - 
1) No dependencies, simple object within define - passed to other modules and assignable through argument
2) Just executable code - passed to other modules within define, no need for argument assignment, only run when 
processed within a require call (but, because module dependencies are loaded before a module, it will be run before the 
module it is included in as a dependency)
3) Object returned from function within a define call - assignable within another define or require call through the 
argument
4) Function returned from function within a define call - assignable within another define or require call through the 
argument


All forms of the above become exposed as the returned value within the console by using 
require("module/name").callSomeFunction()
Note this only works if "module/name" was previously loaded via the async version of require: require(["module/name"]). 
If using a relative path, like './module/name', those only work inside define
Any module that has been defined(["module"]) is available in this way.