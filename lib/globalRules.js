import Validator from 'validator';
import isEqual from 'lodash/isEqual';

export default {
  email: {
    isValid: (input = '', error = 'Email is invalid') => (
      Validator.isEmail(input) ? true : error
    ),
  },
  required: {
    isValid: (input = '', error = 'The input field is requried') => (
      Validator.isEmpty(input) ? error : true
    ),
  },
  phone: {
    isValid: (input = '', error = 'Phone Number is invalid') => {
      const regex = /^([a-zA-Z,#/ \.\(\)\-\+\*]*[0-9]){7}[0-9a-zA-Z,#/ \.\(\)\-\+\*]*$/; // eslint-disable-line
      if (!input) {
        return true;
      }
      return input && regex.test(input) ? true : error;
    },
  },
  url: {
    isValid: (input = '', error = 'URL is invalid') => (
      Validator.isURL(input) ? true : error
    ),
  },
  integer: {
    isValid: (input = '', error = 'The input is not an integer') => (
      input !== '' && Number.isInteger(+input) ? true : error
    ),
  },
  lessThan: {
    isValid: (input = '', error, amount) => (
      input < amount ? true : (error || `The input should be less than ${amount}`)
    ),
  },
  greaterThan: {
    isValid: (input = '', error, amount) => (
      input > amount ? true : (error || `The input should be greater than ${amount}`)
    ),
  },
  isEqual: {
    isValid: (input = '', error, options = {}, formData = {}) => {
      let match = '';
      if (options.match) {
        match = formData[options.match] || '';
      } else {
        match = options.value || '';
      }
      return isEqual(input, match) ? true : (error || 'The values are not equal');
    },
  },
  minLength: {
    isValid: (input = '', error, length = 0) => (
      input.toString().trim().length >= length ? true : (error || `The input length should be at least ${length} characters`)
    ),
  },
  maxLength: {
    isValid: (input = '', error, length = 0) => (
      input.toString().trim().length <= length ? true : (error || `The input length should be ${length} characters maximum`)
    ),
  },
};
