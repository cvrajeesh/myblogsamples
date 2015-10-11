System.register([], function(exports_1) {
    function forEach(array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    }
    exports_1("forEach", forEach);
    function createInstance(classType) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var instance = Object.create(classType.prototype);
        instance.constructor.apply(instance, params);
        return instance;
    }
    exports_1("createInstance", createInstance);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=Utils.js.map