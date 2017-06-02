Installation:
`npm install web-form-validator --save` or `yarn add web-form-validator validator`

Available Global Rules:
  'email'
  'required'
  'phone'
  'url'
  'integer'
  'lessThan'
  'greaterThan'
  'isEqual'
  'minLength'
  'maxLength'

Custom Rules Syntax:
// Keys are a inputs field name
// Value are array of strings or objects

// if value is string then library validates input value by its own global rules
// you can specify global error message by passing error in schema object
// or you can specify validation callback by passing isValid function

// rules like lessThan, greaterThan, isEqual, minLength, maxLength, etc. needs option which is
// input field name (ex. for isEqual rule) or value (if that key doesn't exists in the data object)
  {
    username: ['required'],
    name: [{
      rule: 'required',
      error: 'Enter your name',
    }],
    email: ['required', 'email'],
    valid: [{
      isValid: input => (
        input === 'valid' ? true : 'The custom field is not valid'
      ),
    }],
    confirmPassword: [{
      rule: 'isEqual',
      error: 'Passoword confirmation should match the password',
      option: 'password',
    }],
    message: [{
      rule: 'maxLength',
      option: 50,
    }],
    'address.zip': [
      'integer',
      'required',
      {
        rule: 'minLength',
        option: 5,
      },
    ],
  };


How to use:
React app example