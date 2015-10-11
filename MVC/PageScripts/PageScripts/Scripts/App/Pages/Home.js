"format register";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};System.register(["Component"], function(exports_1) {
    var Component_1;
    var Home;
    return {
        setters:[
            function (_Component_1) {
                Component_1 = _Component_1;
            }],
        execute: function() {
            Home = (function (_super) {
                __extends(Home, _super);
                function Home() {
                    _super.apply(this, arguments);
                }
                return Home;
            })(Component_1.Component);
            exports_1("Home", Home);
        }
    }
});
//# sourceMappingURL=Home.js.map