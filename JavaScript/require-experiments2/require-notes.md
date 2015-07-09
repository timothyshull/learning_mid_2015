#RequireJS
- Purpose is to encourage modular code, referencing modules with module IDs, and asynchronous loading (loading scripts the fastest way possible without issues caused by load order)

- Uses the CommonJS practice of string IDs for dependencies. Clear declaration of dependencies and avoids the use of globals.
- IDs can be mapped to different paths.
- Encapsulates the module definition. Gives you the tools to avoid polluting the global namespace.
- Clear path to defining the module value. Either use "return value;" or the CommonJS "exports" idiom, which can be useful for circular dependencies.
###It is an improvement over CommonJS modules because:
- It works better in the browser, it has the least amount of gotchas. Other approaches have problems with debugging, cross-domain/CDN usage, file:// usage and the need for server-specific tooling.
- Defines a way to include multiple modules in one file. In CommonJS terms, the term for this is a "transport format", and that group has not agreed on a transport format.
- Allows setting a function as the return value. This is really useful for constructor functions. In CommonJS this is more awkward, always having to set a property on the exports object. Node supports module.exports = function () {}, but that is not part of a CommonJS spec.
##Basics
- Loads apps with a config file that generally sits in the top-level directory along with the application entry point.
- The data-main can explicitly set a base url, and it is generally best to set the baseUrl and paths config for felxibility.
- Occasion when this is not true - when file:
    - Ends in ".js".
    - Starts with a "/".
    - Contains an URL protocol, like "http:" or "https:".
- Avoid deep nesting - simple structure follows the following:
    - www/
        - index.html
        - js/
            - app/
                - sub.js
            - lib/
                - jquery.js
                - canvas.js
            - app.js
            - require.js
- this structure assumes that app.js is the data-main and the application entry point (main function)
##data-main
- data-main is included in the html file and tells require which file is the entry point for script loading. This script sets configuration options and then loads the first application module. It, by default, has the html async attribute set to true.
- Can do inline require calls, but it is best to not set data-main in this case.
##RequireJS modules
- RequireJS modules extend the standard JS module pattern by not using globals to refer to other modules.
- The require pattern also allow multiple versions of one module to be loaded in a page.
##Basic RequireJS module  patterns
- With no dependencies, you can just pass an object literal to define
    - no deps - pass object literal to define, when require is called it is the same as returning an object literal froma function
    - return object literal from function 
        - Supports all aspects of privacy/object set up
        - dependencies or no dependencies
    - return function
        - same as object but provides either basic action to the assign

##config options
- waitSeconds 
- baseUrl - root path to use for all module loading (defaults to location of html page). RequireJS can load across domains.
- paths - this config property is used for path mappings that are not found directly under the base url. Assumed to be relative to base url. If the path starts with a "/" it references the top level directory possible. It is also possible to specify http.
- bundles - allows configuring multiple modules to be found in another script under one name
- pkgs 
- shim - used to configure the dependencies, exports, and custom initialization for older, browser globals style scripts that do not use define to declare dependencies and set a module value. Shim config can also just be an array of dependencies. Only use other shimmed modules as dependencies for a shim config module (ie non AMD defined modules)
    - deps
    - exports
    - init - custom initialization scripts
- config - used to pass necessary configuration info to certain modules. Can then be accessed by adding the special dependency module and calling module.config()
- map - map certain module prefixes to other modules. Also provides support for * which maps the module for all loaded modules
- packages - used to load CommonJS packages
- nodeIdCompat - defaults to seeing app.js and app as two seprate modules. If set to true, it will see them as the same (good for npm)
- context - name the loaded context (good for multiversion support)
- deps - array of additional dependencies to load. Does not block require call, but loads asynchronously as soon as config block is processed.
- callback - function to execute after deps are processed
- enforceDefine
- xhtml
- urlArgs
- scriptType
- skipDataMain

##require function
- If the first argument is an array, then it will be treated as an array of dependency string names to fetch. 
- An optional function callback can be specified to execute when all of those dependencies are available.
- require.createNode - creates either a script node (element) or an xhtml node with async set to true
##define function
- The function that handles definitions of modules. Differs from require() in that a string for the module should be the first argument, and the function to execute after dependencies are loaded should return a value to define the module corresponding to the first argument's name.


#Extra Notes
- The require() function is used to run functions immediately
- The define() function is used to make modules available for use in multiple locations. 

##shim config
requirejs.config({
  shim: {
    'source1': ['dependency1','dependency2'],
    'source2': ['source1']
  }
});

##Useful APIs for console
- require.defined(moduleId) - returns true if your moduleId has been defined and is ready for use.
- require.specified(moduleId) - returns true if your moduleId has been listed as a dependency by another defined module. Note that the module may not be ready to use even if this returns true.
- requirejs.s.contexts._.config - This is technically a "back door/undocumented" call and it returns a an object with configuration info.
- toUrl - converts to a url
- undef - removes modules

##RequireJS "errbacks"
When you make a require call, you can include a third argument - a callback that receives an error argument, allowing you to react to the error, instead of ultimately generating an uncaught exception. The method signature, when using "errbacks" looks like this:

            require(
                [ "backbone" ], 
                function ( Backbone ) {
                    return Backbone.View.extend({ /* your magic here */ });
                }, 
                function (err) {
                    /* 
                        err has err.requireType (timeout, nodefine, scripterror)
                        and err.requireModules (an array of module Ids/paths)

                        Inside here you could requirejs.undef('backbone') to clear
                        the module from require locally - and you could even redefine
                        it here or fetch it from a different location (though the
                        fallback approach earlier takes care of this use-case more succinctly)
                    */
                }
            );

##requirejs.onError
RequireJS has a global onError handler that will catch any errors not already handled by "errbacks". To use it, simply set it like this:

            requirejs.onError = function (err) {
                /* 
                    err has the same info as the errback callback:
                    err.requireType & err.requireModules
                */
                console.log(err.requireType);
                // Be sure to rethrow if you don't want to
                // blindly swallow exceptions here!!!
            };

##Properties
- The interactive test is used to know what script is currently running so that we get the right requirejs context and possibly a module name if the define call is anonymous. 
##Manually scripting a load in console
- require.load(context, module, url)
- context is usually "__". The loaded script module must be a named module. The url is not dependent on the baseUrl.
- must call require([moduleId]);
- the script is then available as var module = require(moduleId);
##Working with loaded modules
- require("module/name").callSomeFunction();
- Note this only works if "module/name" was previously loaded via the async version of require: require(["module/name"]). If using a relative path, like './module/name', those only work inside define

