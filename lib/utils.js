'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var setValue = function setValue(obj, path, value) {
  var keys = path.split('.');
  var o = obj;

  keys.map(function (key, i) {
    if (i >= keys.length - 1) return false;
    o[key] = o[key] || {};
    o = o[key];
    return true;
  });

  o[keys[keys.length - 1]] = value;
};

var getDeepValue = exports.getDeepValue = function getDeepValue(obj, path) {
  var o = obj;
  if (path === undefined) return undefined;
  var p = path.toString().replace(/\[(\w+)\]/g, '.$1');
  p = p.replace(/^\./, '');
  var keys = p.split('.');
  while (keys.length) {
    var n = keys.shift();
    if (n in o) {
      o = o[n];
    } else {
      return undefined;
    }
  }
  return o;
};

var setDeepValue = exports.setDeepValue = function setDeepValue(obj, path, value) {
  var newData = Object.assign({}, obj);
  setValue(newData, path, value);
  return newData;
};