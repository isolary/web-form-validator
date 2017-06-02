### Installation:
`npm install web-form-validator --save` or `yarn add web-form-validator validator`

### How to use
Download react app example, install dependencies, start app;


Create a validation schema for your form. The object keys match input fields names.

List validation rules as array of strings or objects;

Available global rules: `required`, `email`, `phone`, `url`, `integer`, `lessThan`, `greaterThan`, `isEqual`, `minLength`, `maxLength`.

To customize error message in global rules add `error` in object that mentions a rule;
```javascript
  name: [{
    rule: 'required',
    error: 'Enter your name',
  }],
```

To customize a validation callback in global rules or add your own validation rule add `isValid` callback in object that mentions a rule;

The callback should return `true` if the field is valid or error message if the field is not valid

```javascript
  'phone.home': [{
    rule: 'require',
    isValid: (input, err, opt, formData) => {
      const workNumber = getDeepValue(formData, 'phone.work') || '';
      const homeNumber = input || '';
      return (workNumber.trim().length || homeNumber.trim().length) ? true : 'Enter home or work number';
    },
  }]

```


```javascript
  valid: [{
    isValid: input => (
      input === 'valid' ? true : 'The custom field is not valid'
    ),
  }]
```

User `option` in rules which require that (`lessThan`, `greaterThan`, `isEqual`, `minLength`, `maxLength`);

The library uses option as a fields name (if exists) otherwise as a value;

e.g. the library will try find a formData.password to compare with formData.confirmPassword
```javascript
  confirmPassword: [{
    rule: 'isEqual',
    error: 'Passoword confirmation should match the password',
    option: 'password',
  }],
```

**schema.js**
```javascript
export default {
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
```

**App.js**
```javascript
  ........
  import validate from 'isolary-form-validator';
  ........
  import schema from './schema';
  ........
  state = {
    formData: {
      name: '',
      username: '',
      email: '',
      valid: '',
      password: '',
      confirmPassword: '',
      message: '',
      address: {
        ........
        zip: '',
      },
    },
    errors: {},
    isValid: true,
  }
  ........
  onSubmitHandler = (e) => {
    e.preventDefault();
    const { errors, isValid } = validate(schema, this.state.formData);
  .......
```

validate callback returns array of objects (errors where key is input field name, value is an error) and boolean `isValid`
