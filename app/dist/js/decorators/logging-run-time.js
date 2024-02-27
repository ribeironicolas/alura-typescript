export function LoggingRunTime(inSeconds = false) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            let divisor = 1;
            let unit = "ms";
            if (inSeconds) {
                divisor = 1000;
                unit = "s";
            }
            const t1 = performance.now();
            const originalMethodExec = originalMethod.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey}, execution time: ${(t2 - t1) / divisor} ${unit}`);
            originalMethodExec;
        };
        return descriptor;
    };
}
