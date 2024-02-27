export function DomInjector(selector) {
    return function (target, propertyKey) {
        let element = null;
        const getter = function () {
            if (!element) {
                element = document.querySelector(selector);
            }
            return document.querySelector(selector);
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
        });
    };
}
