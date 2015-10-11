import * as Utils from "Utils"

interface IComponentLoadStatus {
    isLoaded: boolean;
    componentName?: string;
    component?: any;
    componentElement?: HTMLElement;
}

interface IComponentInitStatus {
    isInitialized: boolean;
    componentName: string;
}

export class Component {

    private initializationPromise: Promise<any>;

    constructor(private element: HTMLElement) {
    }

    public get container() {
        return this.element;
    }

    public get componentName() {
        return this.container.dataset["jsComponent"];
    }

    public initialize(): Promise<any> {

        if (this.initializationPromise) {
            return this.initializationPromise;
        }

        console.log("Initializing - %s(Component)", this.componentName);
        // Initialize nested components
        var componentElements = this.getChildComponents(this.container);
        var childComponentInitializationPromise: Promise<IComponentInitStatus>;
        if (componentElements.length == 0) {
            childComponentInitializationPromise = Promise.resolve(<IComponentInitStatus>{ isInitialized: true, componentName: this.componentName });
        } else {
            var componentLoadPromises: Promise<IComponentLoadStatus>[] = componentElements.map((componentElement: HTMLElement, i: number) => {
                let componentName = componentElement.dataset["jsComponent"];

                console.log("Importing Components/%s module", componentName);
                return System.import("Components/" + componentName)
                    .then(
                        (mod) => {
                            console.log("Imported Components/%s module", componentName);
                            if (typeof mod[componentName] === "function") {

                                console.log("Found %s(Component) in Components/%s module", componentName, componentName);
                                return <IComponentLoadStatus>{
                                    isLoaded: true,
                                    componentName: componentName,
                                    component: mod[componentName],
                                    componentElement: componentElement
                                };
                            }

                            console.error("%s(Component) is not found in Components/%s module", componentName, componentName);
                            return <IComponentLoadStatus>{
                                isLoaded: false
                            };
                        },
                        () => {
                            console.error("Importing Components/%s module failed", componentName);
                            return <IComponentLoadStatus>{
                                isLoaded: false
                            }
                        });
            });
            childComponentInitializationPromise = Promise.all<any>(componentLoadPromises)
                .then(
                    (results: IComponentLoadStatus[]) => {
                        let componentPromises: Promise<boolean>[] = [];
                        results.forEach(result => {
                            if (result.isLoaded) {
                                var component = Utils.createInstance<Component>(result.component, result.componentElement);
                                componentPromises.push(component.initialize());
                            }
                        });

                        return Promise.all<boolean>(componentPromises);
                    })
                .then(
                (results: boolean[]) => {
                    return <IComponentInitStatus>{
                        isInitialized: results.every((value) => value),
                        componentName: this.componentName
                    };
                });

        }

        this.initializationPromise = childComponentInitializationPromise.then(
            result => {
                if (result.isInitialized) {
                    console.log("Initialized - %s(Component)", result.componentName);
                    window.setTimeout(() => this.onReady(), 0);
                } else {
                    console.error("%s child components failed to initialize", result.componentName);
                }
                
                return result.isInitialized;
            })
            .catch(error => {
                console.group("Initialization failed - " + this.componentName + " (Component)");
                console.error(error);
                console.groupEnd();
            });

        return this.initializationPromise;
    }

    public onReady() {
        console.log("%s OnReady called", this.componentName);
    }

    private getChildComponents(root: HTMLElement): HTMLElement[]{

        var componentElements: HTMLElement[] = [];
        if (root.children.length == 0) {
            return componentElements;
        }

        for (var i = 0; i < root.children.length; i++) {
            var element = <HTMLElement>root.children[i];
            if (element.classList.contains("js-component") && element.dataset["jsComponent"]) {
                componentElements.push(element);
                continue;
            }

            componentElements.push.apply(componentElements, this.getChildComponents(element));
        }

        return componentElements;
    }
}