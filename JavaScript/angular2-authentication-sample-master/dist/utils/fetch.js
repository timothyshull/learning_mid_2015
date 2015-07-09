System.register("utils/fetch", [], function($__export) {
  "use strict";
  var __moduleName = "utils/fetch";
  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    return response.text().then(function(text) {
      throw new Error(text);
    });
  }
  function text(response) {
    return response.text();
  }
  function json(response) {
    return response.json();
  }
  $__export("status", status);
  $__export("text", text);
  $__export("json", json);
  return {
    setters: [],
    execute: function() {
    }
  };
});
