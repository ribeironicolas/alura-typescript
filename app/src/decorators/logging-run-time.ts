export function LoggingRunTime(inSeconds: boolean = false) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: Array<any>) {
      let divisor = 1;
      let unit = "ms";
      if (inSeconds) {
        divisor = 1000;
        unit = "s";
      }

      const t1 = performance.now();
      const originalMethodExec = originalMethod.apply(this, args);
      const t2 = performance.now();
      console.log(
        `${propertyKey}, execution time: ${(t2 - t1) / divisor} ${unit}`
      );
      originalMethodExec;
    };

    return descriptor;
  };
}
