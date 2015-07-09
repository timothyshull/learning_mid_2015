/*global define, console, window, io, ace, WebSocket, connect, message, $, document */
define(
    [
        "jquery",
        "socket.io"
    ],
    function ($, io) {
        "use strict";
        var socket = io.connect(),
            submitBtn = $("#submit-cmd"),
            input = $('#cmd');

        function add_content(str) {
            var newElem = $('<p>').text(str);
            $('.log').append(newElem);
            $(window).scrollTop($('body').height() - $(window).height() + 80);
        }

        function add_err(str) {
            var newElem = $('<p>').text(str);
            newElem.css("color", "red");
            $('.log').append(newElem);
            $(window).scrollTop($('body').height() - $(window).height() + 80);
        }

        socket.on('response', function (data) {
            console.log(data);
            add_content(data);
        });

        socket.on('err', function (data) {
            console.log("Error: " + data);
            add_err(data);
        });

        submitBtn.click(function (e) {
            e.preventDefault();
            console.log(input.val());
            socket.emit('cmd', input.val());
            input.val('');
            return false;
        });

        $(document).on("keypress", function (e) {
            var code = e.keyCode || e.which;
            if (code === 13) {
                e.preventDefault();
                console.log(input.val());
                socket.emit('cmd', input.val());
                input.val('');
                return false;
            }
        });
    }
);