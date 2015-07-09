/*global console*/
// A car "class"
function Car(model) {

    this.model = model;
    this.color = "silver";
    this.year = "2012";

    this.getInfo = function () {
        return this.model + " " + this.year;
    };

}

var myCar = new Car("ford");

myCar.year = "2010";

console.log(myCar.getInfo());


// Each of the following options will create a new empty object:

var newObject = {};

// or
var newObject = Object.create(Object.prototype);

// or
var newObject = new Object();


// ECMAScript 3 compatible approaches

// 1. Dot syntax

// Set properties
newObject.someKey = "Hello World";

// Get properties
var value = newObject.someKey;


// 2. Square bracket syntax

// Set properties
newObject["someKey"] = "Hello World";

// Get properties
var value = newObject["someKey"];


// ECMAScript 5 only compatible approaches
// For more information see: http://kangax.github.com/es5-compat-table/

// 3. Object.defineProperty

// Set properties
Object.defineProperty(newObject, "someKey", {
    value: "for more control of the property's behavior",
    writable: true,
    enumerable: true,
    configurable: true
});

// If the above feels a little difficult to read, a short-hand could
// be written as follows:

var defineProp = function (obj, key, value) {
    var config = {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true
    };
    Object.defineProperty(obj, key, config);
};

// To use, we then create a new empty "person" object
var person = Object.create(Object.prototype);

// Populate the object with properties
defineProp(person, "car", "Delorean");
defineProp(person, "dateOfBirth", "1981");
defineProp(person, "hasBeard", false);

console.log(person);
// Outputs: Object {car: "Delorean", dateOfBirth: "1981", hasBeard: false}


// 4. Object.defineProperties

// Set properties
Object.defineProperties(newObject, {

    "someKey": {
        value: "Hello World",
        writable: true
    },

    "anotherKey": {
        value: "Foo bar",
        writable: false
    }

});

// Getting properties for 3. and 4. can be done using any of the
// options in 1. and 2.


// Usage:

// Create a race car driver that inherits from the person object
var driver = Object.create(person);

// Set some properties for the driver
defineProp(driver, "topSpeed", "100mph");

// Get an inherited property (1981)
console.log(driver.dateOfBirth);

// Get the property we set (100mph)
console.log(driver.topSpeed);


function Car(model, year, miles) {

    this.model = model;
    this.year = year;
    this.miles = miles;

    this.toString = function () {
        return this.model + " has done " + this.miles + " miles";
    };
}

// Usage:

// We can create new instances of the car
var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

// and then open our browser console to view the
// output of the toString() method being called on
// these objects
console.log(civic.toString());
console.log(mondeo.toString());


function Car(model, year, miles) {

    this.model = model;
    this.year = year;
    this.miles = miles;

}


// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function () {
    return this.model + " has done " + this.miles + " miles";
};

// Usage:

var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());


var myObjectLiteral = {

    variableKey: variableValue,

    functionKey: function () {
        // ...
    }
};

var myModule = {

    myProperty: "someValue",

    // object literals can contain properties and methods.
    // e.g we can define a further object for module configuration:
    myConfig: {
        useCaching: true,
        language: "en"
    },

    // a very basic method
    saySomething: function () {
        console.log("Where in the world is Paul Irish today?");
    },

    // output a value based on the current configuration
    reportMyConfig: function () {
        console.log("Caching is: " + ( this.myConfig.useCaching ? "enabled" : "disabled"));
    },

    // override the current configuration
    updateMyConfig: function (newConfig) {

        if (typeof newConfig === "object") {
            this.myConfig = newConfig;
            console.log(this.myConfig.language);
        }
    }
};

// Outputs: Where in the world is Paul Irish today?
myModule.saySomething();

// Outputs: Caching is: enabled
myModule.reportMyConfig();

// Outputs: fr
myModule.updateMyConfig({
    language: "fr",
    useCaching: false
});

// Outputs: Caching is: disabled
myModule.reportMyConfig();


var testModule = (function () {

    var counter = 0;

    return {

        incrementCounter: function () {
            return counter++;
        },

        resetCounter: function () {
            console.log("counter value prior to reset: " + counter);
            counter = 0;
        }
    };

})();

// Usage:

// Increment our counter
testModule.incrementCounter();

// Check the counter value and reset
// Outputs: counter value prior to reset: 1
testModule.resetCounter();


var myNamespace = (function () {

    var myPrivateVar, myPrivateMethod;

    // A private counter variable
    myPrivateVar = 0;

    // A private function which logs any arguments
    myPrivateMethod = function (foo) {
        console.log(foo);
    };

    return {

        // A public variable
        myPublicVar: "foo",

        // A public function utilizing privates
        myPublicFunction: function (bar) {

            // Increment our private counter
            myPrivateVar++;

            // Call our private method using bar
            myPrivateMethod(bar);

        }
    };

})();


var basketModule = (function () {

    // privates

    var basket = [];

    function doSomethingPrivate() {
        //...
    }

    function doSomethingElsePrivate() {
        //...
    }

    // Return an object exposed to the public
    return {

        // Add items to our basket
        addItem: function (values) {
            basket.push(values);
        },

        // Get the count of items in the basket
        getItemCount: function () {
            return basket.length;
        },

        // Public alias to a private function
        doSomething: doSomethingPrivate,

        // Get the total value of items in the basket
        getTotal: function () {

            var q = this.getItemCount(),
                p = 0;

            while (q--) {
                p += basket[q].price;
            }

            return p;
        }
    };
})();


// basketModule returns an object with a public API we can use

basketModule.addItem({
    item: "bread",
    price: 0.5
});

basketModule.addItem({
    item: "butter",
    price: 0.3
});

// Outputs: 2
console.log(basketModule.getItemCount());

// Outputs: 0.8
console.log(basketModule.getTotal());

// However, the following will not work:

// Outputs: undefined
// This is because the basket itself is not exposed as a part of our
// public API
console.log(basketModule.basket);

// This also won't work as it only exists within the scope of our
// basketModule closure, but not in the returned public object
console.log(basket);

// Global module
var myModule = (function (jQ, _) {

    function privateMethod1() {
        jQ(".container").html("test");
    }

    function privateMethod2() {
        console.log(_.min([10, 5, 100, 2, 1000]));
    }

    return {
        publicMethod: function () {
            privateMethod1();
        }
    };

// Pull in jQuery and Underscore
})(jQuery, _);

myModule.publicMethod();

// Global module
var myModule = (function () {

    // Module object
    var module = {},
        privateVariable = "Hello World";

    function privateMethod() {
        // ...
    }

    module.publicProperty = "Foobar";
    module.publicMethod = function () {
        console.log(privateVariable);
    };

    return module;

})();

var store = window.store || {};

if (!store["basket"]) {
    store.basket = {};
}

if (!store.basket["core"]) {
    store.basket.core = {};
}

store.basket.core = {
    // ...rest of our logic
};

require(["dojo/_base/customStore"], function (store) {

    // using dojo.setObject()
    store.setObject("basket.core", (function () {

        var basket = [];

        function privateMethod() {
            console.log(basket);
        }

        return {
            publicMethod: function () {
                privateMethod();
            }
        };

    })());

});

// create namespace
Ext.namespace("myNameSpace");

// create application
myNameSpace.app = function () {

    // do NOT access DOM from here; elements don't exist yet

    // private variables
    var btn1,
        privVar1 = 11;

    // private functions
    var btn1Handler = function (button, event) {
        console.log("privVar1=" + privVar1);
        console.log("this.btn1Text=" + this.btn1Text);
    };

    // public space
    return {
        // public properties, e.g. strings to translate
        btn1Text: "Button 1",

        // public methods
        init: function () {

            if (Ext.Ext2) {

                btn1 = new Ext.Button({
                    renderTo: "btn1-ct",
                    text: this.btn1Text,
                    handler: btn1Handler
                });

            } else {

                btn1 = new Ext.Button("btn1-ct", {
                    text: this.btn1Text,
                    handler: btn1Handler
                });

            }
        }
    };
}();

Y.namespace("store.basket");
Y.store.basket = (function () {

    var myPrivateVar, myPrivateMethod;

    // private variables:
    myPrivateVar = "I can be accessed only within Y.store.basket.";

    // private method:
    myPrivateMethod = function () {
        Y.log("I can be accessed only from within YAHOO.store.basket");
    }

    return {
        myPublicProperty: "I'm a public property.",

        myPublicMethod: function () {
            Y.log("I'm a public method.");

            // Within basket, I can access "private" vars and methods:
            Y.log(myPrivateVar);
            Y.log(myPrivateMethod());

            // The native scope of myPublicMethod is store so we can
            // access public members using "this":
            Y.log(this.myPublicProperty);
        }
    };

})();


function library(module) {

    $(function () {
        if (module.init) {
            module.init();
        }
    });

    return module;
}

var myLibrary = library(function () {

    return {
        init: function () {
            // module implementation
        }
    };
}());


var myRevealingModule = (function () {

    var privateVar = "Ben Cherry",
        publicVar = "Hey there!";

    function privateFunction() {
        console.log("Name:" + privateVar);
    }

    function publicSetName(strName) {
        privateVar = strName;
    }

    function publicGetName() {
        privateFunction();
    }


    // Reveal public pointers to
    // private functions and properties

    return {
        setName: publicSetName,
        greeting: publicVar,
        getName: publicGetName
    };

})();

myRevealingModule.setName("Paul Kinlan");


var myRevealingModule = (function () {

    var privateCounter = 0;

    function privateFunction() {
        privateCounter++;
    }

    function publicFunction() {
        publicIncrement();
    }

    function publicIncrement() {
        privateFunction();
    }

    function publicGetCount() {
        return privateCounter;
    }

    // Reveal public pointers to
    // private functions and properties

    return {
        start: publicFunction,
        increment: publicIncrement,
        count: publicGetCount
    };

})();

myRevealingModule.start();


var mySingleton = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton

        // Private methods and variables
        function privateMethod() {
            console.log("I am private");
        }

        var privateVariable = "Im also private";

        var privateRandomNumber = Math.random();

        return {

            // Public methods and variables
            publicMethod: function () {
                console.log("The public can see me!");
            },

            publicProperty: "I am also public",

            getRandomNumber: function () {
                return privateRandomNumber;
            }

        };

    };

    return {

        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {

            if (!instance) {
                instance = init();
            }

            return instance;
        }

    };

})();

var myBadSingleton = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton

        var privateRandomNumber = Math.random();

        return {

            getRandomNumber: function () {
                return privateRandomNumber;
            }

        };

    };

    return {

        // Always create a new Singleton instance
        getInstance: function () {

            instance = init();

            return instance;
        }

    };

})();


// Usage:

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber()); // true

// Note: as we are working with random numbers, there is a
// mathematical possibility both numbers will be the same,
// however unlikely. The above example should otherwise still
// be valid.

mySingleton.getInstance = function () {
    if (this._instance == null) {
        if (isFoo()) {
            this._instance = new FooSingleton();
        } else {
            this._instance = new BasicSingleton();
        }
    }
    return this._instance;
};


var SingletonTester = (function () {

    // options: an object containing configuration options for the singleton
    // e.g var options = { name: "test", pointX: 5};
    function Singleton(options) {

        // set options to the options supplied
        // or an empty object if none are provided
        options = options || {};

        // set some properties for our singleton
        this.name = "SingletonTester";

        this.pointX = options.pointX || 6;

        this.pointY = options.pointY || 10;

    }

    // our instance holder
    var instance;

    // an emulation of static variables and methods
    var _static = {

        name: "SingletonTester",

        // Method for getting an instance. It returns
        // a singleton instance of a singleton object
        getInstance: function (options) {
            if (instance === undefined) {
                instance = new Singleton(options);
            }

            return instance;

        }
    };

    return _static;

})();

var singletonTest = SingletonTester.getInstance({
    pointX: 5
});

// Log the output of pointX just to verify it is correct
// Outputs: 5
console.log(singletonTest.pointX);


function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.add = function (obj) {
    return this.observerList.push(obj);
};

ObserverList.prototype.count = function () {
    return this.observerList.length;
};

ObserverList.prototype.get = function (index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList[index];
    }
};

ObserverList.prototype.indexOf = function (obj, startIndex) {
    var i = startIndex;

    while (i < this.observerList.length) {
        if (this.observerList[i] === obj) {
            return i;
        }
        i++;
    }

    return -1;
};

ObserverList.prototype.removeAt = function (index) {
    this.observerList.splice(index, 1);
};


function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function (observer) {
    this.observers.add(observer);
};

Subject.prototype.removeObserver = function (observer) {
    this.observers.removeAt(this.observers.indexOf(observer, 0));
};

Subject.prototype.notify = function (context) {
    var observerCount = this.observers.count();
    for (var i = 0; i < observerCount; i++) {
        this.observers.get(i).update(context);
    }
};


// The Observer
function Observer() {
    this.update = function () {
        // ...
    };
}


// Extend an object with an extension
function extend(extension, obj) {
    for (var key in extension) {
        obj[key] = extension[key];
    }
}

// References to our DOM elements

var controlCheckbox = document.getElementById("mainCheckbox"),
    addBtn = document.getElementById("addNewObserver"),
    container = document.getElementById("observersContainer");


// Concrete Subject

// Extend the controlling checkbox with the Subject class
extend(new Subject(), controlCheckbox);

// Clicking the checkbox will trigger notifications to its observers
controlCheckbox.onclick = function () {
    controlCheckbox.notify(controlCheckbox.checked);
};

addBtn.onclick = addNewObserver;

// Concrete Observer

function addNewObserver() {

    // Create a new checkbox to be added
    var check = document.createElement("input");
    check.type = "checkbox";

    // Extend the checkbox with the Observer class
    extend(new Observer(), check);

    // Override with custom update behaviour
    check.update = function (value) {
        this.checked = value;
    };

    // Add the new observer to our list of observers
    // for our main subject
    controlCheckbox.addObserver(check);

    // Append the item to the container
    container.appendChild(check);
}


