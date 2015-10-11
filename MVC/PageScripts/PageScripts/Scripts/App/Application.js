System.register(["Utils"], function(exports_1) {
    var Utils;
    var Application;
    return {
        setters:[
            function (_Utils) {
                Utils = _Utils;
            }],
        execute: function() {
            Application = (function () {
                function Application() {
                }
                Application.prototype.initialize = function () {
                    // Get page component name
                    var componentName = document.body.dataset["jsComponent"];
                    if (!componentName) {
                        // No page level component found
                        return;
                    }
                    System.import("Pages/" + componentName)
                        .then(function (mod) {
                        if (typeof mod[componentName] === "function") {
                            var pageComponent = Utils.createInstance(mod[componentName], document.body);
                            pageComponent.initialize();
                        }
                    });
                };
                return Application;
            })();
            exports_1("Application", Application);
        }
    }
});
//# sourceMappingURL=Application.js.map