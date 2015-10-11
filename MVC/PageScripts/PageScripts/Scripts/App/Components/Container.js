"format register";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};System.register(["Component"], function(exports_1) {
    var Component_1;
    var Container;
    return {
        setters:[
            function (_Component_1) {
                Component_1 = _Component_1;
            }],
        execute: function() {
            Container = (function (_super) {
                __extends(Container, _super);
                function Container() {
                    _super.apply(this, arguments);
                }
                return Container;
            })(Component_1.Component);
            exports_1("Container", Container);
        }
    }
});
//# sourceMappingURL=Container.js.map