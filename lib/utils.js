const setValue = (obj, path, value) => {
  const keys = path.split('.');
  let o = obj;

  keys.map((key, i) => {
    if (i >= keys.length - 1) return false;
    o[key] = o[key] || {};
    o = o[key];
    return true;
  });

  o[keys[keys.length - 1]] = value;
};

export const getDeepValue = (obj, path) => {
  let o = obj;
  if (path === undefined) return undefined;
  let p = path.toString().replace(/\[(\w+)\]/g, '.$1');
  p = p.replace(/^\./, '');
  const keys = p.split('.');
  while (keys.length) {
    const n = keys.shift();
    if (n in o) {
      o = o[n];
    } else {
      return undefined;
    }
  }
  return o;
};

export const setDeepValue = (obj, path, value) => {
  const newData = Object.assign({}, obj);
  setValue(newData, path, value);
  return newData;
};