// A very simple new mail handler

// A count of the number of messages received
var mailCounter = 0;

// Initialize subscribers that will listen out for a topic
// with the name "inbox/newMessage".

// Render a preview of new messages
var subscriber1 = subscribe("inbox/newMessage", function (topic, data) {

    // Log the topic for debugging purposes
    console.log("A new message was received: ", topic);

    // Use the data that was passed from our subject
    // to display a message preview to the user
    $(".messageSender").html(data.sender);
    $(".messagePreview").html(data.body);

});

// Here's another subscriber using the same data to perform
// a different task.

// Update the counter displaying the number of new
// messages received via the publisher

var subscriber2 = subscribe("inbox/newMessage", function (topic, data) {

    $('.newMessageCounter').html(++mailCounter);

});

publish("inbox/newMessage", [{
    sender: "hello@google.com",
    body: "Hey there! How are you doing today?"
}]);

// We could then at a later point unsubscribe our subscribers
// from receiving any new topic notifications as follows:
// unsubscribe( subscriber1 );
// unsubscribe( subscriber2 );

// Publish

// jQuery: $(obj).trigger("channel", [arg1, arg2, arg3]);
$(el).trigger("/login", [{username: "test", userData: "test"}]);

// Dojo: dojo.publish("channel", [arg1, arg2, arg3] );
dojo.publish("/login", [{username: "test", userData: "test"}]);

// YUI: el.publish("channel", [arg1, arg2, arg3]);
el.publish("/login", {username: "test", userData: "test"});


// Subscribe

// jQuery: $(obj).on( "channel", [data], fn );
$(el).on("/login", function (event) {...
});

// Dojo: dojo.subscribe( "channel", fn);
var handle = dojo.subscribe("/login", function (data) {..
});

// YUI: el.on("channel", handler);
el.on("/login", function (data) {...
});


// Unsubscribe

// jQuery: $(obj).off( "channel" );
$(el).off("/login");

// Dojo: dojo.unsubscribe( handle );
dojo.unsubscribe(handle);

// YUI: el.detach("channel");
el.detach("/login");


var pubsub = {};

