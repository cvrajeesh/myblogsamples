"format register";

import { Component } from "Component"

export class Popover extends Component {

    public onReady() {
        $(this.container).popover({
            content: "Popover Component",
            placement: "right"
        });
    }
}