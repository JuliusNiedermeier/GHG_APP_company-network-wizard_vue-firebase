export function hasSamePrototype(obj1, obj2) {
  return Object.getPrototypeOf(obj1) == Object.getPrototypeOf(obj2);
}