(function (myObject) {

    // Storage for topics that can be broadcast
    // or listened to
    var topics = {};

    // An topic identifier
    var subUid = -1;

    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    myObject.publish = function (topic, args) {

        if (!topics[topic]) {
            return false;
        }

        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;

        while (len--) {
            subscribers[len].func(topic, args);
        }

        return this;
    };

    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    myObject.subscribe = function (topic, func) {

        if (!topics[topic]) {
            topics[topic] = [];
        }

        var token = ( ++subUid ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    myObject.unsubscribe = function (token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    };
}(pubsub));


// Another simple message handler

// A simple message logger that logs any topics and data received through our
// subscriber
var messageLogger = function (topics, data) {
    console.log("Logging: " + topics + ": " + data);
};

// Subscribers listen for topics they have subscribed to and
// invoke a callback function (e.g messageLogger) once a new
// notification is broadcast on that topic
var subscription = pubsub.subscribe("inbox/newMessage", messageLogger);

// Publishers are in charge of publishing topics or notifications of
// interest to the application. e.g:

pubsub.publish("inbox/newMessage", "hello world!");

// or
pubsub.publish("inbox/newMessage", ["test", "a", "b", "c"]);

// or
pubsub.publish("inbox/newMessage", {
    sender: "hello@google.com",
    body: "Hey again!"
});

// We can also unsubscribe if we no longer wish for our subscribers
// to be notified
pubsub.unsubscribe(subscription);

// Once unsubscribed, this for example won't result in our
// messageLogger being executed as the subscriber is
// no longer listening
pubsub.publish("inbox/newMessage", "Hello! are you still there?");


// Return the current local time to be used in our UI later
getCurrentTime = function () {

    var date = new Date(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        y = date.getFullYear(),
        t = date.toLocaleTimeString().toLowerCase();

    return (m + "/" + d + "/" + y + " " + t);
};

// Add a new row of data to our fictional grid component
function addGridRow(data) {

    // ui.grid.addRow( data );
    console.log("updated grid component with:" + data);

}

// Update our fictional grid to show the time it was last
// updated
function updateCounter(data) {

    // ui.grid.updateLastChanged( getCurrentTime() );
    console.log("data last updated at: " + getCurrentTime() + " with " + data);

}

// Update the grid using the data passed to our subscribers
gridUpdate = function (topic, data) {

    if (data !== undefined) {
        addGridRow(data);
        updateCounter(data);
    }

};

// Create a subscription to the newDataAvailable topic
var subscriber = pubsub.subscribe("newDataAvailable", gridUpdate);

// The following represents updates to our data layer. This could be
// powered by ajax requests which broadcast that new data is available
// to the rest of the application.

// Publish changes to the gridUpdated topic representing new entries
pubsub.publish("newDataAvailable", {
    summary: "Apple made $5 billion",
    identifier: "APPL",
    stockPrice: 570.91
});

pubsub.publish("newDataAvailable", {
    summary: "Microsoft made $20 million",
    identifier: "MSFT",
    stockPrice: 30.85
});


(function ($) {

    // Pre-compile templates and "cache" them using closure
    var
        userTemplate = _.template($("#userTemplate").html()),
        ratingsTemplate = _.template($("#ratingsTemplate").html());

    // Subscribe to the new user topic, which adds a user
    // to a list of users who have submitted reviews
    $.subscribe("/new/user", function (e, data) {

        if (data) {

            $('#users').append(userTemplate(data));

        }

    });

    // Subscribe to the new rating topic. This is composed of a title and
    // rating. New ratings are appended to a running list of added user
    // ratings.
    $.subscribe("/new/rating", function (e, data) {

        if (data) {

            $("#ratings").append(ratingsTemplate(data));

        }

    });

    // Handler for adding a new user
    $("#add").on("click", function (e) {

        e.preventDefault();

        var strUser = $("#twitter_handle").val(),
            strMovie = $("#movie_seen").val(),
            strRating = $("#movie_rating").val();

        // Inform the application a new user is available
        $.publish("/new/user", {name: strUser});

        // Inform the app a new rating is available
        $.publish("/new/rating", {title: strMovie, rating: strRating});

    });

})(jQuery);


(function ($) {

    // Pre-compile template and "cache" it using closure
    var resultTemplate = _.template($("#resultTemplate").html());

    // Subscribe to the new search tags topic
    $.subscribe("/search/tags", function (e, tags) {
        $("#lastQuery")
            .html("<p>Searched for:<strong>" + tags + "</strong></p>");
    });

    // Subscribe to the new results topic
    $.subscribe("/search/resultSet", function (e, results) {

        $("#searchResults").empty().append(resultTemplate(results));

    });

    // Submit a search query and publish tags on the /search/tags topic
    $("#flickrSearch").submit(function (e) {

        e.preventDefault();
        var tags = $(this).find("#query").val();

        if (!tags) {
            return;
        }

        $.publish("/search/tags", [$.trim(tags)]);

    });


    // Subscribe to new tags being published and perform
    // a search query using them. Once data has returned
    // publish this data for the rest of the application
    // to consume

    $.subscribe("/search/tags", function (e, tags) {

        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
                tags: tags,
                tagmode: "any",
                format: "json"
            },

            function (data) {

                if (!data.items.length) {
                    return;
                }

                $.publish("/search/resultSet", {items: data.items});
            });

    });


})(jQuery);


var mediator = {};

var orgChart = {

    addNewEmployee: function () {

        // getEmployeeDetail provides a view that users interact with
        var employeeDetail = this.getEmployeeDetail();

        // when the employee detail is complete, the mediator (the 'orgchart' object)
        // decides what should happen next
        employeeDetail.on("complete", function (employee) {

            // set up additional objects that have additional events, which are used
            // by the mediator to do additional things
            var managerSelector = this.selectManager(employee);
            managerSelector.on("save", function (employee) {
                employee.save();
            });

        });
    },

    // ...
}

var MenuItem = MyFrameworkView.extend({

    events: {
        "click .thatThing": "clickedIt"
    },

    clickedIt: function (e) {
        e.preventDefault();

        // assume this triggers "menu:click:foo"
        MyFramework.trigger("menu:click:" + this.model.get("name"));
    }

});

// ... somewhere else in the app

var MyWorkflow = function () {
    MyFramework.on("menu:click:foo", this.doStuff, this);
};

MyWorkflow.prototype.doStuff = function () {
    // instantiate multiple objects here.
    // set up event handlers for those objects.
    // coordinate all of the objects into a meaningful workflow.
};


var myCar = {

    name: "Ford Escort",

    drive: function () {
        console.log("Weeee. I'm driving!");
    },

    panic: function () {
        console.log("Wait. How do you stop this thing?");
    }

};

// Use Object.create to instantiate a new car
var yourCar = Object.create(myCar);

// Now we can see that one is a prototype of the other
console.log(yourCar.name);


var vehicle = {
    getModel: function () {
        console.log("The model of this vehicle is.." + this.model);
    }
};

var car = Object.create(vehicle, {

    "id": {
        value: MY_GLOBAL.nextId(),
        // writable:false, configurable:false by default
        enumerable: true
    },

    "model": {
        value: "Ford",
        enumerable: true
    }

});


var vehiclePrototype = {

    init: function (carModel) {
        this.model = carModel;
    },

    getModel: function () {
        console.log("The model of this vehicle is.." + this.model);
    }
};


function vehicle(model) {

    function F() {
    };
    F.prototype = vehiclePrototype;

    var f = new F();

    f.init(model);
    return f;

}

var car = vehicle("Ford Escort");
car.getModel();

var beget = (function () {

    function F() {
    }

    return function (proto) {
        F.prototype = proto;
        return new F();
    };
})();

(function () {

    var carManager = {

        // request information
        requestInfo: function (model, id) {
            return "The information for " + model + " with ID " + id + " is foobar";
        },

        // purchase the car
        buyVehicle: function (model, id) {
            return "You have successfully purchased Item " + id + ", a " + model;
        },

        // arrange a viewing
        arrangeViewing: function (model, id) {
            return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
        }

    };

})();

carManager.execute("buyVehicle", "Ford Escort", "453543");

carManager.execute = function (name) {
    return carManager[name] && carManager[name].apply(carManager, [].slice.call(arguments, 1));
};

carManager.execute("arrangeViewing", "Ferrari", "14523");
carManager.execute("requestInfo", "Ford Mondeo", "54323");
carManager.execute("requestInfo", "Ford Escort", "34232");
carManager.execute("buyVehicle", "Ford Escort", "34232");


var addMyEvent = function (el, ev, fn) {

    if (el.addEventListener) {
        el.addEventListener(ev, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent("on" + ev, fn);
    } else {
        el["on" + ev] = fn;
    }

};


bindReady: function () {
...
    if(document.addEventListener)
    {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", jQuery.ready, false);

        // If IE event model is used
    }
else
    if (document.attachEvent) {

        document.attachEvent("onreadystatechange", DOMContentLoaded);

        // A fallback to window.onload, that will always work
        window.attachEvent("onload", jQuery.ready);
    ...


        var
        module = (function () {

            var _private = {
                i: 5,
                get: function () {
                    console.log("current value:" + this.i);
                },
                set: function (val) {
                    this.i = val;
                },
                run: function () {
                    console.log("running");
                },
                jump: function () {
                    console.log("jumping");
                }
            };

            return {

                facade: function (args) {
                    _private.set(args.val);
                    _private.get();
                    if (args.run) {
                        _private.run();
                    }
                }
            };
        }());


// Outputs: "current value: 10" and "running"
        module.facade({run: true, val: 10});


// Types.js - Constructors used behind the scenes

// A constructor for defining new cars
        function Car(options) {

            // some defaults
            this.doors = options.doors || 4;
            this.state = options.state || "brand new";
            this.color = options.color || "silver";

        }

// A constructor for defining new trucks
        function Truck(options) {

            this.state = options.state || "used";
            this.wheelSize = options.wheelSize || "large";
            this.color = options.color || "blue";
        }


// FactoryExample.js

// Define a skeleton vehicle factory
        function VehicleFactory() {
        }

// Define the prototypes and utilities for this factory

// Our default vehicleClass is Car
        VehicleFactory.prototype.vehicleClass = Car;

// Our Factory method for creating new Vehicle instances
        VehicleFactory.prototype.createVehicle = function (options) {

            switch (options.vehicleType) {
                case "car":
                    this.vehicleClass = Car;
                    break;
                case "truck":
                    this.vehicleClass = Truck;
                    break;
                //defaults to VehicleFactory.prototype.vehicleClass (Car)
            }

            return new this.vehicleClass(options);

        };

// Create an instance of our factory that makes cars
        var carFactory = new VehicleFactory();
        var car = carFactory.createVehicle({
            vehicleType: "car",
            color: "yellow",
            doors: 6
        });

// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
        console.log(car instanceof Car);

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
        console.log(car);

        var movingTruck = carFactory.createVehicle({
            vehicleType: "truck",
            state: "like new",
            color: "red",
            wheelSize: "small"
        });

// Test to confirm our truck was created with the vehicleClass/prototype Truck

// Outputs: true
        console.log(movingTruck instanceof Truck);

// Outputs: Truck object of color "red", a "like new" state
// and a "small" wheelSize
        console.log(movingTruck);
    class
        = "brush: js" >

            function TruckFactory() {
            }
        TruckFactory.prototype = new VehicleFactory();
        TruckFactory.prototype.vehicleClass = Truck;

        var truckFactory = new TruckFactory();
        var myBigTruck = truckFactory.createVehicle({
            state: "omg..so bad.",
            color: "pink",
            wheelSize: "so big"
        });

// Confirms that myBigTruck was created with the prototype Truck
// Outputs: true
        console.log(myBigTruck instanceof Truck);

// Outputs: Truck object with the color "pink", wheelSize "so big"
// and state "omg. so bad"
        console.log(myBigTruck);


        var abstractVehicleFactory = (function () {

            // Storage for our vehicle types
            var types = {};

            return {
                getVehicle: function (type, customizations) {
                    var Vehicle = types[type];

                    return (Vehicle ? new Vehicle(customizations) : null);
                },

                registerVehicle: function (type, Vehicle) {
                    var proto = Vehicle.prototype;

                    // only register classes that fulfill the vehicle contract
                    if (proto.drive && proto.breakDown) {
                        types[type] = Vehicle;
                    }

                    return abstractVehicleFactory;
                }
            };
        })();


// Usage:

        abstractVehicleFactory.registerVehicle("car", Car);
        abstractVehicleFactory.registerVehicle("truck", Truck);

// Instantiate a new car based on the abstract vehicle type
        var car = abstractVehicleFactory.getVehicle("car", {
            color: "lime green",
            state: "like new"
        });

// Instantiate a new truck in a similar manner
        var truck = abstractVehicleFactory.getVehicle("truck", {
            wheelSize: "medium",
            color: "neon yellow"
        });

        var Person = function (firstName, lastName) {

            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = "male";

        };

// a new instance of Person can then easily be created as follows:
        var clark = new Person("Clark", "Kent");

// Define a subclass constructor for for "Superhero":
        var Superhero = function (firstName, lastName, powers) {

            // Invoke the superclass constructor on the new object
            // then use .call() to invoke the constructor as a method of
            // the object to be initialized.

            Person.call(this, firstName, lastName);

            // Finally, store their powers, a new array of traits not found in a normal "Person"
            this.powers = powers;
        };

        Superhero.prototype = Object.create(Person.prototype);
        var superman = new Superhero("Clark", "Kent", ["flight", "heat-vision"]);
        console.log(superman);

// Outputs Person attributes as well as powers

        var myMixins = {

            moveUp: function () {
                console.log("move up");
            },

            moveDown: function () {
                console.log("move down");
            },

            stop: function () {
                console.log("stop! in the name of love!");
            }

        };

// A skeleton carAnimator constructor
        function CarAnimator() {
            this.moveLeft = function () {
                console.log("move left");
            };
        }

// A skeleton personAnimator constructor
        function PersonAnimator() {
            this.moveRandomly = function () { /*..*/
            };
        }

// Extend both constructors with our Mixin
        _.extend(CarAnimator.prototype, myMixins);
        _.extend(PersonAnimator.prototype, myMixins);

// Create a new instance of carAnimator
        var myAnimator = new CarAnimator();
        myAnimator.moveLeft();
        myAnimator.moveDown();
        myAnimator.stop();

// Outputs:
// move left
// move down
// stop! in the name of love!


// Define a simple Car constructor
        var Car = function (settings) {

            this.model = settings.model || "no model provided";
            this.color = settings.color || "no colour provided";

        };

// Mixin
        var Mixin = function () {
        };

        Mixin.prototype = {

            driveForward: function () {
                console.log("drive forward");
            },

            driveBackward: function () {
                console.log("drive backward");
            },

            driveSideways: function () {
                console.log("drive sideways");
            }

        };


// Extend an existing object with a method from another
        function augment(receivingClass, givingClass) {

            // only provide certain methods
            if (arguments[2]) {
                for (var i = 2, len = arguments.length; i < len; i++) {
                    receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
                }
            }
            // provide all methods
            else {
                for (var methodName in givingClass.prototype) {

                    // check to make sure the receiving class doesn't
                    // have a method of the same name as the one currently
                    // being processed
                    if (!Object.hasOwnProperty.call(receivingClass.prototype, methodName)) {
                        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
                    }

                    // Alternatively (check prototype chain as well):
                    // if ( !receivingClass.prototype[methodName] ) {
                    // receivingClass.prototype[methodName] = givingClass.prototype[methodName];
                    // }
                }
            }
        }


// Augment the Car constructor to include "driveForward" and "driveBackward"
        augment(Car, Mixin, "driveForward", "driveBackward");

// Create a new Car
        var myCar = new Car({
            model: "Ford Escort",
            color: "blue"
        });

// Test to make sure we now have access to the methods
        myCar.driveForward();
        myCar.driveBackward();

// Outputs:
// drive forward
// drive backward

// We can also augment Car to include all functions from our mixin
// by not explicitly listing a selection of them
        augment(Car, Mixin);

        var mySportsCar = new Car({
            model: "Porsche",
            color: "red"
        });

        mySportsCar.driveSideways();

// Outputs:
// drive sideways


// A vehicle constructor
        function Vehicle(vehicleType) {

            // some sane defaults
            this.vehicleType = vehicleType || "car";
            this.model = "default";
            this.license = "00000-000";

        }

// Test instance for a basic vehicle
        var testInstance = new Vehicle("car");
        console.log(testInstance);

// Outputs:
// vehicle: car, model:default, license: 00000-000

// Lets create a new instance of vehicle, to be decorated
        var truck = new Vehicle("truck");

// New functionality we're decorating vehicle with
        truck.setModel = function (modelName) {
            this.model = modelName;
        };

        truck.setColor = function (color) {
            this.color = color;
        };

// Test the value setters and value assignment works correctly
        truck.setModel("CAT");
        truck.setColor("blue");

        console.log(truck);

// Outputs:
// vehicle:truck, model:CAT, color: blue

// Demonstrate "vehicle" is still unaltered
        var secondInstance = new Vehicle("car");
        console.log(secondInstance);

// Outputs:
// vehicle: car, model:default, license: 00000-000


// The constructor to decorate
        function MacBook() {

            this.cost = function () {
                return 997;
            };
            this.screenSize = function () {
                return 11.6;
            };

        }

// Decorator 1
        function memory(macbook) {

            var v = macbook.cost();
            macbook.cost = function () {
                return v + 75;
            };

        }

// Decorator 2
        function engraving(macbook) {

            var v = macbook.cost();
            macbook.cost = function () {
                return v + 200;
            };

        }

// Decorator 3
        function insurance(macbook) {

            var v = macbook.cost();
            macbook.cost = function () {
                return v + 250;
            };

        }

        var mb = new MacBook();
        memory(mb);
        engraving(mb);
        insurance(mb);

// Outputs: 1522
        console.log(mb.cost());

// Outputs: 11.6
        console.log(mb.screenSize());


// Create interfaces using a pre-defined Interface
// constructor that accepts an interface name and
// skeleton methods to expose.

// In our reminder example summary() and placeOrder()
// represent functionality the interface should
// support
        var reminder = new Interface("List", ["summary", "placeOrder"]);

        var properties = {
            name: "Remember to buy the milk",
            date: "05/06/2016",
            actions: {
                summary: function () {
                    return "Remember to buy the milk, we are almost out!";
                },
                placeOrder: function () {
                    return "Ordering milk from your local grocery store";
                }
            }
        };

// Now create a constructor implementing the above properties
// and methods

        function Todo(config) {

            // State the methods we expect to be supported
            // as well as the Interface instance being checked
            // against

            Interface.ensureImplements(config.actions, reminder);

            this.name = config.name;
            this.methods = config.actions;

        }

// Create a new instance of our Todo constructor

        var todoItem = Todo(properties);

// Finally test to make sure these function correctly

        console.log(todoItem.methods.summary());
        console.log(todoItem.methods.placeOrder());

// Outputs:
// Remember to buy the milk, we are almost out!
// Ordering milk from your local grocery store


        var Macbook = function () {
            //...
        };

        var MacbookWith4GBRam = function () {
            },
            MacbookWith8GBRam = function () {
            },
            MacbookWith4GBRamAndEngraving = function () {
            },
            MacbookWith8GBRamAndEngraving = function () {
            },
            MacbookWith8GBRamAndParallels = function () {
            },
            MacbookWith4GBRamAndParallels = function () {
            },
            MacbookWith8GBRamAndParallelsAndCase = function () {
            },
            MacbookWith4GBRamAndParallelsAndCase = function () {
            },
            MacbookWith8GBRamAndParallelsAndCaseAndInsurance = function () {
            },
            MacbookWith4GBRamAndParallelsAndCaseAndInsurance = function () {
            };


        var Macbook = new Interface("Macbook",
            ["addEngraving",
                "addParallels",
                "add4GBRam",
                "add8GBRam",
                "addCase"]);

// A Macbook Pro might thus be represented as follows:
        var MacbookPro = function () {
            // implements Macbook
        };

        MacbookPro.prototype = {
            addEngraving: function () {
            },
            addParallels: function () {
            },
            add4GBRam: function () {
            },
            add8GBRam: function () {
            },
            addCase: function () {
            },
            getPrice: function () {
                // Base price
                return 900.00;
            }
        };

// Macbook decorator abstract decorator class

        var MacbookDecorator = function (macbook) {

            Interface.ensureImplements(macbook, Macbook);
            this.macbook = macbook;

        };

        MacbookDecorator.prototype = {
            addEngraving: function () {
                return this.macbook.addEngraving();
            },
            addParallels: function () {
                return this.macbook.addParallels();
            },
            add4GBRam: function () {
                return this.macbook.add4GBRam();
            },
            add8GBRam: function () {
                return this.macbook.add8GBRam();
            },
            addCase: function () {
                return this.macbook.addCase();
            },
            getPrice: function () {
                return this.macbook.getPrice();
            }
        };


// First, define a way to extend an object a
// with the properties in object b. We'll use
// this shortly!
        function extend(a, b) {
            for (var key in b)
                if (b.hasOwnProperty(key))
                    a[key] = b[key];
            return a;
        }

        var CaseDecorator = function (macbook) {
            this.macbook = macbook;
        };

// Let's now extend (decorate) the CaseDecorator
// with a MacbookDecorator
        extend(CaseDecorator, MacbookDecorator);

        CaseDecorator.prototype.addCase = function () {
            return this.macbook.addCase() + "Adding case to macbook";
        };

        CaseDecorator.prototype.getPrice = function () {
            return this.macbook.getPrice() + 45.00;
        };


// Instantiation of the macbook
        var myMacbookPro = new MacbookPro();

// Outputs: 900.00
        console.log(myMacbookPro.getPrice());

// Decorate the macbook
        var decoratedMacbookPro = new CaseDecorator(myMacbookPro);

// This will return 945.00
        console.log(decoratedMacbookPro.getPrice());

        var decoratorApp = decoratorApp || {};

// define the objects we're going to use
        decoratorApp = {

            defaults: {
                validate: false,
                limit: 5,
                name: "foo",
                welcome: function () {
                    console.log("welcome!");
                }
            },

            options: {
                validate: true,
                name: "bar",
                helloWorld: function () {
                    console.log("hello world");
                }
            },

            settings: {},

            printObj: function (obj) {
                var arr = [],
                    next;
                $.each(obj, function (key, val) {
                    next = key + ": ";
                    next += $.isPlainObject(val) ? printObj(val) : val;
                    arr.push(next);
                });

                return "{ " + arr.join(", ") + " }";
            }

        };

// merge defaults and options, without modifying defaults explicitly
        decoratorApp.settings = $.extend({}, decoratorApp.defaults, decoratorApp.options);

// what we have done here is decorated defaults in a way that provides
// access to the properties and functionality it has to offer (as well as
// that of the decorator "options"). defaults itself is left unchanged

        $("#log")
            .append(decoratorApp.printObj(decoratorApp.settings) + +decoratorApp.printObj(decoratorApp.options) + +decoratorApp.printObj(decoratorApp.defaults));

// settings -- { validate: true, limit: 5, name: bar, welcome: function (){ console.log( "welcome!" ); },
// helloWorld: function (){ console.log( "hello world" ); } }
// options -- { validate: true, name: bar, helloWorld: function (){ console.log( "hello world" ); } }
// defaults -- { validate: false, limit: 5, name: foo, welcome: function (){ console.log("welcome!"); } }


// Simulate pure virtual inheritance/"implement" keyword for JS
        Function.prototype.implementsFor = function (parentClassOrObject) {
            if (parentClassOrObject.constructor === Function) {
                // Normal Inheritance
                this.prototype = new parentClassOrObject();
                this.prototype.constructor = this;
                this.prototype.parent = parentClassOrObject.prototype;
            }
            else {
                // Pure Virtual Inheritance
                this.prototype = parentClassOrObject;
                this.prototype.constructor = this;
                this.prototype.parent = parentClassOrObject;
            }
            return this;
        };

// Flyweight object
        var CoffeeOrder = {

            // Interfaces
            serveCoffee: function (context) {
            },
            getFlavor: function () {
            }

        };


// ConcreteFlyweight object that creates ConcreteFlyweight
// Implements CoffeeOrder
        function CoffeeFlavor(newFlavor) {

            var flavor = newFlavor;

            // If an interface has been defined for a feature
            // implement the feature
            if (typeof this.getFlavor === "function") {
                this.getFlavor = function () {
                    return flavor;
                };
            }

            if (typeof this.serveCoffee === "function") {
                this.serveCoffee = function (context) {
                    console.log("Serving Coffee flavor "
                        + flavor
                        + " to table number "
                        + context.getTable());
                };
            }

        }


// Implement interface for CoffeeOrder
        CoffeeFlavor.implementsFor(CoffeeOrder);


// Handle table numbers for a coffee order
        function CoffeeOrderContext(tableNumber) {
            return {
                getTable: function () {
                    return tableNumber;
                }
            };
        }


        function CoffeeFlavorFactory() {
            var flavors = {},
                length = 0;

            return {
                getCoffeeFlavor: function (flavorName) {

                    var flavor = flavors[flavorName];
                    if (typeof flavor === "undefined") {
                        flavor = new CoffeeFlavor(flavorName);
                        flavors[flavorName] = flavor;
                        length++;
                    }
                    return flavor;
                },

                getTotalCoffeeFlavorsMade: function () {
                    return length;
                }
            };
        }

// Sample usage:
// testFlyweight()

        function testFlyweight() {


            // The flavors ordered.
            var flavors = new CoffeeFlavor(),

            // The tables for the orders.
                tables = new CoffeeOrderContext(),

            // Number of orders made
                ordersMade = 0,

            // The CoffeeFlavorFactory instance
                flavorFactory;

            function takeOrders(flavorIn, table) {
                flavors[ordersMade] = flavorFactory.getCoffeeFlavor(flavorIn);
                tables[ordersMade++] = new CoffeeOrderContext(table);
            }

            flavorFactory = new CoffeeFlavorFactory();

            takeOrders("Cappuccino", 2);
            takeOrders("Cappuccino", 2);
            takeOrders("Frappe", 1);
            takeOrders("Frappe", 1);
            takeOrders("Xpresso", 1);
            takeOrders("Frappe", 897);
            takeOrders("Cappuccino", 97);
            takeOrders("Cappuccino", 97);
            takeOrders("Frappe", 3);
            takeOrders("Xpresso", 3);
            takeOrders("Cappuccino", 3);
            takeOrders("Xpresso", 96);
            takeOrders("Frappe", 552);
            takeOrders("Cappuccino", 121);
            takeOrders("Xpresso", 121);

            for (var i = 0; i < ordersMade; ++i) {
                flavors[i].serveCoffee(tables[i]);
            }
            console.log(" ");
            console.log("total CoffeeFlavor objects made: " + flavorFactory.getTotalCoffeeFlavorsMade());
        }

        var Book = function (id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {

            this.id = id;
            this.title = title;
            this.author = author;
            this.genre = genre;
            this.pageCount = pageCount;
            this.publisherID = publisherID;
            this.ISBN = ISBN;
            this.checkoutDate = checkoutDate;
            this.checkoutMember = checkoutMember;
            this.dueReturnDate = dueReturnDate;
            this.availability = availability;

        };

        Book.prototype = {

            getTitle: function () {
                return this.title;
            },

            getAuthor: function () {
                return this.author;
            },

            getISBN: function () {
                return this.ISBN;
            },

            // For brevity, other getters are not shown
            updateCheckoutStatus: function (bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {

                this.id = bookID;
                this.availability = newStatus;
                this.checkoutDate = checkoutDate;
                this.checkoutMember = checkoutMember;
                this.dueReturnDate = newReturnDate;

            },

            extendCheckoutPeriod: function (bookID, newReturnDate) {

                this.id = bookID;
                this.dueReturnDate = newReturnDate;

            },

            isPastDue: function (bookID) {

                var currentDate = new Date();
                return currentDate.getTime() > Date.parse(this.dueReturnDate);

            }
        };

// Flyweight optimized version
        var Book = function (title, author, genre, pageCount, publisherID, ISBN) {

            this.title = title;
            this.author = author;
            this.genre = genre;
            this.pageCount = pageCount;
            this.publisherID = publisherID;
            this.ISBN = ISBN;

        };

// Book Factory singleton
        var BookFactory = (function () {
            var existingBooks = {}, existingBook;

            return {
                createBook: function (title, author, genre, pageCount, publisherID, ISBN) {

                    // Find out if a particular book meta-data combination has been created before
                    // !! or (bang bang) forces a boolean to be returned
                    existingBook = existingBooks[ISBN];
                    if (!!existingBook) {
                        return existingBook;
                    } else {

                        // if not, let's create a new instance of the book and store it
                        var book = new Book(title, author, genre, pageCount, publisherID, ISBN);
                        existingBooks[ISBN] = book;
                        return book;

                    }
                }
            };

        });

// BookRecordManager singleton
        var BookRecordManager = (function () {

            var bookRecordDatabase = {};

            return {
                // add a new book into the library system
                addBookRecord: function (id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {

                    var book = bookFactory.createBook(title, author, genre, pageCount, publisherID, ISBN);

                    bookRecordDatabase[id] = {
                        checkoutMember: checkoutMember,
                        checkoutDate: checkoutDate,
                        dueReturnDate: dueReturnDate,
                        availability: availability,
                        book: book
                    };
                },
                updateCheckoutStatus: function (bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {

                    var record = bookRecordDatabase[bookID];
                    record.availability = newStatus;
                    record.checkoutDate = checkoutDate;
                    record.checkoutMember = checkoutMember;
                    record.dueReturnDate = newReturnDate;
                },

                extendCheckoutPeriod: function (bookID, newReturnDate) {
                    bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
                },

                isPastDue: function (bookID) {
                    var currentDate = new Date();
                    return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
                }
            };

        })();

        var stateManager = {

            fly: function () {

                var self = this;

                $("#container")
                    .unbind()
                    .on("click", "div.toggle", function (e) {
                        self.handleClick(e.target);
                    });
            },

            handleClick: function (elem) {
                elem.find("span").toggle("slow");
            }
        };

        $("div").on("click", function () {
            console.log("You clicked: " + $(this).attr("id"));
        });

// we should avoid using the DOM element to create a
// jQuery object (with the overhead that comes with it)
// and just use the DOM element itself like this:

        $("div").on("click", function () {
            console.log("You clicked:" + this.id);
        });

        $("a").map(function () {
            return $(this).text();
        });

        jQuery.single = (function (o) {

            var collection = jQuery([1]);
            return function (element) {

                // Give collection the element:
                collection[0] = element;

                // Return the collection:
                return collection;

            };
        })();

        $("div").on("click", function () {

            var html = jQuery.single(this).next().html();
            console.log(html);

        });

        var Photo = Backbone.Model.extend({

            // Default attributes for the photo
            defaults: {
                src: "placeholder.jpg",
                caption: "A default image",
                viewed: false
            },

            // Ensure that each photo created has an `src`.
            initialize: function () {
                this.set({"src": this.defaults.src});
            }

        });

        var PhotoGallery = Backbone.Collection.extend({

            // Reference to this collection's model.
            model: Photo,

            // Filter down the list of all photos
            // that have been viewed
            viewed: function () {
                return this.filter(function (photo) {
                    return photo.get("viewed");
                });
            },

            // Filter down the list to only photos that
            // have not yet been viewed
            unviewed: function () {
                return this.without.apply(this, this.viewed());
            }
        });

        var buildPhotoView = function (photoModel, photoController) {

            var base = document.createElement("div"),
                photoEl = document.createElement("div");

            base.appendChild(photoEl);

            var render = function () {
                // We use a templating library such as Underscore
                // templating which generates the HTML for our
                // photo entry
                photoEl.innerHTML = _.template("#photoTemplate", {
                    src: photoModel.getSrc()
                });
            };

            photoModel.addSubscriber(render);

            photoEl.addEventListener("click", function () {
                photoController.handleEvent("click", photoModel);
            });

            var show = function () {
                photoEl.style.display = "";
            };

            var hide = function () {
                photoEl.style.display = "none";
            };

            return {
                showView: show,
                hideView: hide
            };

        };


// Controllers in Spine are created by inheriting from Spine.Controller

var PhotosController = Spine.Controller.sub({

    init: function () {
        this.item.bind("update", this.proxy(this.render));
        this.item.bind("destroy", this.proxy(this.remove));
    },

    render: function () {
        // Handle templating
        this.replace($("#photoTemplate").tmpl(this.item));
        return this;
    },

    remove: function () {
        this.el.remove();
        this.release();
    }
});


var PhotoRouter = Backbone.Router.extend({
    routes: {"photos/:id": "route"},

    route: function (id) {
        var item = photoCollection.get(id);
        var view = new PhotoView({model: item});

        $('.content').html(view.render().el);
    }
});


var PhotoView = Backbone.View.extend({

    //... is a list tag.
    tagName: "li",

    // Pass the contents of the photo template through a templating
    // function, cache it for a single photo
    template: _.template($("#photo-template").html()),

    // The DOM events specific to an item.
    events: {
        "click img": "toggleViewed"
    },

    // The PhotoView listens for changes to
    // its model, re-rendering. Since there's
    // a one-to-one correspondence between a
    // **Photo** and a **PhotoView** in this
    // app, we set a direct reference on the model for convenience.

    initialize: function () {
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.remove, this);
    },

    // Re-render the photo entry
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    // Toggle the `"viewed"` state of the model.
    toggleViewed: function () {
        this.model.viewed();
    }

});
var Todo = function (content, done) {
    this.content = ko.observable(content);
    this.done = ko.observable(done);
    this.editing = ko.observable(false);
};

var aViewModel = {
    contactName: ko.observable("John")
};
ko.applyBindings(aViewModel);



// our main ViewModel
var ViewModel = function (todos) {
    var self = this;

    // map array of passed in todos to an observableArray of Todo objects
    self.todos = ko.observableArray(
        ko.utils.arrayMap(todos, function (todo) {
            return new Todo(todo.content, todo.done);
        }));

    // store the new todo value being entered
    self.current = ko.observable();

    // add a new todo, when enter key is pressed
    self.add = function (data, event) {
        var newTodo, current = self.current().trim();
        if (current) {
            newTodo = new Todo(current);
            self.todos.push(newTodo);
            self.current("");
        }
    };

    // remove a single todo
    self.remove = function (todo) {
        self.todos.remove(todo);
    };

    // remove all completed todos
    self.removeCompleted = function () {
        self.todos.remove(function (todo) {
            return todo.done();
        });
    };

    // writeable computed observable to handle marking all complete/incomplete
    self.allCompleted = ko.computed({

        // always return true/false based on the done flag of all todos
        read: function () {
            return !self.remainingCount();
        },

        // set all todos to the written value (true/false)
        write: function (newValue) {
            ko.utils.arrayForEach(self.todos(), function (todo) {
                //set even if value is the same, as subscribers are not notified in that case
                todo.done(newValue);
            });
        }
    });

    // edit an item
    self.editItem = function (item) {
        item.editing(true);
    };
    ..

// Define an initially an empty array
    var myObservableArray = ko.observableArray();

// Add a value to the array and notify our observers
    myObservableArray.push('A new todo item');

    &lt;
    input
    id = "new-todo"
    type = "text"
    data - bind = "value: current, valueUpdate: 'afterkeydown', enterKey: add"
    placeholder = "What needs to be done?" / &gt;

    var ourBindingProvider = {
        nodeHasBindings: function (node) {
            // returns true/false
        },

        getBindings: function (node, bindingContext) {
            // returns a binding object
        }
    };
    // does an element have any bindings?
    function nodeHasBindings(node) {
        return node.getAttribute ? node.getAttribute("data-class") : false;
    };

    var viewModel = new ViewModel(todos || []),
        bindings = {

            newTodo: {
                value: viewModel.current,
                valueUpdate: "afterkeydown",
                enterKey: viewModel.add
            },

            taskTooltip: {
                visible: viewModel.showTooltip
            },
            checkAllContainer: {
                visible: viewModel.todos().length
            },
            checkAll: {
                checked: viewModel.allCompleted
            },

            todos: {
                foreach: viewModel.todos
            },
            todoListItem: function () {
                return {
                    css: {
                        editing: this.editing
                    }
                };
            },
            todoListItemWrapper: function () {
                return {
                    css: {
                        done: this.done
                    }
                };
            },
            todoCheckBox: function () {
                return {
                    checked: this.done
                };
            },
            todoContent: function () {
                return {
                    text: this.content,
                    event: {
                        dblclick: this.edit
                    }
                };
            },
            todoDestroy: function () {
                return {
                    click: viewModel.remove
                };
            },

            todoEdit: function () {
                return {
                    value: this.content,
                    valueUpdate: "afterkeydown",
                    enterKey: this.stopEditing,
                    event: {
                        blur: this.stopEditing
                    }
                };
            },

            todoCount: {
                visible: viewModel.remainingCount
            },
            remainingCount: {
                text: viewModel.remainingCount
            },
            remainingCountWord: function () {
                return {
                    text: viewModel.getLabel(viewModel.remainingCount)
                };
            },
            todoClear: {
                visible: viewModel.completedCount
            },
            todoClearAll: {
                click: viewModel.removeCompleted
            },
            completedCount: {
                text: viewModel.completedCount
            },
            completedCountWord: function () {
                return {
                    text: viewModel.getLabel(viewModel.completedCount)
                };
            },
            todoInstructions: {
                visible: viewModel.todos().length
            }
        };

    ....


    // We can now create a bindingProvider that uses
    // something different than data-bind attributes
    ko.customBindingProvider = function (bindingObject) {
        this.bindingObject = bindingObject;

        // determine if an element has any bindings
        this.nodeHasBindings = function (node) {
            return node.getAttribute ? node.getAttribute("data-class") : false;
        };
    };

    // return the bindings given a node and the bindingContext
    this.getBindings = function (node, bindingContext) {

        var result = {},
            classes = node.getAttribute("data-class");

        if (classes) {
            classes = classes.split("");

            //evaluate each class, build a single object to return
            for (var i = 0, j = classes.length; i &lt; j; i++) {

                var bindingAccessor = this.bindingObject[classes[i]];
                if (bindingAccessor) {
                    var binding = typeof bindingAccessor === "function" ? bindingAccessor.call(bindingContext.$data) : bindingAccessor;
                    ko.utils.extend(result, binding);
                }

            }
        }

        return result;
    };
};


// set ko's current bindingProvider equal to our new binding provider
ko.bindingProvider.instance = new ko.customBindingProvider(bindings);

// bind a new instance of our ViewModel to the page
ko.applyBindings(viewModel);

})
();



// A module_id (myModule) is used here for demonstration purposes only
define("myModule",

    ["foo", "bar"],

    // module definition function
    // dependencies (foo and bar) are mapped to function parameters
    function (foo, bar) {
        // return a value that defines the module export
        // (i.e the functionality we want to expose for consumption)

        // create your module here
        var myModule = {
            doStuff: function () {
                console.log("Yay! Stuff");
            }
        };

        return myModule;
    });

// An alternative version could be..
define("myModule",

    ["math", "graph"],

    function (math, graph) {

        // Note that this is a slightly different pattern
        // With AMD, it's possible to define modules in a few
        // different ways due to it's flexibility with
        // certain aspects of the syntax
        return {
            plot: function (x, y) {
                return graph.drawPie(math.randomGrid(x, y));
            }
        };
    });


// Consider "foo" and "bar" are two external modules
// In this example, the "exports" from the two modules
// loaded are passed as function arguments to the
// callback (foo and bar) so that they can similarly be accessed

require(["foo", "bar"], function (foo, bar) {
    // rest of your code here
    foo.doSomething();
});


define(function (require) {
    var isReady = false, foobar;

    // note the inline require within our module definition
    require(["foo", "bar"], function (foo, bar) {
        isReady = true;
        foobar = foo() + bar();
    });

    // we can still return a module
    return {
        isReady: isReady,
        foobar: foobar
    };
});


// With AMD, it's possible to load in assets of almost any kind
// including text-files and HTML. This enables us to have template
// dependencies which can be used to skin components either on
// page-load or dynamically.

define(["./templates", "text!./template.md", "css!./template.css"],

    function (templates, template) {
        console.log(templates);
        // do something with our templates here
    }

})
;

require(["app/myModule"],

    function (myModule) {
        // start the main module which in-turn
        // loads other modules
        var module = new myModule();
        module.doStuff();
    });

curl(["app/myModule.js"],

    function (myModule) {
        // start the main module which in-turn
        // loads other modules
        var module = new myModule();
        module.doStuff();

    });

// This could be compatible with jQuery's Deferred implementation,
// futures.js (slightly different syntax) or any one of a number
// of other implementations

define(["lib/Deferred"], function (Deferred) {
    var defer = new Deferred();

    require(["lib/templates/?index.html", "lib/data/?stats"],
        function (template, data) {
            defer.resolve({template: template, data: data});
        }
    );
    return defer.promise();
});

define(["dijit/Tooltip"], function (Tooltip) {

    //Our dijit tooltip is now available for local use
    new Tooltip(...
    )
    ;

});

define(["dojo/cookie", "dijit/Tooltip"], function (cookie, Tooltip) {

    var cookieValue = cookie("cookieName");
    new Tooltip(...
    )
    ;

});

define(["dojo", "dijit', "dojo / cookie", "dijit / Tooltip"], function( dojo, dijit ){
var cookieValue = dojo.cookie("cookieName");
new dijit.Tooltip(...
)
;
})
;

// mylib/UpdatableObservable: a Decorator for dojo/store/Observable
define(["dojo", "dojo/store/Observable"], function (dojo, Observable) {
    return function UpdatableObservable(store) {

        var observable = dojo.isFunction(store.notify) ? store :
            new Observable(store);

        observable.updated = function (object) {
            dojo.when(object, function (itemOrArray) {
                dojo.forEach([].concat(itemOrArray), this.notify, this);
            });
        };

        return observable;
    };
});


// Decorator consumer
// a consumer for mylib/UpdatableObservable

define(["mylib/UpdatableObservable"], function (makeUpdatable) {
    var observable,
        updatable,
        someItem;

    // make the observable store updatable
    updatable = makeUpdatable(observable); // `new` is optional!

    // we can then call .updated() later on if we wish to pass
    // on data that has changed
    //updatable.updated( updatedItem );
});


// "mylib/Array" adapts `each` function to mimic jQuerys:
define(["dojo/_base/lang", "dojo/_base/array"], function (lang, array) {
    return lang.delegate(array, {
        each: function (arr, lambda) {
            array.forEach(arr, function (item, i) {
                lambda.call(item, i, item); // like jQuery's each
            });
        }
    });
});

// Adapter consumer
// "myapp/my-module":
define(["mylib/Array"], function (array) {
    array.each(["uno", "dos", "tres"], function (i, esp) {
        // here, `this` == item
    });
});


define(["js/jquery.js", "js/jquery.color.js", "js/underscore.js"],

    function ($, colorPlugin, _) {
        // Here we've passed in jQuery, the color plugin and Underscore
        // None of these will be accessible in the global scope, but we
        // can easily reference them below.

        // Pseudo-randomize an array of colors, selecting the first
        // item in the shuffled array
        var shuffleColor = _.first(_.shuffle("#666", "#333", "#111"
        ] ) )
        ;

        // Animate the background-color of any elements with the class
        // "item" on the page using the shuffled color
        $(".item").animate({"backgroundColor": shuffleColor});

        // What we return can be used by other modules
        return {};
    });

// Account for the existence of more than one global
// instances of jQuery in the document, cater for testing
// .noConflict()

var jQuery = this.jQuery || "jQuery",
    $ = this.$ || "$",
    originaljQuery = jQuery,
    original$ = $;

define(["jquery"], function ($) {
    $(".items").css("background", "green");
    return function () {
    };
});

// package/lib is a dependency we require
var lib = require("package/lib");

// behaviour for our module
function foo() {
    lib.log("hello world!");
}

// export (expose) foo to other modules
exports.foo = foo;


// define more behaviour we would like to expose
function foobar() {
    this.foo = function () {
        console.log("Hello foo");
    }

    this.bar = function () {
        console.log("Hello bar");
    }
}

// expose foobar to other modules
exports.foobar = foobar;

// an application consuming "foobar"

// access the module relative to the path
// where both usage and module files exist
// in the same directory

var foobar = require("./foobar").foobar,
    test = new foobar();

// Outputs: "Hello bar"
test.bar();


define(function (require) {
    var lib = require("package/lib");

    // some behaviour for our module
    function foo() {
        lib.log("hello world!");
    }

    // export (expose) foo for other modules
    return {
        foobar: foo
    };
});

var modA = require("./foo");
var modB = require("./bar");

exports.app = function () {
    console.log("Im an application!");
}

exports.foo = function () {
    return modA.helloWorld();
}

exports.name = "bar";

require("./bar");
exports.helloWorld = function () {
    return "Hello World!!"
}

define(function (require, exports, module) {

    var shuffler = require("lib/shuffle");

    exports.randomize = function (input) {
        return shuffler.shuffle(input);
    }
});


(function (root, factory) {
    if (typeof exports === 'object') {
        // CommonJS
        factory(exports, require('b'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'b'], factory);
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}), root.b);
    }
}(this, function (exports, b) {
    //use b in some fashion.

    // attach properties to the exports object to define
    // the exported module properties.
    exports.action = function () {
    };
}));


    $(function () {

        // Our plugin "core" is exposed under a core namespace in
        // this example, which we first cache
        var core = $.core;

        // Then use use some of the built-in core functionality to
        // highlight all divs in the page yellow
        core.highlightAll();

        // Access the plugins (extensions) loaded into the "plugin"
        // namespace of our core module:

        // Set the first div in the page to have a green background.
        core.plugin.setGreen("div:first");
        // Here we're making use of the core's "highlight" method
        // under the hood from a plugin loaded in after it

        // Set the last div to the "errorColor" property defined in
        // our core module/plugin. If we review the code further down,
        // we can see how easy it is to consume properties and methods
        // between the core and other plugins
        core.plugin.setRed("div:last");
    });

