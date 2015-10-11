import { Component } from "Component"
import * as Utils from "Utils"

export class Application {

    public initialize(): void {

        // Get page component name
        var componentName = document.body.dataset["jsComponent"];
        if (!componentName) {
            // No page level component found
            return;
        }

        System.import("Pages/" + componentName)
            .then((mod) => {
                if (typeof mod[componentName] === "function") {
                    var pageComponent = Utils.createInstance<Component>(mod[componentName], document.body);
                    pageComponent.initialize();
                }
            });
    }
}