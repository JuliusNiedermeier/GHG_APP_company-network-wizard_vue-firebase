export function isInstanceOf(instance, type) {
  return Object.getPrototypeOf(instance) == type.prototype;
}
