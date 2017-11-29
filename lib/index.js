'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = validate;

var _globalRules = require('./globalRules');

var _globalRules2 = _interopRequireDefault(_globalRules);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate() {
  var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var formData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var errors = {};

  function updateErrors(key, error) {
    errors[key] = error;
  }

  function processValidation(key) {
    schema[key].some(function (rule) {
      var result = null;
      var input = (0, _utils.getDeepValue)(formData, key);

      if (typeof rule === 'string' && rule in _globalRules2.default) {
        var option = (0, _utils.getDeepValue)(formData, _globalRules2.default[rule].option) === undefined ? _globalRules2.default[rule].option : (0, _utils.getDeepValue)(formData, _globalRules2.default[rule].option);
        result = _globalRules2.default[rule].isValid(input, _globalRules2.default[rule].error, option, formData);
      }

      if ((typeof rule === 'undefined' ? 'undefined' : _typeof(rule)) === 'object' && rule !== null) {
        var _option = (0, _utils.getDeepValue)(formData, rule.option) === undefined ? rule.option : (0, _utils.getDeepValue)(formData, rule.option);
        if (typeof rule.isValid === 'function') {
          result = rule.isValid(input, rule.error, _option, formData);
        } else if (rule.rule in _globalRules2.default) {
          result = _globalRules2.default[rule.rule].isValid(input, rule.error, _option, formData);
        } else {
          console.warn('Validate callback hasn\'t found for \'' + key + '\' input field'); // eslint-disable-line
        }
      }

      typeof result === 'string' && updateErrors(key, result);

      return rule === 'required' && typeof result === 'string';
    });
  }

  Object.keys(schema).forEach(function (key) {
    processValidation(key);
  });

  return {
    errors: errors,
    isValid: Object.keys(errors).length === 0
  };
}