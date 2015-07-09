/*global define*/
/*jslint nomen: true*/
define(
    [
        "app/core",
        "modules/base/base-model",
        "underscore"
    ],
    function (core, BaseModel, _) {
        "use strict";
        core.registerModel("body", function (BaseModel) {
            return BaseModel;
        });
    }
);

