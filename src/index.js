import rules from './globalRules';
import { getDeepValue } from './utils';

export default function validate(schema = {}, formData = {}) {
  const errors = {};

  function updateErrors(key, error) {
    errors[key] = error;
  }

  function processValidation(key) {
    schema[key].some((rule) => {
      let result = null;
      const input = getDeepValue(formData, key);

      if (typeof rule === 'string' && rule in rules) {
        const option = getDeepValue(formData, rules[rule].option) === undefined ? rules[rule].option : getDeepValue(formData, rules[rule].option);
        result = rules[rule].isValid(input, rules[rule].error, option, formData);
      }

      if (typeof rule === 'object' && rule !== null) {
        const option = getDeepValue(formData, rule.option) === undefined ? rule.option : getDeepValue(formData, rule.option);
        if (typeof rule.isValid === 'function') {
          result = rule.isValid(input, rule.error, option, formData);
        } else if (rule.rule in rules) {
          result = rules[rule.rule].isValid(input, rule.error, option, formData);
        } else {
          console.warn(`Validate callback hasn't found for '${key}' input field`) // eslint-disable-line
        }
      }

      typeof result === 'string' && updateErrors(key, result);

      return rule === 'required' && typeof result === 'string';
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
