import rules from './globalRules';
import { getDeepValue } from './utils';

export default function validate(schema = {}, formData = {}) {
  const errors = {};

  function updateErrors(key, error) {
    errors[key] = error;
  }

  function processValidation(key) {
    schema[key].some((value) => {
      let result = null;
      const input = getDeepValue(formData, key);

      if (typeof value === 'string' && value in rules) {
        const option = getDeepValue(formData, rules[value].option) === undefined ? rules[value].option : getDeepValue(formData, rules[value].option);
        result = rules[value].isValid(input, rules[value].error, option, formData);
      }

      if (typeof value === 'object' && value !== null) {
        const option = getDeepValue(formData, value.option) === undefined ? value.option : getDeepValue(formData, value.option);
        if (typeof value.isValid === 'function') {
          result = value.isValid(input, value.error, option, formData);
        } else if (value.rule in rules) {
          result = rules[value.rule].isValid(input, value.error, option, formData);
        } else {
          console.warn(`Validate callback hasn't found for '${key}' input field`) // eslint-disable-line
        }
      }

      typeof result === 'string' && updateErrors(key, result);

      return value === 'required' && typeof result === 'string';
    });
  }

  Object.keys(schema).forEach((key) => {
    processValidation(key);
  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
