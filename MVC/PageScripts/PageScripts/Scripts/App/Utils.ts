
export function forEach(array: any, callback: (index: number, item: any) => void, scope: any) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
}

export function createInstance<T>(classType: () => void, ...params: any[]): T {
    var instance: any = Object.create(classType.prototype);
    instance.constructor.apply(instance, params);
    return instance;
}