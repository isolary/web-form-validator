'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  email: {
    isValid: function isValid() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Email is invalid';
      return _validator2.default.isEmail(input) ? true : error;
    }
  },
  required: {
    isValid: function isValid() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'The input field is requried';
      return _validator2.default.isEmpty(input) ? error : true;
    }
  },
  phone: {
    isValid: function isValid() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Phone Number is invalid';

      var regex = /^([a-zA-Z,#/ \.\(\)\-\+\*]*[0-9]){7}[0-9a-zA-Z,#/ \.\(\)\-\+\*]*$/; // eslint-disable-line
      if (!input) {
        return true;
      }
      return input && regex.test(input) ? true : error;
    }
  },
  url: {
    isValid: function isValid() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'URL is invalid';
      return _validator2.default.isURL(input) ? true : error;
    }
  },
  integer: {
    isValid: function isValid() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'The input is not an integer';
      return input !== '' && Number.isInteger(+input) ? true : error;
    }
  },
  lessThan: {
    isValid: function isValid() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var error = arguments[1];
      var amount = arguments[2];
      return input < amount ? true : error || 'The input should be less than ' + amount;
    }
  },
  greaterThan: {
    isValid: function isValid() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var error = arguments[1];
      var amount = arguments[2];
      return input > amount ? true : error || 'The input should be greater than ' + amount;
    }
  },
  isEqual: {
    isValid: function isValid() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var error = arguments[1];
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var formData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var match = '';
      if (options.match) {
        match = formData[options.match] || '';
      } else {
        match = options.value || '';
      }
      return (0, _isEqual2.default)(input, match) ? true : error || 'The values are not equal';
    }
  },
  minLength: {
    isValid: function isValid() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var error = arguments[1];
      var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return input.toString().trim().length >= length ? true : error || 'The input length should be at least ' + length + ' characters';
    }
  },
  maxLength: {
    isValid: function isValid() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var error = arguments[1];
      var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return input.toString().trim().length <= length ? true : error || 'The input length should be ' + length + ' characters maximum';
    }
  }
};