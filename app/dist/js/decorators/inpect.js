export function Inspect() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            console.log(`--- Method ${propertyKey}`);
            console.log(`------ parameters ${JSON.stringify(args)}`);
            const exec = originalMethod.apply(this, args);
            console.log(`------ return: ${JSON.stringify(exec)}`);
            return exec;
        };
        return descriptor;
    };
}
