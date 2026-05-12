sap.ui.loader.config({
    shim: {
        "sap/ui/qunit/qunit-junit": {
            deps: ["sap/ui/thirdparty/qunit-2"]
        },
        "sap/ui/qunit/qunit-coverage": {
            deps: ["sap/ui/thirdparty/qunit-2"]
        },
        "sap/ui/thirdparty/sinon-qunit": {
            deps: ["sap/ui/thirdparty/qunit-2", "sap/ui/thirdparty/sinon"]
        },
        "sap/ui/qunit/sinon-qunit-bridge": {
            deps: ["sap/ui/thirdparty/qunit-2", "sap/ui/thirdparty/sinon-4"]
        }
    }
});

window.QUnit = Object.assign({}, window.QUnit, { config: { autostart: false } });

sap.ui.require(
  [
    "sap/ui/thirdparty/qunit-2",
    "sap/ui/qunit/qunit-junit",
    "sap/ui/qunit/qunit-coverage",
    "samplefio/appfiori/test/integration/FirstJourney",
    "samplefio/appfiori/test/integration/OrderListJourney",
    "samplefio/appfiori/test/integration/OrderObjectPageJourney",
    "samplefio/appfiori/test/integration/OrderItemObjectPageJourney",
], function (QUnit) {
    "use strict";
    QUnit.start();
});
