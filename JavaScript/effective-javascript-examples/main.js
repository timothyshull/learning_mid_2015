/*global console, window */
var assert = (function () {
    "use strict";
    return function testAssert(value, desc) {
        return value ? console.log(desc + " returned: TRUE") : console.log(desc + " returned: FALSE");
    };
}());

var EffectiveApp = (function (assert) {
    "use strict";
    /**
     * Object wrappers around primitives create distinct objects
     * (and thus are not equivalent)
     * @type {String}
     */
    var s1 = new String("hello");
    var s2 = new String("hello");
    console.log(s1 === s2);

    var s3 = "hello";
    var s4 = "hello";
    console.log(s3 === s4);

    /**
     * UTF-16 is actually 2^20 code points organized into 17 sub-ranges of 2^16 code points
     * JavaScript strings should be thought of as sequences of 16-bit code units
     * Complex characters are represented by surrogate pairs,
     * size in memory of strings is variable depending on the number of surrogate pairs,
     * and operations on strings are not constant time operations
     */
    var str1 = "\u{1D11E}";
    console.log(str1);
    console.log(str1.length);
    console.log(str1.charCodeAt(0));
    console.log(str1.charCodeAt(1));
    console.log(str1.charAt(0));
    console.log(str1.charAt(1));
    console.log(/^.$/.test(str1));
    console.log(/^..$/.test(str1));

    /**
     * Avoid polluting the global namespace, wrap variables in closures, always declare variables
     */
    assert((this === window), "test that \"this\" is the window object");

    /**
     * Get comfortable with closures
     * 1) Functions can access variables outside defined outside of them (i.e. make and magicIngredient)
     * 2) Functions can access variables defined in outer functions even after those functions have returned
     * 3) Functions can update the value of outer variables because they store references to those variables
     */
    function makeSandwich() {
        var magicIngredient = "peanut butter";

        function make(filling) {
            return magicIngredient + " and " + filling;
        }

        return make("jelly");
    }

    assert((makeSandwich() === "peanut butter and jelly"), "test that make sandwich returns expected value");

    function sandwichMaker() {
        var magicIngredient = "peanut butter";

        function make(filling) {
            return magicIngredient + " and " + filling;
        }

        return make;
    }

    var tempMaker = sandwichMaker(); // Outer function is invoked here so func make gets assigned to tempMaker
    assert((tempMaker("jelly") === "peanut butter and jelly"), "tests that magicIngredient is still available even after sandwichMaker has returned");
    assert((tempMaker("bananas") === "peanut butter and bananas"), "tests that magicIngredient is still available and make is dynamic");
    function simplifiedSandwichMaker(magicIngredient) {
        return function (filling) {
            return magicIngredient + " and " + filling;
        };
    }

    var tempMaker2 = simplifiedSandwichMaker("peanut butter"); // simplifiedSandwichMaker makes its argument available and the declaration is skipped in favor of returning a function expression
    assert((tempMaker2("jelly") === "peanut butter and jelly"), "tests that magicIngredient as an arg is still available even after simplifiedSandwichMaker has returned");
    assert((tempMaker2("bananas") === "peanut butter and bananas"), "tests that the returned function is dynamic");

    function box() {
        var val = undefined;
        return {
            set: function (newVal) {
                val = newVal;
            },
            get: function () {
                return val;
            },
            type: function () {
                return typeof val;
            }
        };
    }

    var b = box();
    assert((b.type() === "undefined"), "test that val starts as undefined");
    b.set(98.6);
    assert((b.get() === 98.6), "test that val is updated with the setter and getter methods");
    assert((b.type() === "number"), "test that there are no unexpected type conversions");

    /**
     * Hoisting means that variables are in memory for the full lifetime of the containing function (and sometimes
     * longer with closures) and not just from where they are declared onward within the function
     * Variables essentially consist of a declaration and an assignment, the variable is in scope for the entire
     * function so the declaration is always implicitly at the top of the function but the assignment remains at the
     * location expected
     */

    /**
     * Immediately invoked function expressions are a JavaScript idiom for creating local scopes
     * Closures capture their outer variables by reference and not by value
     * Binding in this context means passing a local variable into the IIFE as a parameter vs assignment as the usual
     * var declaration and assignment
     * IIFEs cannot contain break or continue statements, and they change meaning of this and arguments
     */

    /**
     * Understand the difference between function declarations, anonymous function expressions, and named function
     * expressions.
     * Named function expressions bind their names as local variables within the function, which is useful for
     * recursion, but the more common use is for stack traces. The name of function expressions is used for the entry of
     * Error objects in stack traces
     */

    // Declaration
    function double(x) {
        return x * 2;
    }

    // Anonymous function expression
    var anonFuncExpr = function (x) {
        return x * 2;
    };
    // Named function expression
    var namedFuncExpr = function doubleX(x) {
        return x * 2;
    };

    /**
     * Generally, only declare nested functions at the beginning of their containing function and avoid declaring them
     * within flow control blocks (if statements, etc).
     * Use var declarations with conditional assignments
     */

    /**
     * The main types of functions are regular functions, methods, and constructors
     */

    // Regular function (declaration here, but also named and anonymous FEs)
    function hello(username) {
        return "hello," + username;
    }

    // Method on an object (object property that is a function)
    var obj = {
        hello: function () {
            return "hello, " + this.username;
        }, username: "Tim Shull"
    };
    obj.hello();

    // Constructor - a pattern of function that is used to create types of objects
    function User(name, passwordHash) {
        this.name = name;
        this.passwordHash = passwordHash;
    }

    var newUser = new User("tshull", "0eff33ae83147");

    /**
     * Aside: constructors and Object.create vs new
     */

    // Constructor function with new
    function Car1 (desc) {
        this.desc = desc;
        this.color = "red";
        this.getInfo = function getInfo() {
            return 'A ' + this.color + ' ' + this.desc + '.';
        };
    }

    var car1 = new Car1('Porsche boxter');

    // Object.create and adding methods individually to the prototype
    function Car2 (desc) {
        this.desc = desc;
        this.color = "red";
    }

    Car2.prototype.getInfo = function() {
        return 'A ' + this.color + ' ' + this.desc + '.';
    };

    // Object.create and adding methods to the prototype all at once
    function Car3 (desc) {
        this.desc = desc;
        this.color = "red";
    }

    Car3.prototype = {
        getInfo: function() {
            return 'A ' + this.color + ' ' + this.desc + '.';
        },
        drive: function() {
            //DO SOMETHING
        },
        stop: function() {
            //DO SOMETHING
        }
    };

    /**
     * Object.create(proto [, propertiesObject ]);
     * Object.create does not do any of the initialization that a constructor does
     */

    var car2 =  Object.create(Car3.prototype);
    car2.color = "blue";
    console.log(car2.getInfo()); // Returns a blue

    var Car4 = Object.create(null); //this is an empty object, like {}
    Car4.prototype = {
        getInfo: function() {
            return 'A ' + this.color + ' ' + this.desc + '.';
        }
    };

    var car3 = Object.create(Car4.prototype, {
        //value properties
        color:   { writable: true,  configurable:true, value: 'red' },
        //concrete desc value
        rawDesc: { writable: false, configurable:true, value: 'Porsche boxter' },
        // data properties (assigned using getters and setters)
        desc: {
            configurable:true,
            get: function ()      { return this.rawDesc.toUpperCase();  },
            set: function (value) { this.rawDesc = value.toLowerCase(); }
        }
    });
    car3.color = 'blue';
    console.log(car3.getInfo()); //displays 'A RED PORSCHE BOXTER.'

    /**
     * Data Descriptors
     * writable: Whether the concrete value of the property may be changed. Only applies to data descriptors.
     * configurable: Whether the type of descriptor may be changed, or if the property can be removed.
     * enumerable: Whether the property is listed in a loop through the properties of the object.
     * value: The value of a property. This property only applies to Data descriptors because they reference concrete
     * values, so the value describes the concrete data bound to the property.
     */

    /**
     * Accessor Descriptors
     * Accessor descriptors, on the other hand, proxy access to the concrete value through getter and setter functions.
     * These are useful when some type of transformation or constraints are required. When not set, they'll default to
     * undefined.
     * get (): A function called with no arguments when the property value is requested using dot notation
     * (i,e: obj.prop).
     * set (newValue): A function called with the new value for the property when the user tries to modify the value of
     * the property using dot notation (i,e: obj.prop = 'new value').
     */

    /**
     * Explained again
     * Below is an example of how to use Object.create() to achieve classical inheritance. This is for single
     * inheritance, which is all that Javascript supports.
     */

    // Shape - superclass
    function Shape() {
        this.x = 0;
        this.y = 0;
    }

    // superclass method
    Shape.prototype.move = function(x, y) {
        this.x += x;
        this.y += y;
        console.info('Shape moved.');
    };

    // Rectangle - subclass
    function Rectangle() {
        Shape.call(this); // call super constructor.
    }

    // subclass extends superclass
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;

    var rect = new Rectangle();

    console.log('Is rect an instance of Rectangle? ' + (rect instanceof Rectangle)); // true
    console.log('Is rect an instance of Shape? ' + (rect instanceof Shape)); // true
    rect.move(1, 1); // Outputs, 'Shape moved.'

    /**
     * Multiple inheritance with mixins
     * The mixin function would copy the functions from the superclass prototype to the subclass prototype, the mixin
     * function needs to be supplied by the user. An example of a mixin like function would be jQuery.extend().
     */

    /**
    * function MyClass() {
    *     SuperClass.call(this);
    *     OtherSuperClass.call(this);
    * }
    *
    * MyClass.prototype = Object.create(SuperClass.prototype); // inherit
    * mixin(MyClass.prototype, OtherSuperClass.prototype); // mixin
    *
    * MyClass.prototype.myMethod = function() {
    *     // do a thing
    * };
    *
    * var o;
    *
    * // create an object with null as prototype
    * o = Object.create(null);
    *
    *
    * o = {};
    * // is equivalent to:
    * o = Object.create(Object.prototype);
    *
    *
    * // Example where we create an object with a couple of sample properties.
    * // (Note that the second parameter maps keys to *property descriptors*.)
    * o = Object.create(Object.prototype, {
    *     // foo is a regular 'value property'
    *     foo: { writable: true, configurable: true, value: 'hello' },
    *     // bar is a getter-and-setter (accessor) property
    *     bar: {
    *         configurable: false,
    *         get: function() { return 10; },
    *         set: function(value) { console.log('Setting `o.bar` to', value); }
    *         /* with ES5 Accessors our code can look like this
    *          get function() { return 10; },
    *          set function(value) { console.log('setting `o.bar` to', value); }
    *     }
    * });
    */

    /**
     * Using the propertiesObject with Object.create
     */

    /**
    * function Constructor() {}
    * o = new Constructor();
    * is equivalent to:
    * o = Object.create(Constructor.prototype);
    * Of course, if there is actual initialization code in the
    * Constructor function, the Object.create() cannot reflect it
    *
    *
    * create a new object whose prototype is a new, empty object
    * and a adding single property 'p', with value 42
    * o = Object.create({}, { p: { value: 42 } });
    *
    *  by default properties ARE NOT writable, enumerable or configurable:
    * o.p = 24;
    * o.p;
    * // 42
    *
    * o.q = 12;
    * for (var prop in o) {
    *     console.log(prop);
    * }
    * // 'q'
    *
    * delete o.p;
    * // false
    *
    * // to specify an ES3 property
    * o2 = Object.create({}, {
    *     p: {
    *         value: 42,
    *         writable: true,
    *         enumerable: true,
    *         configurable: true
    *     }
    * });
    */

    /**
     * JavaScript functions are first-class objects, and as such, can be taken as arguments to other functions
     * This pattern facilitates callbacks, a function that is called within another function
     */
    // This is sketchy
    var callbackTimer = function (timer, callback) {
        var timer1 = timer + "1", timer2 = timer + "2";
        callback = callback || function () {
                return undefined;
            };

        console.time(timer1);
        console.log(Date.now());
        console.log("starting timer: " + timer1);
        console.log("stopping timer: " + timer1);
        console.timeEnd(timer1);
        console.log(Date.now());
        callback.call(this, timer2);
    };
    var timer = "timer";
    callbackTimer(timer, callbackTimer);

    /**
     * Each function has a call method that can be used to specify a custom receiver for the function, useful with
     * methods
     * Use call to call methods on an object that may not exist on the given object
     * Use call for higher-order functions that allow clients to provide a receiver for the callback
     */

    /**
     * Apply is similar to call
     * Use apply for variable arity functions
     * Remember: if parameters aren't specified within a function call as arguments, they are given the value of
     * undefined
     * If a function is called with more arguments than parameters given in the definition, these arguments are ignored
     * (but still available on the arguments object)
     * Always use a variable to save a reference to arguments
     */

    /**
     * Use bind to extract methods with a given receiver
     * Use bind for partial application of functions (the ability to call a function as separate function with a
     * a specified set of arguments, similar to currying)
     */

    /**
     * Past patterns relied on eval for the storage of code within strings
     * A better pattern is to store code within functions as a data structure, taking advantage of closures
     * Never include local references in strings when they are passed as code to eval
     */

    /**
     * arguments.caller and arguments.callee are non-standard means of inspecting the current stack trace
     * The main purpose for this is usually debugging and it is better to use an interactive debugger or console logging
     * ie console.trace
     */

    /**
     * Protoypes
     * (Object).prototype is an internal implementation of the methods shared across instances, standard in ES5 and used
     * to set properties/methods on the object prototype
     * obj.__proto__ is a nonstandard mechanism for working with the prototype
     * Object.getPrototypeOf(obj) is the standard function for retrieving the prototype of an object
     * A class in JavaScript is a design pattern consisting of a constructor function and an associated prototype
     * where the associated prototype is an object used to share methods between instances of the class
     * prefer Object.getPrototypeOf to __proto__ and implement it in non-standards compliant environments
     * You can also modify __proto__ to change the prototype link !DO NOT DO THIS!
     * Use ES5's Object.create to provide a custom prototype for new objects
     * __proto__ is also slow
     */
    function TestObject() {
        this.data = [];
    }
    TestObject.prototype.getData = function () {
        return this.data;
    };
    TestObject.prototype.setData = function (elem) {
        this.data.push(elem);
    };
    TestObject.prototype.getSingleElem = function (index) {
        if (this.data[index] !== undefined) {
            return this.data[index];
        }
        throw(new Error("object has no element at index"));
    };
    TestObject.prototype.setSingleElem = function (elem, index) {
        this.data[index] = elem;
    };
    var testItOut = new TestObject();
    assert((Object.getPrototypeOf(testItOut) === TestObject.prototype), "tests that testItOut's prototype is equal to TestObject.prototype");
    assert((testItOut.__proto___ === TestObject.protoype), "tests that testItOut's __proto__ is equal to TestObject.prototype");

    /**
     * A more efficient pattern for defining methods on a prototype
     */
    function TestObject2() {
        this.data = [];
    }
    TestObject2.prototype = {
        method1: function () {},
        method2: function () {}
    }

    /**
     * Calling a constructor without new will attach the properties to the global object
     * Using "use strict" will cause the receiver to default to undefined (which throws an error)
     * To make a constructor new agnostic, use an if (!(this instanceof (ObjectType)) return new ObjectType
     * Other patterns for variadic functions and Object.create
     */
    function User2(name, passwordHash) {
        if (!(this instanceof User2)) {
            return new User2(name, passwordHash);
        }
        this.name = name;
        this.passwordHash = passwordHash;
    }

    /**
     * Defining instances of methods on a constructor function and creating new objects creates copies of the functions
     * within each instance of the object. A better pattern is to define methods on the prototype object
     */

    /**
     * Use closure variables to create privacy for methods (this can include variables passed into a constructor as
     * arguments)
     */

    /**
     * Prototypal inheritance creates a one-to-many relationship between the prototype object and the instances
     */

    /**
     * Do not add instance data onto the prototype object, this type of data should be reserved for class-wide data
     * (like static members in C++)
     */

    /**
     * The scope of this is always determined by the nearest containing function
     * Global object for function declarations, the containing object for methods, and the explicitly defined object for
     * call, apply, and bind
     */

    /**
     * To subclass object creation, use NewObject.prototype = Object.create(OldObject.prototype) or create a new object
     * within the constructor using call to explicitly specify the this as the receiver
     */

    function Bloop() {
        this.data = undefined;
    }
    function Floop() {};
    Floop.prototype = Object.create(Bloop.prototype);
    var testFloop = new Floop();
    testFloop.data = 10;
    console.dir(testFloop);

    /**
     * Never reuse method names for subclasses
     */

    /**
     * Avoid inheriting from standard classes...ECMAScript defines a hidden property [[Class]] which is just a simple
     * stamp for standard objects
     */

    /**
     * Think of objects as interfaces and prototypes as implementation details of those objects
     * Following the "program to an interface, not an implementation" only inspect the prototype structure of objects
     * that you control and properties that implement internals of objects that you don't control
     * Following this line of thought, only monkey-patch when absolutely needed, and clearly document any changes that
     * you make (make them optional in an exported function and use them for polyfills for missing APIs)
     */

    /**
     * JS objects can be name/value pair collection, OO data abstraction with methods and inheritance, a dense or sparse
     * array, or a hash table. The general idea encompasses collections.
     */

    /**
     * Use objects for dictionaries: variable sized collections that map strings to values
     * Only use objects, not subclasses or Arrays. Instantiate with new Object() or an object literal.
     */

    /**
     * Avoid prototype pollution on collections/dictionaries by using Object.create(null)
     */

    /**
     * Use hasOwnProperty to avoid prototype pollution. obj.hasOwnProperty("prop") ? obj.prop : undefined
     * Extract the method to a Dict object.
     */

    var hasOwn = Object.prototype.hasOwnProperty;

    function Dict(elements) {
        this.elements = elements || {};
    }

    Dict.prototype.hasOwn = function(key) {
        return hasOwn.call(this.elements, key);
    };

    var newDict = Object.create(Dict.prototype, {elements: {value: {}}});

    newDict.elements.newProp = "Test";

    assert(newDict.elements.hasOwnProperty("newProp") === newDict.hasOwn("newProp"), "tests that extracting " +
        "hasOwnProperty to hasOwn has the same results");

    /**
     * An object is an unordered collection of properties. for...in can choose the order and different environments
     * choose different orders and this can change programs. Prefer an array when the order needs to be predictable.
     * If you have to work with data from a dictionary, make sure the operations are order insensitive.
     */

    /**
     * Don't add properties to Object.prototype, write a function instead. If necessary use ES5's Object.defineProperty.
     */

    /**
     * Don't modify an object while enumerating properties with a for...in loop. Use while or for when iterating over an
     * object whose properties might change.
     */

    /**
     * Use for with arrays. Store the length of an array before operations on the array if necessary.
     */

    /**
     * Use forEach and map for many array operations. Use iterators and generators for non-standard iteration
     * operations. Extract array-like methods for custom objects using call. Add indices and a length variable to an
     * object that needs to use array methods.
     */

    /**
     * Use array literals over the array constructor.
     */


    /**
     * Use consistent conventions for variable names and function signatures. Think about the user of the library/API
     * and design to that.
     */

    /**
     * Only use undefined as the absence of a value. Use well-named application specific flags in place of null and
     * undefined. Test for undefined to provide parameter default values. Don't use truthiness tests for parameter
     * default values that should allow 0, NaN, or the empty string as valid arguments.
     */

    /**
     * When a function or method requires many arguments, define the final parameter as an options parameter, that,
     * when passed as an argument, is an object with key/value pairs mapped to the necessary parameters. These should be
     * treated as optional arguments. Use an extend utility function to abstract out the logic of extracting values from
     * options objects.
     */

    function extend(target, source) {
        if (source) {
            for (var key in source) {
                var val = source[key];
                if (typeof val !== "undefined") {
                    target[key] = val;
                }
            }
        }
        return target;
    }

    /**
     * Prefer stateless APIs. For example, the canvas element requires many properties to be set separately to actually
     * draw to the canvas. A better solution would be to pass an options object along with the base call.
     * When creating a stateful, provide clear documentation about each possible dependent state.
     */

    /**
     * A structural interface is similar to a protocol...structural or duck typing is a pattern used to create objects
     * that each need to implement a specific set of properties/methods for an interface but the same property/method
     * can be different from object to object. In this case, it is best to define methods as functions outside of the
     * objects and assign them accordingly.
     */

    /**
     * Avoid overloading structural types like arrays. Use ES5's Array.isArray to test for true arrays.
     */

    /**
     * Defensively guard against unexpected inputs. Don't mix coercion with overloading. Avoid excessive coercion.
     */

    /**
     * Method chaining can be used within an API when the objects returned by the methods adhere to an interface. Basic
     * stateless method chaining should return new objects. Stateful methods that support chaining should return this.
     */

    /**
     * JavaScript provides a run-to-completion guarantee. Code running in a shared context is executed in an event queue
     * that invokes events and registered callbacks one at a time. This guarantees that concurrently executing code
     * cannot change variables and code that is being used by the currently executing code.
     */

    /**
     * Always use asynchronous APIs that take callbacks to defer expensive operations and not block that main
     * application.
     */

    /**
     * Name your callbacks to perform several async operations in sequence
     */

    /**
     * Async functions do not have access to their executing context when they return and thus cannot throw exceptions.
     * Use errbacks (functions that take an error as an argument and perform the necessary action with the error where
     * the function is passed as a callback behind the callback that may cause the error. Do not use try...catch with
     * async functions/methods.
     */

    //downloadAsync("http://example.com/file.txt", function(text) {
    //    console.log("File contents: " + text);
    //}, function(error) {
    //    console.log("Error: " + error);
    //});

    /**
     * Use shared error handling functions when necessary.
     * Handle all error conditions explicitly to avoid dropped errors.
     */

    /**
     * Loops cannot be asynchronous
     * When necessary, use recursive functions in place of loops to perform iterations in separate turns of the event
     * loop.
     * This type of recursion will not overflow the call stack.
     */

    /**
     * Use WebWorkers to move expensive computations out of the main event queue.
     * If the Worker API is not available, split expensive computations up as much as possible.
     */

    /**
     * Because events in JavaScript occur nondeterministically, it is often necessary to use counters to avoid data
     * races
     */

    /**
     * Never call an asynchronous callback synchronously. Use setTimeout or another async API to schedule async
     * callbacks in another turn
     */

    /**
     * Promises, deferreds and futures are all variations of the same concept.
     */

    /**
     * Rather than accepting a callback as an argument, a promise accepts a callback after being called via a then
     * (or similar) method. This can lead to composability, the ability to return specific objects from a promise and
     * then create a new promise using the result. The value of this is the ability to create a logic to callbacks and
     * reason about them more clearly.
     */

    /**
     * A promise is essentially an object (read concurrent operation) (function, method) that will eventually produce a
     * return value
     */

    /**
     * Use promises to compose concurrent operations and avoid data races.
     * When a race condition is necessary, use select or choose to resolve it.
     */

    /**
     * select or choose is implemented as resolve, reject, and race nativley
     */
}(assert));