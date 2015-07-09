1. The Module Pattern
    - simple IIFE (no specific return - temporary action and state while avoiding global namespace issues) 
    - IIFE assigned to var (namespaced) (no specific return - value same as above)
    - private vs public methods in namespaced IIFE (public defined after IIFE assignment to var)
    - anonymous object literal return for IIFE (with public and private methods)
    - Locally scoped object literal (object defined within namespaced IIFE and returned, private methods are just var assigned functions, public are methods on the object)
    - Stacked locally scoped object literal (as above, but the public methods are defined within the object literal assignment)
    - Revealing module pattern (return object literal with public methods defined above return and specifically assigned to new methods on object literal (good for facade pattern))
2. Object literal notation
    - assigned to a var, essentially same as above when returning an object without being wrapped in a function, does not afford the same potential for privacy
3. AMD modules
    - Allows all of the same potential as above but wraps everything in a define (and/or require)
    - Simple object literal return
    - simple function (IIFE might not be right to use in this situation)
    - function returning object
    - function returning function
    
4. CommonJS modules
5. ECMAScript Harmony modules