import expect from 'expect.js';
import validate from '../lib/index.js';

describe('Validation', function() {
  it('The user name is required. Using global rules', function() {
    let data = { username: '' };
    const schema = { username: ['required']};

    var { errors, isValid } = validate(schema, data);
    expect(errors).to.eql({ username: 'The input field is requried' });
    expect(isValid).to.eql(false);

    data = { username: 'ivan'}
    var { errors, isValid } = validate(schema, data);
    expect(errors).to.eql({});
    expect(isValid).to.eql(true);
  });

  it('The full name is required. Customize error message', function(){
    let data = { name: '' };
    const schema = {
      name: [{
        rule: 'required',
        error: 'Enter your name',
      }]
    };

    var { errors, isValid } = validate(schema, data);
    expect(errors).to.eql({ name: 'Enter your name' });
    expect(isValid).to.eql(false);

    data = { name: 'ivan'}
    var { errors, isValid } = validate(schema, data);
    expect(errors).to.eql({});
    expect(isValid).to.eql(true);
  })

  it('Validate email. Use multiple rules.', function(){
    let data = { email: '' };
    const schema = {
     email: ['required', 'email']
    };

    var { errors, isValid } = validate(schema, data);
    expect(errors).to.eql({ email: 'The input field is requried' });
    expect(isValid).to.eql(false);

    data = { email: 'email.com'}
    var { errors, isValid } = validate(schema, data);
    expect(errors).to.eql({ email: 'Email is invalid' });
    expect(isValid).to.eql(false);

    data = { email: 'ivan@example.com'}
    var { errors, isValid } = validate(schema, data);
    expect(errors).to.eql({});
    expect(isValid).to.eql(true);
  })

    it('Validate input by custom callback', function(){
    let data = { valid: '' };
    const schema = {
       valid: [{
        isValid: input => (
          input === 'valid' ? true : 'The custom field is not valid'
        ),
      }],
    };

    var { errors, isValid } = validate(schema, data);
    expect(errors).to.eql({ valid: 'The custom field is not valid' });
    expect(isValid).to.eql(false);

    data = { valid: 'valid'}
    var { errors, isValid } = validate(schema, data);
    expect(errors).to.eql({});
    expect(isValid).to.eql(true);
  })

  it('Validate inputs by other global rules', function(){
    const data = {
      phone: '(335)-333-33-33',
      url: 'https://github.com/IvanKalinin',
      amount: '1234',
      distance: '5000',
      age: '24',
      password: 'p@ssword',
      confirmPassword: 'p@ssword',
      active: 'true',
      message: 'Lorem ipsum dolor sit amet, usu eu congue debitis definitionem, an augue ludus pri.',
      address: {
        line1: '',
        line: '',
        city: '',
        state: '',
        zip: '12345',
      },
    };

    const schema = {
      phone: ['phone'],
      url: ['url'],
      amount: ['integer'],
      distance: [{
        rule: 'lessThan',
        option: 5500,
      }],
      age: [{
        rule: 'greaterThan',
        option: 21,
      }],
      confirmPassword: [{
        rule: 'isEqual',
        option: 'password',
      }],
      active: [{
        rule: 'isEqual',
        option: 'true',
      }],
      message: [{
        rule: 'minLength',
        option: 10,
      }, {
        rule: 'maxLength',
        option: 100,
      }],
      'address.zip': [{
        rule: 'minLength',
        option: 5,
      }]
    }

    var { errors, isValid } = validate(schema, data);
    expect(errors).to.eql({ });
    expect(isValid).to.eql(true);

  })

})