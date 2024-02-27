export function SkipJs(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    let exec = originalMethod.apply(this, args);
    if (typeof exec === "string") {
      exec = exec.replace(/<script>[\s\S]*?<\/script>/, "");
    }
    return exec;
  };

  return descriptor;
}
