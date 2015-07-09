/*global define, console, window, io, ace, WebSocket, connect, message, $, document */
define(
    [
        "jquery",
        "socket.io"
        //"socket.io-stream"

        //"ace/ace"
    ],
    function ($, io) {
        "use strict";
        var socket = io.connect('https://localhost:8001'),
            submitBtn = $("#submit-cmd"),
            input = $('#cmd');

        function add_content(str) {
            $('div').append('<p>' + $('<div/>').text(str).html() + '</p>');
            $(window).scrollTop($('body').height() - $(window).height() + 80);
        }

        function addMessage(message) {
            var text = document.createTextNode(message),
                el = document.createElement('li'),
                messages = document.getElementById('messages');

            el.appendChild(text);
            messages.appendChild(el);
        }

        socket.on('response', function (data) {
            //var buff = stream.read();
            console.log(data);
            //add_content(data);
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
        //$('input').focus();

        //window.socket = socket;

        // Pieces from basic Ace cli

        //var element = document.getElementById("editor");
        //
        //var editor = singleLineEditor(element);
        //editor.setTheme("ace/theme/twilight");
        //editor.$blockScrolling = Infinity;
        //
        //editor.commands.bindKeys({
        //    "Shift-Return|Ctrl-Return|Alt-Return": function(cmdLine) { cmdLine.insert("\n"); },
        //    "Esc|Shift-Esc": function(cmdLine){ cmdLine.editor.focus(); },
        //    "Return": function(cmdLine){
        //        var command = cmdLine.getValue().split(/\s+/);
        //        var editor = cmdLine.editor;
        //        editor.commands.exec(command[0], editor, command[1]);
        //        editor.focus();
        //    }
        //});
        //
        //editor.commands.removeCommands(["find", "gotoline", "findall", "replace", "replaceall"]);
        //
        //function singleLineEditor(el) {
        //    var EditSession = require("ace/edit_session").EditSession;
        //    var UndoManager = require("ace/undomanager").UndoManager;
        //    var Renderer = require("ace/virtual_renderer").VirtualRenderer;
        //    var Editor = require("ace/editor").Editor;
        //    var MultiSelect = require("ace/multi_select").MultiSelect;
        //    var Gutter = require("ace/layer/gutter");
        //
        //    var renderer = new Renderer(el);
        //    el.style.overflow = "hidden";
        //
        //    renderer.screenToTextCoordinates = function(x, y) {
        //        var pos = this.pixelToScreenCoordinates(x, y);
        //        return this.session.screenToDocumentPosition(
        //            Math.min(this.session.getScreenLength() - 1, Math.max(pos.row, 0)),
        //            Math.max(pos.column, 0)
        //        );
        //    };
        //
        //    renderer.$maxLines = 4;
        //
        //    // renderer.setStyle("ace_one-line");
        //    var editor = new Editor(renderer);
        //    new MultiSelect(editor);
        //    editor.session.setUndoManager(new UndoManager());
        //
        //    editor.setShowPrintMargin(false);
        //    editor.renderer.setShowGutter(true);
        //    editor.renderer.setHighlightGutterLine(false);
        //    editor.$mouseHandler.$focusWaitTimeout = 0;
        //    // window.gutter = gutter;
        //    // gutter.setShowLineNumbers(true);
        //
        //    return editor;
        //}
        //
        //function send() {
        //    text = editor.getValue();
        //
        //    if (text === "") {
        //        message('<p class="warning">Please enter a message');
        //        return;
        //    }
        //    try {
        //        socket.send(text);
        //        message('<p class="event">Sent: ' + text);
        //
        //    } catch (exception) {
        //        message('<p class="warning">');
        //    }
        //    editor.setValue(text + "\n");
        //}
        //
        //editor.commands.addCommand({
        //    name: 'myCommand',
        //    bindKey: {win: 'Enter',  mac: 'Enter'},
        //    exec: function(editor) {
        //        send();
        //    },
        //    readOnly: true
        //});
        //
        //$('#disconnect').click(function () {
        //    socket.close();
        //});
        //
        //window.editor = editor;
    }
);