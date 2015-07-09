/*global window, ace, console, WebSocket, connect, message, $, document */
window.addEventListener("load", function () {
    "use strict";
    // var editor = ace.edit("editor");
    // editor.setKeyboardHandler("ace/keyboard/vim");
    // editor.setKeyboardHandler("ace/keyboard/emacs");
    // editor.setTheme("ace/theme/twilight");
    // editor.$blockScrolling = Infinity;

    var element = document.getElementById("editor");
    
    var editor = singleLineEditor(element);
    editor.setTheme("ace/theme/twilight");
    editor.$blockScrolling = Infinity;
    // editor.session.addGutterDecoration(0, "ace-gutter");
    

    editor.commands.bindKeys({
        "Shift-Return|Ctrl-Return|Alt-Return": function(cmdLine) { cmdLine.insert("\n"); },
        "Esc|Shift-Esc": function(cmdLine){ cmdLine.editor.focus(); },
        "Return": function(cmdLine){
            var command = cmdLine.getValue().split(/\s+/);
            var editor = cmdLine.editor;
            editor.commands.exec(command[0], editor, command[1]);
            editor.focus();
        }
    });

    editor.commands.removeCommands(["find", "gotoline", "findall", "replace", "replaceall"]);

    function singleLineEditor(el) {
        var EditSession = require("ace/edit_session").EditSession;
        var UndoManager = require("ace/undomanager").UndoManager;
        var Renderer = require("ace/virtual_renderer").VirtualRenderer;
        var Editor = require("ace/editor").Editor;
        var MultiSelect = require("ace/multi_select").MultiSelect;
        var Gutter = require("ace/layer/gutter");
        
        var renderer = new Renderer(el);
        // var gutter = new Gutter.Gutter(el);
        el.style.overflow = "hidden";

        renderer.screenToTextCoordinates = function(x, y) {
            var pos = this.pixelToScreenCoordinates(x, y);
            return this.session.screenToDocumentPosition(
                Math.min(this.session.getScreenLength() - 1, Math.max(pos.row, 0)),
                Math.max(pos.column, 0)
            );
        };

        renderer.$maxLines = 4;

        // renderer.setStyle("ace_one-line");
        var editor = new Editor(renderer);
        new MultiSelect(editor);
        editor.session.setUndoManager(new UndoManager());

        editor.setShowPrintMargin(false);
        editor.renderer.setShowGutter(true);
        editor.renderer.setHighlightGutterLine(false);
        editor.$mouseHandler.$focusWaitTimeout = 0;
        // window.gutter = gutter;
        // gutter.setShowLineNumbers(true);

        return editor;
    }

    function connect() {
        var socket, text,
            host = "ws://localhost:8001";

        function send() {
            text = editor.getValue();

            if (text === "") {
                message('<p class="warning">Please enter a message');
                return;
            }
            try {
                socket.send(text);
                message('<p class="event">Sent: ' + text);

            } catch (exception) {
                message('<p class="warning">');
            }
            editor.setValue(text + "\n");
        }

        function message(msg) {
            $('#chatLog').append(msg + '</p>');
        }

        try {
            socket = new WebSocket(host);

            message('<p class="event">Socket Status: ' + socket.readyState);

            socket.onopen = function () {
                message('<p class="event">Socket Status: ' + socket.readyState + ' (open)');
            };

            socket.onmessage = function (msg) {
                message('<p class="message">Received: ' + msg.data);
            };

            socket.onclose = function () {
                message('<p class="event">Socket Status: ' + socket.readyState + ' (Closed)');
            };

        } catch (exception) {
            message('<p>Error' + exception);
        }

        //$('#editor').keypress(function (event) {
        //    if (event.keyCode === '13') {
        //        send();
        //        console.log("pressed");
        //    }
        //});

        editor.commands.addCommand({
            name: 'myCommand',
            bindKey: {win: 'Enter',  mac: 'Enter'},
            exec: function(editor) {
                send();
            },
            readOnly: true // false if this command should not apply in readOnly mode
        });

        $('#disconnect').click(function () {
            socket.close();
        });
    }

    if (!(window.hasOwnProperty("WebSocket"))) {
        console.log("No websockets");
    } else {
        connect();
    }
    
    window.editor = editor;

});

//document.getElementById("parent-list").addEventListener("click", function (e) {
//    // e.target is the clicked element!
//    // If it was a list item
//    if (e.target && e.target.nodeName == "LI") {
//        // List item found!  Output the ID!
//        console.log("List item ", e.target.id.replace("post-"), " was clicked!");
//    }
//});

// wscat -l 8001