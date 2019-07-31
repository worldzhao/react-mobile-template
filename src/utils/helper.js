const toString = Object.prototype.toString;

export const isUndefined = x => typeof x === 'undefined';

export const isNumber = x => typeof x === 'number' && !isNaN(x);

export const isBoolean = x => typeof x === 'boolean';

// 是否为普通对象 {k:v}
export function isPlainObject(x) {
  return toString.call(x) === '[object Object]';
}

export const isType = type => x => toString.call(x).slice(8, -1) === type;

export const isString = isType('String');

export const isFunction = isType('Function');
