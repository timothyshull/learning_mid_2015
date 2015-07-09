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