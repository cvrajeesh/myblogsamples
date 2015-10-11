System.register(["Utils"], function(exports_1) {
    var Utils;
    var Component;
    return {
        setters:[
            function (_Utils) {
                Utils = _Utils;
            }],
        execute: function() {
            Component = (function () {
                function Component(element) {
                    this.element = element;
                }
                Object.defineProperty(Component.prototype, "container", {
                    get: function () {
                        return this.element;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Component.prototype, "componentName", {
                    get: function () {
                        return this.container.dataset["jsComponent"];
                    },
                    enumerable: true,
                    configurable: true
                });
                Component.prototype.initialize = function () {
                    var _this = this;
                    if (this.initializationPromise) {
                        return this.initializationPromise;
                    }
                    console.log("Initializing - %s(Component)", this.componentName);
                    // Initialize nested components
                    var componentElements = this.getChildComponents(this.container);
                    var childComponentInitializationPromise;
                    if (componentElements.length == 0) {
                        childComponentInitializationPromise = Promise.resolve({ isInitialized: true, componentName: this.componentName });
                    }
                    else {
                        var componentLoadPromises = componentElements.map(function (componentElement, i) {
                            var componentName = componentElement.dataset["jsComponent"];
                            console.log("Importing Components/%s module", componentName);
                            return System.import("Components/" + componentName)
                                .then(function (mod) {
                                console.log("Imported Components/%s module", componentName);
                                if (typeof mod[componentName] === "function") {
                                    console.log("Found %s(Component) in Components/%s module", componentName, componentName);
                                    return {
                                        isLoaded: true,
                                        componentName: componentName,
                                        component: mod[componentName],
                                        componentElement: componentElement
                                    };
                                }
                                console.error("%s(Component) is not found in Components/%s module", componentName, componentName);
                                return {
                                    isLoaded: false
                                };
                            }, function () {
                                console.error("Importing Components/%s module failed", componentName);
                                return {
                                    isLoaded: false
                                };
                            });
                        });
                        childComponentInitializationPromise = Promise.all(componentLoadPromises)
                            .then(function (results) {
                            var componentPromises = [];
                            results.forEach(function (result) {
                                if (result.isLoaded) {
                                    var component = Utils.createInstance(result.component, result.componentElement);
                                    componentPromises.push(component.initialize());
                                }
                            });
                            return Promise.all(componentPromises);
                        })
                            .then(function (results) {
                            return {
                                isInitialized: results.every(function (value) { return value; }),
                                componentName: _this.componentName
                            };
                        });
                    }
                    this.initializationPromise = childComponentInitializationPromise.then(function (result) {
                        if (result.isInitialized) {
                            console.log("Initialized - %s(Component)", result.componentName);
                            window.setTimeout(function () { return _this.onReady(); }, 0);
                        }
                        else {
                            console.error("%s child components failed to initialize", result.componentName);
                        }
                        return result.isInitialized;
                    })
                        .catch(function (error) {
                        console.group("Initialization failed - " + _this.componentName + " (Component)");
                        console.error(error);
                        console.groupEnd();
                    });
                    return this.initializationPromise;
                };
                Component.prototype.onReady = function () {
                    console.log("%s OnReady called", this.componentName);
                };
                Component.prototype.getChildComponents = function (root) {
                    var componentElements = [];
                    if (root.children.length == 0) {
                        return componentElements;
                    }
                    for (var i = 0; i < root.children.length; i++) {
                        var element = root.children[i];
                        if (element.classList.contains("js-component") && element.dataset["jsComponent"]) {
                            componentElements.push(element);
                            continue;
                        }
                        componentElements.push.apply(componentElements, this.getChildComponents(element));
                    }
                    return componentElements;
                };
                return Component;
            })();
            exports_1("Component", Component);
        }
    }
});
//# sourceMappingURL=Component.js.map