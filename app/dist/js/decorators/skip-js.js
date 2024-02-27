export function SkipJs(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        let exec = originalMethod.apply(this, args);
        if (typeof exec === "string") {
            exec = exec.replace(/<script>[\s\S]*?<\/script>/, "");
        }
        return exec;
    };
    return descriptor;
}