// Module/Plugin core
// Note: the wrapper code we see around the module is what enables
// us to support multiple module formats and specifications by
// mapping the arguments defined to what a specific format expects
// to be present. Our actual module functionality is defined lower
// down, where a named module and exports are demonstrated.
//
// Note that dependencies can just as easily be declared if required
// and should work as demonstrated earlier with the AMD module examples.

(function (name, definition) {
    var theModule = definition(),
    // this is considered "safe":
        hasDefine = typeof define === "function" && define.amd,
    // hasDefine = typeof define === "function",
        hasExports = typeof module !== "undefined" && module.exports;

    if (hasDefine) { // AMD Module
        define(theModule);
    } else if (hasExports) { // Node.js Module
        module.exports = theModule;
    } else { // Assign to common namespaces or simply the global object (window)
        ( this.jQuery || this.ender || this.$ || this)[name] = theModule;
    }
})("core", function () {
    var module = this;
    module.plugins = [];
    module.highlightColor = "yellow";
    module.errorColor = "red";

    // define the core module here and return the public API

    // This is the highlight method used by the core highlightAll()
    // method and all of the plugins highlighting elements different
    // colors
    module.highlight = function (el, strColor) {
        if (this.jQuery) {
            jQuery(el).css("background", strColor);
        }
    }
    return {
        highlightAll: function () {
            module.highlight("div", module.highlightColor);
        }
    };

});  // Extension to module core

