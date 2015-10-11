"format register";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};System.register(["Component"], function(exports_1) {
    var Component_1;
    var Popover;
    return {
        setters:[
            function (_Component_1) {
                Component_1 = _Component_1;
            }],
        execute: function() {
            Popover = (function (_super) {
                __extends(Popover, _super);
                function Popover() {
                    _super.apply(this, arguments);
                }
                Popover.prototype.onReady = function () {
                    $(this.container).popover({
                        content: "Popover Component",
                        placement: "right"
                    });
                };
                return Popover;
            })(Component_1.Component);
            exports_1("Popover", Popover);
        }
    }
});
//# sourceMappingURL=Popover.js.map