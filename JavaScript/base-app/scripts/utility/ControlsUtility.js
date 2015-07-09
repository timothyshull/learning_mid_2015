/*jslint nomen: true */
/*global define, document, window, _ */
/*jslint todo: true */
/*jslint eqeq: true */
define(
    [
        "app/core",
        "utility/AppUtility",
        "utility/Toolbox",
        "jquery",
        "lodash"
    ],
    function (core, AppUtility, Toolbox, Spinner, $, _) {
        "use strict";
        var tooltipDelay, getPlacementFunction;
        function areTooltipsEnabled() {
            return !AppUtility.isMobile();
        }
        tooltipDelay = {show: 1000, hide: 200};
        getPlacementFunction = function (defaultPosition, width, height) {
            // return function (tip, element) {
            return function (element) {
                // var bottom
                var position, top, left, right,

                    $element = $(element),
                    boundTop = $(document).scrollTop(),
                    boundLeft = $(document).scrollLeft(),
                    boundRight = boundLeft + $(window).width(),
                    boundBottom = boundTop + $(window).height(),

                    pos = $.extend({}, $element.offset(), {
                        width: element.offsetWidth,
                        height: element.offsetHeight
                    }),

                    isWithinBounds = function (elPos) {
                        return boundTop < elPos.top && boundLeft < elPos.left && boundRight > (elPos.left + width) && boundBottom > (elPos.top + height);
                    },

                    testTop = function () {
                        if (top === false) {
                            return false;
                        }
                        top = isWithinBounds({
                            top: pos.top - height,
                            left: pos.left + pos.width / 2 - width / 2
                        });
                        return top ? "top" : false;
                    },

                    testBottom = function () {
                        // Assume that bottom is always good
                        return "bottom";

                        /*if (bottom === false) return false;
                         bottom = isWithinBounds({
                         top: pos.top + pos.height,
                         left: pos.left + pos.width / 2 - width / 2
                         });
                         return bottom ? "bottom" : false;*/
                    },

                    testLeft = function () {
                        if (left === false) {
                            return false;
                        }
                        left = isWithinBounds({
                            top: pos.top + pos.height / 2 - height / 2,
                            left: pos.left - width
                        });
                        return left ? "left" : false;
                    },

                    testRight = function () {
                        if (right === false) {
                            return false;
                        }
                        right = isWithinBounds({
                            top: pos.top + pos.height / 2 - height / 2,
                            left: pos.left + pos.width
                        });
                        return right ? "right" : false;
                    };

                switch (defaultPosition) {
                    case "top":
                        position = testTop();
                        if (position) {
                            return position;
                        }
                        break;
                    case "bottom":
                        position = testBottom();
                        if (position) {
                            return position;
                        }
                        break;
                    case "left":
                        position = testLeft();
                        if (position) {
                            return position;
                        }
                        break;
                    case "right":
                        position = testRight();
                        if (position) {
                            return position;
                        }
                        break;
                    default:
                        position = testTop();
                        if (position) {
                            return position;
                        }
                        position = testBottom();
                        if (position) {
                            return position;
                        }
                        position = testLeft();
                        if (position) {
                            return position;
                        }
                        position = testRight();
                        if (position) {
                            return position;
                        }
                        return defaultPosition;
                }
            };
        };
        return {
            headerHeight: 40,
            processSelect: function (options) {
                var selectElement = $(this);
                options = _({}).extend(options, {
                    style: null,
                    size: 200
                });

                selectElement.selectpicker(options);

                function updateSelect() {
                    selectElement.selectpicker("refresh");
                }

                selectElement.on({
                    "change": updateSelect,
                    "DOMNodeInserted": updateSelect,
                    "DOMNodeInsertedIntoDocument": updateSelect
                });
            },
            // TODO remove this
            wrapSelect: function (selectElement, titleElement) {
                var titleWrapper, title, updateTitle;
                selectElement = $(selectElement);
                selectElement.wrap("<div/>");

                titleWrapper = (titleElement || $("<span/>")).css("cursor", "pointer");
                selectElement.after(titleWrapper);
                selectElement.css("opacity", 0);
                selectElement.css("cursor", "pointer");
                selectElement.css("position", "absolute");
                selectElement.css("margin-left", "5px");
                selectElement.css("margin-top", "5px");

                title = $('<span class="title"/>');
                titleWrapper.append(title);
                titleWrapper.append($("<span/>").addClass("select-triangle").text(" \u25BE"));

                updateTitle = function () {
                    title.text($("option:selected", selectElement).text());
                };
                selectElement.on({
                    "change": updateTitle,
                    "DOMNodeInserted": updateTitle,
                    "DOMNodeInsertedIntoDocument": updateTitle
                });
                updateTitle();

                return selectElement.parent();
            },
            selectItemPrefix: function (nodes) {
                return function (value) {
                    if (typeof nodes === "function") {
                        nodes = nodes();
                    }

                    var node = _(nodes).findWhere({
                            location: value
                        }),
                        type = node ? node.type : AppUtility.Constants.EntityTypes.DataNode,
                        markup = '<span class="cluster-entity-thumb ' + type + '">';
                    if (type === AppUtility.Constants.EntityTypes.EdgeNode) {
                        node.protocols.forEach(function (protocol) {
                            markup += '<span class="part ' + protocol + '"></span>';
                        });
                    }
                    markup += "</span>";
                    return markup;
                };
            },
            basicFieldValidation: function (fields, parentElement, validation, result) {
                fields.forEach(function (field) {
                    var markupName = field.markupName || field.property,
                        element = $("[name=" + Toolbox.camelCaseToDashes(markupName) + "]", parentElement),
                        value,
                        tag = element.prop("tagName").toLowerCase(),
                        displayName = field.displayName || Toolbox.camelCaseToSpaces(field.property),
                        valueEmpty,
                        validationResult;


                    if (tag === "input") {
                        value = $.trim(element.val());
                    } else if (tag === "select") {
                        value = element.val();
                    }
                    field.value = value;
                    field.element = element;

                    valueEmpty = (value == null || value === "");
                    if (field.required === true && valueEmpty) {
                        validation.push({
                            message: displayName + " not specified", // UISTRING
                            element: element
                        });
                    } else if (!valueEmpty) { // if empty value is permitted it must not be validated further
                        // If validation function is set, execute it against the value
                        if (field.validation) {
                            validationResult = field.validation(value);

                            // Validation is considered failed if a string - error message - is returned
                            if (typeof validationResult === "string") {
                                validation.push({
                                    message: displayName + " " + validationResult,
                                    element: element
                                });
                            }
                        }
                    }

                    // If ignore empty flag is set to true and value is empty, this step must be skipped
                    if (field.property && field.use !== false && (field.ignoreEmpty !== true || !valueEmpty)) {
                        result[field.property] = value;
                    }
                });
            },
            Validation: {
                // TODO implement min and max limits
                int: function (message) {
                    return function (value) {
                        var parseResult = parseInt(value, 10);
                        if (isNaN(parseResult)) {
                            return message || "must be an integer"; // UISTRING
                        }

                        return null;
                    };
                },
                uint: function (positiveOnly) {
                    return function (value) {
                        var parseResult = parseInt(value, 10);
                        if (isNaN(parseResult)) {
                            return "must be an integer"; // UISTRING
                        }
                        if (positiveOnly && parseResult <= 0) {
                            return "must be positive"; // UISTRING
                        }
                        if (!positiveOnly && parseResult < 0) {
                            return "must not be negative"; // UISTRING
                        }

                        return null;
                    };
                },
                regex: function (pattern, errorMessage) {
                    return function (value) {
                        if (!value.match(pattern)) {
                            return errorMessage || "has incorrect format";
                        }

                        return null;
                    };
                }
            },
            statusUpdated: function (data, element, refresh) {
                var isOk, statusMessage, $statusMessageElements;
                isOk = (data.status === AppUtility.Constants.Statuses.Success);

                if (isOk || refresh) {
                    $(".information-area", element).show();
                } else {
                    $(".information-area", element).hide();
                }

                if (refresh) {
                    return;
                }

                statusMessage = AppUtility.getStatusDisplayMessage(data.status, data.message);

                $statusMessageElements = $(".status-area .status-message", element);

                $statusMessageElements.each(function (index, statusMessageElement) {
                    var centralElement, $statusMessageElement, spinnerHeight, offsetY, messageTextElement;
                    $statusMessageElement = $(statusMessageElement);

                    if (index === 0) {
                        $statusMessageElement.text(statusMessage);

                        if (data.status === AppUtility.Constants.Statuses.Progress) {
                            //statusMessage = "Loading Cluster Data";

                            // Add a spinner
                            $statusMessageElement.empty();

                            centralElement = $("<div/>");
                            $statusMessageElement.append(centralElement);

                            if ($(element).hasClass("modest-spinner")) {
                                this.addSpinner(centralElement, "modest");
                            } else {
                                this.addSpinner(centralElement, "large");
                                spinnerHeight = 200;
                                offsetY = Math.round(Math.max(0, ($(window).height() - spinnerHeight) / 2) + 40);

                                messageTextElement = $("<div/>").addClass("status-message-text").text(statusMessage)
                                    .css({
                                        "margin-top": offsetY + "px",
                                        "padding-top": "110px",
                                        "text-align": "center"
                                    });
                            }
                            centralElement.append(messageTextElement);
                        }
                    }
                }.bind(this));
            },
            addSpinner: function (element, optionsKey) {
                var opts, container;
                opts = this.getSpinnerOptions(optionsKey);
                container = $("<span/>").css({
                    "display": "block"
                });
                new Spinner(opts).spin(container[0]);
                element.append(container);

                return container;
            },
            destroyTooltips: function (element) {
                if ($(element).is("[data-tooltip]")) {
                    $(element).tooltip("destroy");
                }
                $("[data-tooltip]", element).tooltip("destroy");
            },
            initTooltips: function (element, options) {
                if (areTooltipsEnabled()) {
                    options = _.extend(options || {}, {
                        titleAttribute: "data-tooltip",
                        delay: tooltipDelay,
                        html: true
                    });


                    var tooltips = $("[data-tooltip]", element);
                    if ($(element).is("[data-tooltip]")) {
                        tooltips.push(element);
                    }
                    tooltips.each(function () {
                        $(this).tooltip(_({
                            placement: getPlacementFunction($(this).attr("data-tooltip-placement"),
                                $(this).attr("data-tooltip").length * 7, 40)
                        }).extend(options));
                    });
                }
            },
            initScrollbar: function (elts) {
                var result = [];

                elts.each(function () {
                    var elt = $(this);
                    elt.addClass("nano");
                    if ($(".nano-content", elt).length == 0) {
                        elt.wrapInner($("<div/>").addClass("nano-content"));
                    }

                    if (elt.nanoScroller && elt.nanoScroller()) {
                        result.push($(".nano-content", elt)[0]);
                    }
                });

                return $(result);
            },
            updateScrollbar: function (elts) {
                elts.each(function () {
                    // don't update if not initialized
                    // sort of a hack
                    if ($(this).hasClass("nano")) {
                        if (_($(this).nanoScroller).isFunction()) {
                            $(this).nanoScroller();
                        }
                    }
                });
            },

            getSpinnerOptions: function (forForm) {
                if (forForm === "large") {
                    return {
                        lines: 34, // The number of lines to draw
                        length: 50, // The length of each line
                        width: 30, // The line thickness
                        radius: 20, // The radius of the inner circle
                        corners: 1, // Corner roundness (0..1)
                        rotate: 0, // The rotation offset
                        direction: 1, // 1: clockwise, -1: counterclockwise
                        speed: 1.1, // Rounds per second
                        trail: 59, // Afterglow percentage
                        shadow: false, // Whether to render a shadow
                        hwaccel: false, // Whether to use hardware acceleration
                        className: 'spinner', // The CSS class to assign to the spinner
                        zIndex: 2e9, // The z-index (defaults to 2000000000)
                        top: 'auto' // Top position relative to parent in px
                        //                    left: 'auto' // Left position relative to parent in px
                    };
                }

                return {
                    lines: 9, // The number of lines to draw
                    length: 4, // The length of each line
                    width: 3, // The line thickness
                    radius: 5, // The radius of the inner circle
                    corners: 1, // Corner roundness (0..1)
                    rotate: 0, // The rotation offset
                    direction: 1, // 1: clockwise, -1: counterclockwise
                    speed: 1.2, // Rounds per second
                    trail: 60, // Afterglow percentage
                    shadow: false, // Whether to render a shadow
                    hwaccel: false, // Whether to use hardware acceleration
                    className: 'spinner', // The CSS class to assign to the spinner
                    zIndex: 2e9, // The z-index (defaults to 2000000000)
                    top: 'auto', // Top position relative to parent in px
                    left: 'auto' // Left position relative to parent in px
                };
            },
            getPaginationProcessor: function (controllerId) {
                // return function (data, contentControls) {
                return function (data, contentControls) {
                    var controller,
                        processItem = function (item) {
                            return _(item).clone();
                        };

                    if (_(data).isArray()) {
                        data = _(data.map(processItem)); //.groupBy("name"));

                        // TODO 2013-12-20 it's a performance hole! destroy controller when not needed
                        controller = core.start(controllerId);
                        controller.injectView("main", $(".view", contentControls)[0]);
                        controller.setData(data);
                    } else {
                        data = null;
                    }
                };
            },

            getSelectionText: function (items, notSelectedText, formatText) {
                if (!(_(items).isArray()) || items.length === 0) {
                    return notSelectedText;
                }

                return formatText
                    .replace(/%N/g, items.length)
                    .replace(/%S/g, items.length === 1 ? "" : "s");
            },

            ensureSameRowHeight: function ($elements) {
                $elements.css("height", "auto");

                var heights = {},
                    heightsArray;

                $elements.each(function () {
                    var rect = this.getBoundingClientRect(),
                        top = rect.top,
                        height = $(this).height(),
                        maxHeight = heights[top] || 0;

                    if (height > maxHeight) {
                        heights[top] = height;
                    }
                });

                heightsArray = $elements.toArray().map(function (element) {
                    return heights[element.getBoundingClientRect().top];
                });

                $elements.each(function (index) {
                    $(this).height(heightsArray[index]);
                });
            },


            placeCaretAtEnd: function (el) {
                var range, sel, textRange;
                el.focus();
                if (window.getSelection !== "undefined" && document.createRange !== "undefined") {
                    range = document.createRange();
                    range.selectNodeContents(el);
                    range.collapse(false);
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (document.body.createTextRange !== "undefined") {
                    textRange = document.body.createTextRange();
                    textRange.moveToElementText(el);
                    textRange.collapse(false);
                    textRange.select();
                }
            }
        };
    }
);
