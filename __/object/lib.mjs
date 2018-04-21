export const assign = Object.assign.bind(Object)
export function clone() {
  return assign({}, ...arguments)
}
export function mixin(target, ...sources) {
  for (let i=0; i < sources.length; i++) {
    const source = sources[i]
        , propertyNames = Object.getOwnPropertyNames(source)
    for (let j=0; j < propertyNames.length; j++) {
      const propertyName = propertyNames[j]
      Object.defineProperty(
        target,
        propertyName,
        Object.getOwnPropertyDescriptor(source, propertyName))
    }
  }
  return target
}
