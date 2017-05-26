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