(function (name, definition) {
    var theModule = definition(),
        hasDefine = typeof define === "function",
        hasExports = typeof module !== "undefined" && module.exports;

    if (hasDefine) { // AMD Module
        define(theModule);
    } else if (hasExports) { // Node.js Module
        module.exports = theModule;
    } else {

        // Assign to common namespaces or simply the global object (window)
        // account for for flat-file/global module extensions
        var obj = null,
            namespaces,
            scope;

        obj = null;
        namespaces = name.split(".");
        scope = ( this.jQuery || this.ender || this.$ || this );

        for (var i = 0; i < namespaces.length; i++) {
            var packageName = namespaces[i];
            if (obj && i == namespaces.length - 1) {
                obj[packageName] = theModule;
            } else if (typeof scope[packageName] === "undefined") {
                scope[packageName] = {};
            }
            obj = scope[packageName];
        }

    }
})("core.plugin", function () {

    // Define our module here and return the public API.
    // This code could be easily adapted with the core to
    // allow for methods that overwrite and extend core functionality
    // in order to expand the highlight method to do more if we wish.
    return {
        setGreen: function (el) {
            highlight(el, "green");
        },
        setRed: function (el) {
            highlight(el, errorColor);
        }
    };

});


module
staff
{
    // specify (public) exports that can be consumed by
    // other modules
    export var baker = {
        bake: function (item) {
            console.log("Woo! I just baked " + item);
        }
    }
}

module
skills
{
    export var specialty = "baking";
    export var experience = "5 years";
}

module
cakeFactory
{

    // specify dependencies
import
    baker
    from
    staff;

    // import everything with wildcards
import *
    from
    skills;

    export var oven = {
        makeCupcake: function (toppings) {
            baker.bake("cupcake", toppings);
        },
        makeMuffin: function (mSize) {
            baker.bake("muffin", size);
        }
    }
}

module
cakeFactory
from
"http://addyosmani.com/factory/cakes.js";
cakeFactory.oven.makeCupcake("sprinkles");
cakeFactory.oven.makeMuffin("large");

Loader.load("http://addyosmani.com/factory/cakes.js",
    function (cakeFactory) {
        cakeFactory.oven.makeCupcake("chocolate");
    });

// io/File.js
export function open(path) { ...
};
export function close(hnd) { ...
};

// compiler/LexicalHandler.js
module
file
from
"io/File";

import { open, close } from
file;
export function scan(
in )
{
    try {
        var h = open( in
    ) ...
    }
    finally {
        close(h)
    }
}

module
lexer
from
"compiler/LexicalHandler";
module
stdlib
from
"@std";

//... scan(cmdline[0]) ...

class Cake {

    // We can define the body of a class" constructor
    // function by using the keyword "constructor" followed
    // by an argument list of public and private declarations.
    constructor(name, toppings, price, cakeSize) {
        public
        name = name;
        public
        cakeSize = cakeSize;
        public
        toppings = toppings;
        private
        price = price;

    }

    // As a part of ES.next's efforts to decrease the unnecessary
    // use of "function" for everything, you'll notice that it's
    // dropped for cases such as the following. Here an identifier
    // followed by an argument list and a body defines a new method

    addTopping(topping) {
        public(this).toppings.push(topping);
    }

    // Getters can be defined by declaring get before
    // an identifier/method name and a curly body.
    get allToppings() {
        return public(this).toppings;
    }

    get qualifiesForDiscount() {
        return private(this).price > 5;
    }

    // Similar to getters, setters can be defined by using
    // the "set" keyword before an identifier
    set cakeSize(cSize) {
        if (cSize < 0) {
            throw new Error("Cake must be a valid size -
            either
            small, medium
            or
            large
            " );
        }
        public(this).cakeSize = cSize;
    }


}

// Single elements
$("#singleItem").addClass("active");
$("#container").addClass("active");

// Collections of elements
$("div").addClass("active");
$(".item").addClass("active");
$("input").addClass("active");

addClass: function (value) {
    var classNames, i, l, elem,
        setClass, c, cl;

    if (jQuery.isFunction(value)) {
        return this.each(function (j) {
            jQuery(this).addClass(value.call(this, j, this.className));
        });
    }

    if (value && typeof value === "string") {
        classNames = value.split(rspace);

        for (i = 0, l = this.length; i < l; i++) {
            elem = this[i];

            if (elem.nodeType === 1) {
                if (!elem.className && classNames.length === 1) {
                    elem.className = value;

                } else {
                    setClass = " " + elem.className + " ";

                    for (c = 0, cl = classNames.length; c < cl; c++) {
                        if (!~setClass.indexOf(" " + classNames[c] + " ")) {
                            setClass += classNames[c] + " ";
                        }
                    }
                    elem.className = jQuery.trim(setClass);
                }
            }
        }
    }

    return this;
}


// Cross browser opacity:
// opacity: 0.9; Chrome 4+, FF2+, Saf3.1+, Opera 9+, IE9, iOS 3.2+, Android 2.1+
// filter: alpha(opacity=90); IE6-IE8

// Setting opacity
$(".container").css({opacity: .5});

// Getting opacity
var currentOpacity = $(".container").css('opacity');

get
:
function (elem, computed) {
    // IE uses filters for opacity
    return ropacity.test((
            computed && elem.currentStyle ?
                elem.currentStyle.filter : elem.style.filter) || "") ?
    ( parseFloat(RegExp.$1) / 100 ) + "" :
        computed ? "1" : "";
}
,

set
:
function (elem, value) {
    var style = elem.style,
        currentStyle = elem.currentStyle,
        opacity = jQuery.isNumeric(value) ?
        "alpha(opacity=" + value * 100 + ")" : "",
        filter = currentStyle && currentStyle.filter || style.filter || "";

    // IE has trouble with opacity if it does not have layout
    // Force it by setting the zoom level
    style.zoom = 1;

    // if setting opacity to 1, and no other filters
    //exist - attempt to remove filter attribute #6652
    if (value >= 1 && jQuery.trim(filter.replace(ralpha, "")) === "") {

        // Setting style.filter to null, "" & " " still leave
        // "filter:" in the cssText if "filter:" is present at all,
        // clearType is disabled, we want to avoid this style.removeAttribute
        // is IE Only, but so apparently is this code path...
        style.removeAttribute("filter");

        // if there there is no filter style applied in a css rule, we are done
        if (currentStyle && !currentStyle.filter) {
            return;
        }
    }

    // otherwise, set new filter values
    style.filter = ralpha.test(filter) ?
        filter.replace(ralpha, opacity) :
    filter + " " + opacity;
}
}
;

