/*global define, location */
/*jslint nomen: true, todo: true */
define(
    [
        // "moment",
        "underscore"
    ],
    /**
     * General purpose library with utility methods.
     */
    function (_) {
        "use strict";

        return {
            /**
             * Turn first letter of string to upper case, leaving the case of subsequent characters intact.
             *
             * @param {String} [text] string to transform
             * @returns {String} transformation result
             */
            upcaseFirst: function upcaseFirst(text) {
                return (typeof text === "string") ? text.replace(/^[\w\W]/, function (str) {
                    return str.toUpperCase();
                }) : "";
            },

            /**
             * Turn "thisIsHowTextLooks" to "This Is How Text Looks"
             *
             * @param {String} [text] camelCase text to transform
             * @returns {String} space-separated text
             */
            camelCaseToSpaces: function camelCaseToSpaces(text) {
                return text// insert a space before all caps
                    .replace(/([A-Z])/g, ' $1')
                    // uppercase the first character
                    .replace(/^[\w\W]/, function (str) { return str.toUpperCase(); });
            },

            /**
             * Turn "thisIsHowTextLooks" to "this[char]is[char]how[char]text[char]looks"
             *
             * @param {String} [text] camelCase text to transform
             * @returns {String} dash-separated text
             * @param char character to separate words with
             */
            camelCaseToCharSeparation: function camelCaseToDashes(text, char) {
                return text// replace A with -a
                    .replace(/([A-Z])/g, function (str) { return char + str.toLowerCase(); });
            },

            /**
             * Turn "thisIsHowTextLooks" to "this-is-how-text-looks"
             *
             * @param {String} [text] camelCase text to transform
             * @returns {String} dash-separated text
             */
            camelCaseToDashes: function camelCaseToDashes(text) {
                return this.camelCaseToCharSeparation(text, "-");
            },

            dashesToCamelCase: function dashesToCamelCase(text) {
                /*jslint unparam: true*/
                return text// replace -a with A
                    .replace(/\-([A-z])/g, function (str, letter) { return letter.toUpperCase(); });
            },

            /**
             * Prepend the string with specified symbols (zeros by default) for string to be of desired length.
             * If string is already larger than that, no changes happen to it.
             * Useful for sortable number representation in string.
             *
             * @param [str] string to pad, for example "12"
             * @param [desiredLength] length of padded string, e.g. 4
             * @param [charToPadWith] symbols to be appended to the front, e.g. "0" (default)
             * @returns {String} padded string, e.g. "0012"
             */
            pad: function pad(str, desiredLength, charToPadWith) {
                charToPadWith = charToPadWith || "0";
                str = String(str);
                return str.length < desiredLength ? pad(charToPadWith + str, desiredLength) : str;
            },

            /**
             * Returns an function that will return an object with a value wrapped under a specified property.
             * Useful when passed as an argument to map function. Like in this case:
             * ["Jack", "John", "Mike"].map(wrapUnderProperty("name")) =>
             *      [{ name: "Jack" }, { name: "John" }, { name: "Mike" }]
             *
             * @param property property to wrap under
             * @returns {Function} wrapping function accepting the value to wrap as its argument.
             */
            wrapUnderProperty: function wrapUnderProperty(property) {
                return function returnWrappedValue(value) {
                    var result = {};
                    result[property] = value;
                    return result;
                };
            },

            /**
             * Returns strings like "1 apple", "2 apples", "No apples" for specified noun and count. Works by appending
             * "s" after any noun that's not 1.
             * If the count is 0, "No" is used instead of 0 unless alwaysUseNumbers flag is set true
             *
             * @param {Number} [count]
             * @param {String} [noun]
             * @param {Boolean} [alwaysUseNumbers]
             * @returns {string}
             */
            multiplicityLabel: function multiplicityLabel(count, noun, alwaysUseNumbers) {
                return ((count === 0 && !alwaysUseNumbers) ? "No" : count) + " " + noun + (count === 1 ? "" : "s"); // UISTRING

            },

            /**
             * Returns a function that returns items extended by specified object. Useful in maps.
             *
             * @param {Object} [extension] object to extend with
             * @returns {Function} function that takes item and returns item extended with extension. Original object
             *          is not altered.
             */
            extendWith: function extendWith(extension) {
                return function (item) {
                    return _({}).extend(item, extension);
                };
            },

            /**
             * Returns a function that returns array element at specified index. Useful in maps.
             *
             * @param {Number} [index] index of array to get value at
             * @returns {Function} function that takes array and returns its element at index.
             */
            arrayElement: function arrayElement(index) {
                return function (array) {
                    return array[index];
                };
            },


            getCountLabel: function (count, label, postfix, insertE) {
                var countText = count + " " + label;
                countText += (count === 1 ? "" : (insertE ? "es" : "s"));
                if (postfix) {
                    countText += " " + postfix.replace("%s", count === 1 ? "" : "s");
                }

                if (count === 0) {
                    countText = "";
                }
                return countText;
            },

            getNiceTime: function (ms) {
                // var thatMoment = moment.unix(0.001 * ms);
                var thatMoment = 1000;
                return thatMoment.calendar() + " (" + thatMoment.fromNow() + ")";
            },

            guid: function (dashes) {
                if (dashes === undefined) {
                    dashes = true;
                }

                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return function () {
                    var dash = dashes ? "-" : "";
                    return s4() + s4() + dash + s4() + dash + s4() + dash +
                        s4() + dash + s4() + s4() + s4();
                };
            },

            getFormattedTime: function (ms, utc) {
                if (ms instanceof Date) {
                    ms = +ms;
                }

                if (typeof ms === "number") {
                    var time = new Date(ms),
                        hours = utc ? time.getUTCHours() : time.getHours(),
                        minutes = utc ? time.getUTCMinutes() : time.getMinutes(),
                        seconds = utc ? time.getUTCSeconds() : time.getSeconds();

                    if (hours < 10) {
                        hours = "0" + hours;
                    }
                    if (minutes < 10) {
                        minutes = "0" + minutes;
                    }
                    if (seconds < 10) {
                        seconds = "0" + seconds;
                    }

                    return hours + ":" + minutes + ":" + seconds;
                }

                return "";
            },

            prop: function (property, wrapperFunction) {
                return function (d) {
                    var result = d[property];
                    if (typeof wrapperFunction === "function") {
                        result = wrapperFunction(result);
                    }
                    return result;
                };
            }
        };
    }
);