$.get(url, data, callback, dataType);
$.post(url, data, callback, dataType);
$.getJSON(url, data, callback);
$.getScript(url, callback);

// $.get()
$.ajax({
    url: url,
    data: data,
    dataType: dataType
}).done(callback);

// $.post
$.ajax({
    type: "POST",
    url: url,
    data: data,
    dataType: dataType
}).done(callback);

// $.getJSON()
$.ajax({
    url: url,
    dataType: "json",
    data: data,
}).done(callback);

// $.getScript()
$.ajax({
    url: url,
    dataType: "script",
}).done(callback);


// Functions to create xhrs
function createStandardXHR() {
    try {
        return new window.XMLHttpRequest();
    } catch (e) {
    }
}

function createActiveXHR() {
    try {
        return new window.ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
    }
}

// Create the request object
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
    /* Microsoft failed to properly
     * implement the XMLHttpRequest in IE7 (can't request local files),
     * so we use the ActiveXObject when it is available
     * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
     * we need a fallback.
     */
    function () {
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } :
    // For all other browsers, use the standard XMLHttpRequest object
    createStandardXHR;
...

// Request the remote document
jQuery.ajax({
    url: url,
    type: type,
    dataType: "html",
    data: params,
    // Complete callback (responseText is used internally)
    complete: function (jqXHR, status, responseText) {
        // Store the response as specified by the jqXHR object
        responseText = jqXHR.responseText;
        // If successful, inject the HTML into all the matched elements
        if (jqXHR.isResolved()) {
            // Get the actual response in case
            // a dataFilter is present in ajaxSettings
            jqXHR.done(function (r) {
                responseText = r;
            });
            // See if a selector was specified
            self.html(selector ?
                // Create a dummy div to hold the results
                jQuery("<div>")
                    // inject the contents of the document in, removing the scripts
                    // to avoid any 'Permission Denied' errors in IE
                    .append(responseText.replace(rscript, ""))

                    // Locate the specified elements
                    .find(selector) :

                // If not, just inject the full result
                responseText);
        }

        if (callback) {
            self.each(callback, [responseText, status, jqXHR]);
        }
    }
});

return this;
}


// Equivalent to subscribe(topicName, callback)
$(document).on("topicName", function () {
    //..perform some behaviour
});

// Equivalent to publish(topicName)
$(document).trigger("topicName");

// Equivalent to unsubscribe(topicName)
$(document).off("topicName");

jQuery.event = {

    add: function (elem, types, handler, data, selector) {

        var elemData, eventHandle, events,
            t, tns, type, namespaces, handleObj,
            handleObjIn, quick, handlers, special;

        ...

        // Init the element's event structure and main handler,
        //if this is the first
        events = elemData.events;
        if (!events) {
            elemData.events = events = {};
        }
        ...

        // Handle multiple events separated by a space
        // jQuery(...).bind("mouseover mouseout", fn);
        types = jQuery.trim(hoverHack(types)).split(" ");
        for (t = 0; t < types.length; t++) {

        ...

            // Init the event handler queue if we're the first
            handlers = events[type];
            if (!handlers) {
                handlers = events[type] = [];
                handlers.delegateCount = 0;

                // Only use addEventListener/attachEvent if the special
                // events handler returns false
                if (!special.setup || special.setup.call(elem, data,
                //namespaces, eventHandle ) === false ) {
                // Bind the global event handler to the element
                    if (elem.addEventListener) {
                        elem.addEventListener(type, eventHandle, false);

                    } else if (elem.attachEvent) {
                        elem.attachEvent("on" + type, eventHandle);
                    }
            }
        }

        (function ($) {

            var o = $({});

            $.subscribe = function () {
                o.on.apply(o, arguments);
            };

            $.unsubscribe = function () {
                o.off.apply(o, arguments);
            };

            $.publish = function () {
                o.trigger.apply(o, arguments);
            };

        }(jQuery));

        var topics = {};

        jQuery.Topic = function (id) {
            var callbacks,
                topic = id && topics[id];
            if (!topic) {
                callbacks = jQuery.Callbacks();
                topic = {
                    publish: callbacks.fire,
                    subscribe: callbacks.add,
                    unsubscribe: callbacks.remove
                };
                if (id) {
                    topics[id] = topic;
                }
            }
            return topic;
        };

// Subscribers
        $.Topic("mailArrived").subscribe(fn1);
        $.Topic("mailArrived").subscribe(fn2);
        $.Topic("mailSent").subscribe(fn1);

// Publisher
        $.Topic("mailArrived").publish("hello world!");
        $.Topic("mailSent").publish("woo! mail!");

// Here, "hello world!" gets pushed to fn1 and fn2
// when the "mailArrived" notification is published
// with "woo! mail!" also being pushed to fn1 when
// the "mailSent" notification is published.

// Outputs:
// hello world!
// fn2 says: hello world!
// woo! mail!


        $.each(["john", "dave", "rick", "julian"], function (index, value) {
            console.log(index + ": "
            " + value);
        });

        $("li").each(function (index) {
            console.log(index + ": " + $(this).text());
        });

// Execute a callback for every element in the matched set.
        each: function (callback, args) {
            return jQuery.each(this, callback, args);
        }

        each: function (object, callback, args) {
            var name, i = 0,
                length = object.length,
                isObj = length === undefined || jQuery.isFunction(object);

            if (args) {
                if (isObj) {
                    for (name in object) {
                        if (callback.apply(object[name], args) === false) {
                            break;
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.apply(object[i++], args) === false) {
                            break;
                        }
                    }
                }

                // A special, fast, case for the most common use of each
            } else {
                if (isObj) {
                    for (name in object) {
                        if (callback.call(object[name], name, object[name]) === false) {
                            break;
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.call(object[i], i, object[i++]) === false) {
                            break;
                        }
                    }
                }
            }

            return object;
        }
        ;

        $(document).ready(function () {

            // The ajax request won't attempt to execute until
            // the DOM is ready

            var jqxhr = $.ajax({
                url: "http://domain.com/api/",
                data: "display=latest&order=ascending"
            })
                .done(function (data))
            {
                $(".status").html("content loaded");
                console.log("Data output:" + data);
            }
            )
            ;

        });


        bindReady: function () {
            if (readyList) {
                return;
            }

            readyList = jQuery.Callbacks("once memory");

            // Catch cases where $(document).ready() is called after the
            // browser event has already occurred.
            if (document.readyState === "complete") {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                return setTimeout(jQuery.ready, 1);
            }

            // Mozilla, Opera and webkit support this event
            if (document.addEventListener) {
                // Use the handy event callback
                document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

                // A fallback to window.onload, that will always work
                window.addEventListener("load", jQuery.ready, false);

                // If IE event model is used
            } else if (document.attachEvent) {
                // ensure firing before onload,
                // maybe late but safe also for iframes
                document.attachEvent("onreadystatechange", DOMContentLoaded);

                // A fallback to window.onload, that will always work
                window.attachEvent("onload", jQuery.ready);

                // If IE and not a frame
                // continually check to see if the document is ready
                var toplevel = false;

                try {
                    toplevel = window.frameElement == null;
                } catch (e) {
                }

                if (document.documentElement.doScroll && toplevel) {
                    doScrollCheck();
                }
            }
        }
        ,

        $("button").on("click", function () {
            // Within this function, "this" refers to the element that was clicked
            $(this).addClass("active");
        });

        $("button").on("click", function () {
            setTimeout(function () {
                // "this" doesn't refer to our element!
                // It refers to window
                $(this).addClass("active");
            });
        });

        $("button").on("click", function () {

            setTimeout($.proxy(function () {
                // "this" now refers to our element as we wanted
                $(this).addClass("active");
            }, this), 500);

            // the last "this" we're passing tells $.proxy() that our DOM element
            // is the value we want "this" to refer to.
        });

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function (fn, context) {
            if (typeof context === "string") {
                var tmp = fn[context];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }

            // Simulated bind
            var args = slice.call(arguments, 2),
                proxy = function () {
                    return fn.apply(context, args.concat(slice.call(arguments)));
                };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

            return proxy;
        }

        $('&lt;div class="foo"&gt;bar&lt;/div&gt;');

        $('&lt;p id="test"&gt;foo &lt;em&gt;bar&lt;/em&gt;&lt;/p&gt;').appendTo("body");

        var newParagraph = $("&lt;p /&gt;").text("Hello world");

        $("&lt;input /&gt;")
            .attr({"type": "text", "id": "sample"})
            .appendTo("#container");

        // HANDLE: $(html) -> $(array)
        if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            doc = ( context ? context.ownerDocument || context : document );

            // If a single string is passed in and it's a single tag
            // just do a createElement and skip the rest
            ret = rsingleTag.exec(selector);

            if (ret) {
                if (jQuery.isPlainObject(context)) {
                    selector = [document.createElement(ret[1])];
                    jQuery.fn.attr.call(selector, context, true);

                } else {
                    selector = [doc.createElement(ret[1])];
                }

            } else {
                ret = jQuery.buildFragment([match[1]], [doc]);
                selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
            }

            return jQuery.merge(this, selector);

            $.fn.myPluginName = function () {
                // our plugin logic
            };

            (function ($) {
                $.fn.myPluginName = function () {
                    // our plugin logic
                };
            })(jQuery);

            (function ($) {
                $.extend($.fn, {
                    myplugin: function () {
                        // your plugin logic
                    }
                });
            })(jQuery);

            /*!
             * jQuery lightweight plugin boilerplate
             * Original author: @ajpiano
             * Further changes, comments: @addyosmani
             * Licensed under the MIT license
             */


// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
            ;
            (function ($, window, document, undefined) {

                // undefined is used here as the undefined global
                // variable in ECMAScript 3 and is mutable (i.e. it can
                // be changed by someone else). undefined isn't really
                // being passed in so we can ensure that its value is
                // truly undefined. In ES5, undefined can no longer be
                // modified.

                // window and document are passed through as local
                // variables rather than as globals, because this (slightly)
                // quickens the resolution process and can be more
                // efficiently minified (especially when both are
                // regularly referenced in our plugin).

                // Create the defaults once
                var pluginName = "defaultPluginName",
                    defaults = {
                        propertyName: "value"
                    };

                // The actual plugin constructor
                function Plugin(element, options) {
                    this.element = element;

                    // jQuery has an extend method that merges the
                    // contents of two or more objects, storing the
                    // result in the first object. The first object
                    // is generally empty because we don't want to alter
                    // the default options for future instances of the plugin
                    this.options = $.extend({}, defaults, options);

                    this._defaults = defaults;
                    this._name = pluginName;

                    this.init();
                }

                Plugin.prototype.init = function () {
                    // Place initialization logic here
                    // We already have access to the DOM element and
                    // the options via the instance, e.g. this.element
                    // and this.options
                };

                // A really lightweight plugin wrapper around the constructor,
                // preventing against multiple instantiations
                $.fn[pluginName] = function (options) {
                    return this.each(function () {
                        if (!$.data(this, "plugin_" + pluginName)) {
                            $.data(this, "plugin_" + pluginName,
                                new Plugin(this, options));
                        }
                    });
                }

            })(jQuery, window, document);

            $("#elem").defaultPluginName({
                propertyName: "a custom value"
            });

            /*!
             * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
             * Author: @addyosmani
             * Further changes: @peolanha
             * Licensed under the MIT license
             */


            ;
            (function ($, window, document, undefined) {

                // define our widget under a namespace of your choice
                // with additional parameters e.g.
                // $.widget( "namespace.widgetname", (optional) - an
                // existing widget prototype to inherit from, an object
                // literal to become the widget's prototype );

                $.widget("namespace.widgetname", {

                    //Options to be used as defaults
                    options: {
                        someValue: null
                    },

                    //Setup widget (e.g. element creation, apply theming
                    //, bind events etc.)
                    _create: function () {

                        // _create will automatically run the first time
                        // this widget is called. Put the initial widget
                        // setup code here, then we can access the element
                        // on which the widget was called via this.element.
                        // The options defined above can be accessed
                        // via this.options this.element.addStuff();
                    },

                    // Destroy an instantiated plugin and clean up
                    // modifications the widget has made to the DOM
                    destroy: function () {

                        // this.element.removeStuff();
                        // For UI 1.8, destroy must be invoked from the
                        // base widget
                        $.Widget.prototype.destroy.call(this);
                        // For UI 1.9, define _destroy instead and don't
                        // worry about
                        // calling the base widget
                    },

                    methodB: function (event) {
                        //_trigger dispatches callbacks the plugin user
                        // can subscribe to
                        // signature: _trigger( "callbackName", [eventObject],
                        // [uiObject] )
                        // e.g. this._trigger( "hover", e /*where e.type ==
                        // "mouseenter"*/, { hovered: $(e.target)});
                        this._trigger("methodA", event, {
                            key: value
                        });
                    },

                    methodA: function (event) {
                        this._trigger("dataChanged", event, {
                            key: value
                        });
                    },

                    // Respond to any changes the user makes to the
                    // option method
                    _setOption: function (key, value) {
                        switch (key) {
                            case "someValue":
                                // this.options.someValue = doSomethingWith( value );
                                break;
                            default:
                                // this.options[ key ] = value;
                                break;
                        }

                        // For UI 1.8, _setOption must be manually invoked
                        // from the base widget
                        $.Widget.prototype._setOption.apply(this, arguments);
                        // For UI 1.9 the _super method can be used instead
                        // this._super( "_setOption", key, value );
                    }
                });

            })(jQuery, window, document);

            var collection = $("#elem").widgetName({
                foo: false
            });

            collection.widgetName("methodB");

            /*!
             * jQuery namespaced "Starter" plugin boilerplate
             * Author: @dougneiner
             * Further changes: @addyosmani
             * Licensed under the MIT license
             */

            ;
            (function ($) {
                if (!$.myNamespace) {
                    $.myNamespace = {};
                }
                ;

                $.myNamespace.myPluginName = function (el, myFunctionParam, options) {
                    // To avoid scope issues, use "base" instead of "this"
                    // to reference this class from internal events and functions.
                    var base = this;

                    // Access to jQuery and DOM versions of element
                    base.$el = $(el);
                    base.el = el;

                    // Add a reverse reference to the DOM object
                    base.$el.data("myNamespace.myPluginName", base);

                    base.init = function () {
                        base.myFunctionParam = myFunctionParam;

                        base.options = $.extend({},
                            $.myNamespace.myPluginName.defaultOptions, options);

                        // Put our initialization code here
                    };

                    // Sample Function, Uncomment to use
                    // base.functionName = function( parameters ){
                    //
                    // };
                    // Run initializer
                    base.init();
                };

                $.myNamespace.myPluginName.defaultOptions = {
                    myDefaultValue: ""
                };

                $.fn.mynamespace_myPluginName = function
                    (myFunctionParam, options) {
                    return this.each(function () {
                        (new $.myNamespace.myPluginName(this,
                            myFunctionParam, options));
                    });
                };

            })(jQuery);

            $("#elem").mynamespace_myPluginName({
                myDefaultValue: "foobar"
            });

            /*!
             * jQuery custom-events plugin boilerplate
             * Author: DevPatch
             * Further changes: @addyosmani
             * Licensed under the MIT license
             */

// In this pattern, we use jQuery's custom events to add
// pub/sub (publish/subscribe) capabilities to widgets.
// Each widget would publish certain events and subscribe
// to others. This approach effectively helps to decouple
// the widgets and enables them to function independently.

            ;
            (function ($, window, document, undefined) {
                $.widget("ao.eventStatus", {
                    options: {},

                    _create: function () {
                        var self = this;

                        //self.element.addClass( "my-widget" );

                        //subscribe to "myEventStart"
                        self.element.on("myEventStart", function (e) {
                            console.log("event start");
                        });

                        //subscribe to "myEventEnd"
                        self.element.on("myEventEnd", function (e) {
                            console.log("event end");
                        });

                        //unsubscribe to "myEventStart"
                        //self.element.off( "myEventStart", function(e){
                        ///console.log( "unsubscribed to this event" );
                        //});
                    },

                    destroy: function () {
                        $.Widget.prototype.destroy.apply(this, arguments);
                    },
                });
            })(jQuery, window, document);

// Publishing event notifications
// $( ".my-widget" ).trigger( "myEventStart");
// $( ".my-widget" ).trigger( "myEventEnd" );

            var el = $("#elem");
            el.eventStatus();
            el.eventStatus().trigger("myEventStart");

            /*!
             * jQuery prototypal inheritance plugin boilerplate
             * Author: Alex Sexton, Scott Gonzalez
             * Further changes: @addyosmani
             * Licensed under the MIT license
             */


// myObject - an object representing a concept we wish to model
// (e.g. a car)
            var myObject = {
                init: function (options, elem) {
                    // Mix in the passed-in options with the default options
                    this.options = $.extend({}, this.options, options);

                    // Save the element reference, both as a jQuery
                    // reference and a normal reference
                    this.elem = elem;
                    this.$elem = $(elem);

                    // Build the DOM's initial structure
                    this._build();

                    // return this so that we can chain and use the bridge with less code.
                    return this;
                },
                options: {
                    name: "No name"
                },
                _build: function () {
                    //this.$elem.html( "&lt;h1&gt;"+this.options.name+"&lt;/h1&gt;" );
                },
                myMethod: function (msg) {
                    // We have direct access to the associated and cached
                    // jQuery element
                    // this.$elem.append( "&lt;p&gt;"+msg+"&lt;/p&gt;" );
                }
            };


// Object.create support test, and fallback for browsers without it
            if (typeof Object.create !== "function") {
                Object.create = function (o) {
                    function F() {
                    }

                    F.prototype = o;
                    return new F();
                };
            }


// Create a plugin based on a defined object
            $.plugin = function (name, object) {
                $.fn[name] = function (options) {
                    return this.each(function () {
                        if (!$.data(this, name)) {
                            $.data(this, name, Object.create(object).init(
                                options, this));
                        }
                    });
                };
            };

            $.plugin("myobj", myObject);

            $("#elem").myobj({name: "John"});

            var collection = $("#elem").data("myobj");
            collection.myMethod("I am a method");

            /*!
             * jQuery UI Widget factory "bridge" plugin boilerplate
             * Author: @erichynds
             * Further changes, additional comments: @addyosmani
             * Licensed under the MIT license
             */


// a "widgetName" object constructor
// required: this must accept two arguments,
// options: an object of configuration options
// element: the DOM element the instance was created on
            var widgetName = function (options, element) {
                this.name = "myWidgetName";
                this.options = options;
                this.element = element;
                this._init();
            }

// the "widgetName" prototype
            widgetName.prototype = {

                // _create will automatically run the first time this
                // widget is called
                _create: function () {
                    // creation code
                },

                // required: initialization logic for the plugin goes into _init
                // This fires when our instance is first created and when
                // attempting to initialize the widget again (by the bridge)
                // after it has already been initialized.
                _init: function () {
                    // init code
                },

                // required: objects to be used with the bridge must contain an
                // "option". Post-initialization, the logic for changing options
                // goes here.
                option: function (key, value) {

                    // optional: get/change options post initialization
                    // ignore if you don't require them.

                    // signature: $("#foo").bar({ cool:false });
                    if ($.isPlainObject(key)) {
                        this.options = $.extend(true, this.options, key);

                        // signature: $( "#foo" ).option( "cool" ); - getter
                    } else if (key && typeof value === "undefined") {
                        return this.options[key];

                        // signature: $( "#foo" ).bar("option", "baz", false );
                    } else {
                        this.options[key] = value;
                    }

                    // required: option must return the current instance.
                    // When re-initializing an instance on elements, option
                    // is called first and is then chained to the _init method.
                    return this;
                },

                // notice no underscore is used for public methods
                publicFunction: function () {
                    console.log("public function");
                },

                // underscores are used for private methods
                _privateFunction: function () {
                    console.log("private function");
                }
            };


// connect the widget obj to jQuery's API under the "foo" namespace
            $.widget.bridge("foo", widgetName);

// create an instance of the widget for use
            var instance = $("#foo").foo({
                baz: true
            });

// our widget instance exists in the elem's data
// Outputs: #elem
            console.log(instance.data("foo").element);

// bridge allows us to call public methods
// Outputs: "public method"
            instance.foo("publicFunction");

// bridge prevents calls to internal methods
            instance.foo("_privateFunction");

            /*!
             * (jQuery mobile) jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
             * Author: @scottjehl
             * Further changes: @addyosmani
             * Licensed under the MIT license
             */

            ;
            (function ($, window, document, undefined) {

                // define a widget under a namespace of our choice
                // here "mobile" has been used in the first argument
                $.widget("mobile.widgetName", $.mobile.widget, {

                    // Options to be used as defaults
                    options: {
                        foo: true,
                        bar: false
                    },

                    _create: function () {
                        // _create will automatically run the first time this
                        // widget is called. Put the initial widget set-up code
                        // here, then we can access the element on which
                        // the widget was called via this.element
                        // The options defined above can be accessed via
                        // this.options

                        // var m = this.element,
                        // p = m.parents( ":jqmData(role="page")" ),
                        // c = p.find( ":jqmData(role="content")" )
                    },

                    // Private methods/props start with underscores
                    _dosomething: function () { ...
                    },

                    // Public methods like these below can can be called
                    // externally:
                    // $("#myelem").foo( "enable", arguments );

                    enable: function () { ...
                    },

                    // Destroy an instantiated plugin and clean up modifications
                    // the widget has made to the DOM
                    destroy: function () {
                        // this.element.removeStuff();
                        // For UI 1.8, destroy must be invoked from the
                        // base widget
                        $.Widget.prototype.destroy.call(this);
                        // For UI 1.9, define _destroy instead and don't
                        // worry about calling the base widget
                    },

                    methodB: function (event) {
                        //_trigger dispatches callbacks the plugin user can
                        // subscribe to
                        // signature: _trigger( "callbackName", [eventObject],
                        // [uiObject] )
                        // e.g. this._trigger( "hover", e /*where e.type ==
                        // "mouseenter"*/, { hovered: $(e.target)});
                        this._trigger("methodA", event, {
                            key: value
                        });
                    },

                    methodA: function (event) {
                        this._trigger("dataChanged", event, {
                            key: value
                        });
                    },

                    // Respond to any changes the user makes to the option method
                    _setOption: function (key, value) {
                        switch (key) {
                            case "someValue":
                                // this.options.someValue = doSomethingWith( value );
                                break;
                            default:
                                // this.options[ key ] = value;
                                break;
                        }

                        // For UI 1.8, _setOption must be manually invoked from
                        // the base widget
                        $.Widget.prototype._setOption.apply(this, arguments);
                        // For UI 1.9 the _super method can be used instead
                        // this._super( "_setOption", key, value );
                    }
                });

            })(jQuery, window, document);

            var instance = $("#foo").widgetName({
                foo: false
            });

            instance.widgetName("methodB");

            $(document).on("pagecreate", function (e) {
                // In here, e.target refers to the page that was created
                // (it's the target of the pagecreate event)
                // So, we can simply find elements on this page that match a
                // selector of our choosing, and call our plugin on them.
                // Here's how we'd call our "foo" plugin on any element with a
                // data-role attribute of "foo":
                $(e.target).find("[data-role="
                foo
                "]"
                ).
                foo(options);

                // Or, better yet, let's write the selector accounting for the configurable
                // data-attribute namespace
                $(e.target).find(":jqmData(role="
                foo
                ")"
                ).
                foo(options);
            });

            /*!
             * jQuery UI Widget + RequireJS module boilerplate (for 1.8/9+)
             * Authors: @jrburke, @addyosmani
             * Licensed under the MIT license
             */

// Note from James:
//
// This assumes we are using the RequireJS+jQuery file, and
// that the following files are all in the same directory:
//
// - require-jquery.js
// - jquery-ui.custom.min.js (custom jQuery UI build with widget factory)
// - templates/
// - asset.html
// - ao.myWidget.js

// Then we can construct the widget as follows:

// ao.myWidget.js file:
            define("ao.myWidget", ["jquery", "text!templates/asset.html", "underscore", "jquery-ui.custom.min"], function ($, assetHtml, _) {

                // define our widget under a namespace of our choice
                // "ao" is used here as a demonstration
                $.widget("ao.myWidget", {

                    // Options to be used as defaults
                    options: {},

                    // Set up widget (e.g. create element, apply theming,
                    // bind events, etc.)
                    _create: function () {

                        // _create will automatically run the first time
                        // this widget is called. Put the initial widget
                        // set-up code here, then we can access the element
                        // on which the widget was called via this.element.
                        // The options defined above can be accessed via
                        // this.options

                        // this.element.addStuff();
                        // this.element.addStuff();

                        // We can then use Underscore templating with
                        // with the assetHtml that has been pulled in
                        // var template = _.template( assetHtml );
                        // this.content.append( template({}) );
                    },

                    // Destroy an instantiated plugin and clean up modifications
                    // that the widget has made to the DOM
                    destroy: function () {
                        // this.element.removeStuff();
                        // For UI 1.8, destroy must be invoked from the base
                        // widget
                        $.Widget.prototype.destroy.call(this);
                        // For UI 1.9, define _destroy instead and don't worry
                        // about calling the base widget
                    },

                    methodB: function (event) {
                        // _trigger dispatches callbacks the plugin user can
                        // subscribe to
                        // signature: _trigger( "callbackName", [eventObject],
                        // [uiObject] )
                        this._trigger("methodA", event, {
                            key: value
                        });
                    },

                    methodA: function (event) {
                        this._trigger("dataChanged", event, {
                            key: value
                        });
                    },

                    // Respond to any changes the user makes to the option method
                    _setOption: function (key, value) {
                        switch (key) {
                            case "someValue":
                                // this.options.someValue = doSomethingWith( value );
                                break;
                            default:
                                // this.options[ key ] = value;
                                break;
                        }

                        // For UI 1.8, _setOption must be manually invoked from
                        // the base widget
                        $.Widget.prototype._setOption.apply(this, arguments);
                        // For UI 1.9 the _super method can be used instead
                        // this._super( "_setOption", key, value );
                    }

                });
            });


        &lt;
            script
            data - main = "scripts/main"
            src = "http://requirejs.org/docs/release/1.0.1/minified/require.js" &gt; &lt; / script &gt;

                require({

                        paths: {
                            "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min",
                            "jqueryui": "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min",
                            "boilerplate": "../patterns/jquery.widget-factory.requirejs.boilerplate"
                        }
                    }, ["require", "jquery", "jqueryui", "boilerplate"],
                    function (req, $) {

                        $(function () {

                            var instance = $("#elem").myWidget();
                            instance.myWidget("methodB");

                        });
                    });

            /*!
             * jQuery "best options" plugin boilerplate
             * Author: @cowboy
             * Further changes: @addyosmani
             * Licensed under the MIT license
             */


            ;
            (function ($, window, document, undefined) {

                $.fn.pluginName = function (options) {

                    // Here's a best practice for overriding "defaults"
                    // with specified options. Note how, rather than a
                    // regular defaults object being passed as the second
                    // parameter, we instead refer to $.fn.pluginName.options
                    // explicitly, merging it with the options passed directly
                    // to the plugin. This allows us to override options both
                    // globally and on a per-call level.

                    options = $.extend({}, $.fn.pluginName.options, options);

                    return this.each(function () {

                        var elem = $(this);

                    });
                };

                // Globally overriding options
                // Here are our publicly accessible default plugin options
                // that are available in case the user doesn't pass in all
                // of the values expected. The user is given a default
                // experience but can also override the values as necessary.
                // e.g. $fn.pluginName.key ="otherval";

                $.fn.pluginName.options = {

                    key: "value",
                    myMethod: function (elem, param) {

                    }
                };

            })(jQuery, window, document);

            $("#elem").pluginName({
                key: "foobar"
            });

            $(".item-a").draggable({"defaultPosition": "top-left"});
            $(".item-b").draggable({"defaultPosition": "bottom-right"});
            $(".item-c").draggable({"defaultPosition": "bottom-left"});
//etc

            $(".items").draggable();
            html
            &lt; li
        class
            = "item"
            data - plugin - options = "{"
            defaultPosition
            ":"
            top - left
            "}" &gt; &lt; / div &gt;
            &lt; li
        class
            = "item"
            data - plugin - options = "{"
            defaultPosition
            ":"
            bottom - left
            "}" &gt; &lt; / div &gt;

                /*
                 * "Highly configurable" mutable plugin boilerplate
                 * Author: @markdalgleish
                 * Further changes, comments: @addyosmani
                 * Licensed under the MIT license
                 */


// Note that with this pattern, as per Alex Sexton's, the plugin logic
// hasn't been nested in a jQuery plugin. Instead, we just use
// jQuery for its instantiation.

            ;
            (function ($, window, document, undefined) {

                // our plugin constructor
                var Plugin = function (elem, options) {
                    this.elem = elem;
                    this.$elem = $(elem);
                    this.options = options;

                    // This next line takes advantage of HTML5 data attributes
                    // to support customization of the plugin on a per-element
                    // basis. For example,
                    // &lt;div class="item" data-plugin-options="{'message':'Goodbye World!'}"&gt;&lt;/div&gt;
                    this.metadata = this.$elem.data("plugin-options");
                };

                // the plugin prototype
                Plugin.prototype = {
                    defaults: {
                        message: "Hello world!"
                    },

                    init: function () {
                        // Introduce defaults that can be extended either
                        // globally or using an object literal.
                        this.config = $.extend({}, this.defaults, this.options,
                            this.metadata);

                        // Sample usage:
                        // Set the message per instance:
                        // $( "#elem" ).plugin( { message: "Goodbye World!"} );
                        // or
                        // var p = new Plugin( document.getElementById( "elem" ),
                        // { message: "Goodbye World!"}).init()
                        // or, set the global default message:
                        // Plugin.defaults.message = "Goodbye World!"

                        this.sampleMethod();
                        return this;
                    },

                    sampleMethod: function () {
                        // e.g. show the currently configured message
                        // console.log(this.config.message);
                    }
                }

                Plugin.defaults = Plugin.prototype.defaults;

                $.fn.plugin = function (options) {
                    return this.each(function () {
                        new Plugin(this, options).init();
                    });
                };

                // optional: window.Plugin = Plugin;

            })(jQuery, window, document);

            $("#elem").plugin({
                message: "foobar"
            });

            var myApplication = (function () {
                function () {
                    //...
                }

                ,
                return {
                    //...
                }
            })();

            var myApplication_propertyA = {};
            var myApplication_propertyB = {};

            function myApplication_myMethod() {
                //...
            }

            var myApplication = {

                // As we've seen, we can easily define functionality for
                // this object literal..
                getInfo: function () {
                    //...
                },

                // but we can also populate it to support
                // further object namespaces containing anything
                // anything we wish:
                models: {},
                views: {
                    pages: {}
                },
                collections: {}
            };

            myApplication.foo = function () {
                return "bar";
            }

            myApplication.utils = {
                toString: function () {
                    //...
                },
                export: function () {
                    //...
                }
            }

// This doesn't check for existence of "myApplication" in
// the global namespace. Bad practice as we can easily
// clobber an existing variable/namespace with the same name
            var myApplication = {};

// The following options *do* check for variable/namespace existence.
// If already defined, we use that instance, otherwise we assign a new
// object literal to myApplication.
//
// Option 1: var myApplication = myApplication || {};
// Option 2: if( !MyApplication ){ MyApplication = {} };
// Option 3: window.myApplication || ( window.myApplication = {} );
// Option 4: var myApplication = $.fn.myApplication = function() {};
// Option 5: var myApplication = myApplication === undefined ? {} : myApplication;

            myApplication || (myApplication = {});

            function foo() {
                myApplication || ( myApplication = {} );
            }

// myApplication hasn't been initialized,
// so foo() throws a ReferenceError

            foo();

// However accepting myApplication as an
// argument

            function foo(myApplication) {
                myApplication || ( myApplication = {} );
            }

            foo();

// Even if myApplication === undefined, there is no error
// and myApplication gets set to {} correctly


// If we were to define a new plugin..
            var myPlugin = $.fn.myPlugin = function () { ...
            };

// Then later rather than having to type:
            $.fn.myPlugin.defaults = {};

// We can do:
            myPlugin.defaults = {};


            var namespace = (function () {

                // defined within the local scope
                var privateMethod1 = function () { /* ... */
                    },
                    privateMethod2 = function () { /* ... */
                    }
                privateProperty1 = "foobar";

                return {

                    // the object literal returned here can have as many
                    // nested depths as we wish, however as mentioned,
                    // this way of doing things works best for smaller,
                    // limited-scope applications in my personal opinion
                    publicMethod1: privateMethod1,

                    // nested namespace with public properties
                    properties: {
                        publicProperty1: privateProperty1
                    },

                    // another tested namespace
                    utils: {
                        publicMethod2: privateMethod2
                    }
                        ...
                }
            })();

            var myConfig = {

                language: "english",

                defaults: {
                    enableGeolocation: true,
                    enableSharing: false,
                    maxPhotos: 20
                },

                theme: {
                    skin: "a",
                    toolbars: {
                        index: "ui-navigation-toolbar",
                        pages: "ui-custom-toolbar"
                    }
                }

            }

            YAHOO.util.Dom.getElementsByClassName("test");


            var myApp = myApp || {};

// perform a similar existence check when defining nested
// children
            myApp.routers = myApp.routers || {};
            myApp.model = myApp.model || {};
            myApp.model.special = myApp.model.special || {};

// nested namespaces can be as complex as required:
// myApp.utilities.charting.html5.plotGraph(/*..*/);
// myApp.modules.financePlanner.getSummary();
// myApp.services.social.facebook.realtimeStream.getLatest();


            myApp["routers"] = myApp["routers"] || {};
            myApp["models"] = myApp["models"] || {};
            myApp["controllers"] = myApp["controllers"] || {};

// an (anonymous) immediately-invoked function expression
            (function () { /*...*/
            })();

// a named immediately-invoked function expression
            (function foobar() { /*..*/
            })();

// named self-executing function
            function foobar() {
                foobar();
            }

// anonymous self-executing function
            var foobar = function () {
                arguments.callee();
            }
            var namespace = namespace || {};

// here a namespace object is passed as a function
// parameter, where we assign public methods and
// properties to it
            (function (o) {
                o.foo = "foo";
                o.bar = function () {
                    return "bar";
                };
            })(namespace);

            console.log(namespace);


// namespace (our namespace name) and undefined are passed here
// to ensure 1. namespace can be modified locally and isn't
// overwritten outside of our function context
// 2. the value of undefined is guaranteed as being truly
// undefined. This is to avoid issues with undefined being
// mutable pre-ES5.

            ;
            (function (namespace, undefined) {

                // private properties
                var foo = "foo",
                    bar = "bar";

                // public methods and properties
                namespace.foobar = "foobar";

                namespace.say = function (msg) {
                    speak(msg);
                };

                namespace.sayHello = function () {
                    namespace.say("hello world");
                };

                // private method
                function speak(msg) {
                    console.log("You said: " + msg);
                };

                // check to evaluate whether "namespace" exists in the
                // global namespace - if not, assign window.namespace an
                // object literal

            })(window.namespace = window.namespace || {});


// we can then test our properties and methods as follows

// public

// Outputs: foobar
            console.log(namespace.foobar);

// Outputs: You said: hello world
            namespace.sayHello();

// assigning new properties
            namespace.foobar2 = "foobar";

// Outputs: foobar
            console.log(namespace.foobar2);
            // let's extend the namespace with new functionality
            (function (namespace, undefined) {

                // public method
                namespace.sayGoodbye = function () {
                    namespace.say("goodbye");
                }
            })(window.namespace = window.namespace || {});

// Outputs: goodbye
            namespace.sayGoodbye();
            var myApp = myApp || {};
            myApp.utils = {};

            (function () {
                var val = 5;

                this.getValue = function () {
                    return val;
                };

                this.setValue = function (newVal) {
                    val = newVal;
                }

                // also introduce a new sub-namespace
                this.tools = {};

            }).apply(myApp.utils);

// inject new behaviour into the tools namespace
// which we defined via the utilities module

            (function () {
                this.diagnose = function () {
                    return "diagnosis";
                }
            }).apply(myApp.utils.tools);

// note, this same approach to extension could be applied
// to a regular IIFE, by just passing in the context as
// an argument and modifying the context rather than just
// "this"

// Usage:

// Outputs our populated namespace
            console.log(myApp);

// Outputs: 5
            console.log(myApp.utils.getValue());

// Sets the value of `val` and returns it
            myApp.utils.setValue(25);
            console.log(myApp.utils.getValue());

// Testing another level down
            console.log(myApp.utils.tools.diagnose());


// define a namespace we can use later
            var ns = ns || {},
                ns2 = ns2 || {};

// the module/namespace creator
            var creator = function (val) {

                var val = val || 0;

                this.next = function () {
                    return val++
                };

                this.reset = function () {
                    val = 0;
                }
            }

            creator.call(ns);

// ns.next, ns.reset now exist
            creator.call(ns2, 5000);

// ns2 contains the same methods
// but has an overridden value for val
// of 5000


            var application = {
                utilities: {
                    drawing: {
                        canvas: {
                            2d
        :
            {
                //...
            }
        }
    }
}
}
;

// top-level namespace being assigned an object literal
var myApp = myApp || {};

// a convenience function for parsing string namespaces and
// automatically generating nested namespaces
function extend(ns, ns_string) {
    var parts = ns_string.split("."),
        parent = ns,
        pl;

    pl = parts.length;

    for (var i = 0; i &lt; pl; i++) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }

    return parent;
}

// Usage:
// extend myApp with a deeply nested namespace
var mod = extend(myApp, "modules.module2");

// the correct object with nested depths is output
console.log(mod);

// minor test to check the instance of mod can also
// be used outside of the myApp namesapce as a clone
// that includes the extensions

// Outputs: true
console.log(mod == myApp.modules.module2);

// further demonstration of easier nested namespace
// assignment using extend
extend(myApp, "moduleA.moduleB.moduleC.moduleD");
extend(myApp, "longer.version.looks.like.this");
console.log(myApp);


// common approach to accessing nested namespaces
myApp.utilities.math.fibonacci(25);
myApp.utilities.math.sin(56);
myApp.utilities.drawing.plot(98, 50, 60);

// with local/cached references
var utils = myApp.utilities,
    maths = utils.math,
    drawing = utils.drawing;

// easier to access the namespace
maths.fibonacci(25);
maths.sin(56);
drawing.plot(98, 50, 60);

// note that the above is particularly performant when
// compared to hundreds or thousands of calls to nested
// namespaces vs. a local reference to the namespace

// extend.js
// Written by Andrew Dupont, optimized by Addy Osmani

function extend(destination, source) {

    var toString = Object.prototype.toString,
        objTest = toString.call({});

    for (var property in source) {
        if (source[property] &amp;&amp; objTest === toString.call(source[property])) {
            destination[property] = destination[property] || {};
            extend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;

};

console.group("objExtend namespacing tests");

// define a top-level namespace for usage
var myNS = myNS || {};

// 1. extend namespace with a "utils" object
extend(myNS, {
    utils: {}
});

console.log("test 1", myNS);
// myNS.utils now exists

// 2. extend with multiple depths (namespace.hello.world.wave)
extend(myNS, {
    hello: {
        world: {
            wave: {
                test: function () {
                    //...
                }
            }
        }
    }
});

// test direct assignment works as expected
myNS.hello.test1 = "this is a test";
myNS.hello.world.test2 = "this is another test";
console.log("test 2", myNS);

// 3. what if myNS already contains the namespace being added
// (e.g. "library")? we want to ensure no namespaces are being
// overwritten during extension

myNS.library = {
    foo: function () {
    }
};

extend(myNS, {
    library: {
        bar: function () {
            //...
        }
    }
});

// confirmed that extend is operating safely (as expected)
// myNS now also contains library.foo, library.bar
console.log("test 3", myNS);


// 4. what if we wanted easier access to a specific namespace without having
// to type the whole namespace out each time?

var shorterAccess1 = myNS.hello.world;
shorterAccess1.test3 = "hello again";
console.log("test 4", myNS);

//success, myApp.hello.world.test3 is now "hello again"

console.groupEnd();

// top-level namespace
var myApp = myApp || {};

// directly assign a nested namespace
myApp.library = {
    foo: function () {
        //...
    }
};

// deep extend/merge this namespace with another
// to make things interesting, let's say it's a namespace
// with the same name but with a different function
// signature: $.extend( deep, target, object1, object2 )
$.extend(true, myApp, {
    library: {
        bar: function () {
            //...
        }
    }
});

console.log("test", myApp);
// myApp now contains both library.foo() and library.bar() methods
// nothing has been overwritten which is what we're hoping for.