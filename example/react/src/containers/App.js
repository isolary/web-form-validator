import React, { Component } from 'react';
import PropTypes from 'prop-types';

import validate from 'isolary-form-validator';

import schema from './schema';

import { setDeepValue } from '../utils';

import style from './App.scss';

export default class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

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
        line1: '',
        line: '',
        city: '',
        state: '',
        zip: '',
      },
    },
    errors: {},
    isValid: true,
  }

  onChangeHandler = (e) => {
    const { errors } = this.state;
    let { formData } = this.state;

    const key = e.target.name;
    const value = e.target.value;

    if (key.split('.').length > 1) {
      formData = setDeepValue(Object.assign({}, formData), key, value);
    } else {
      formData[key] = value;
    }

    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      delete errors[key];
    }

    this.setState({
      errors,
      formData,
      isValid: Object.keys(errors).length === 0,
    });
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { errors, isValid } = validate(schema, this.state.formData);

    this.setState({ errors, isValid });
  }

  render() {
    const { isValid, errors, formData } = this.state;
    return (
      <div className={style.container}>
        <form onSubmit={this.onSubmitHandler}>
          <label>
            Enter your full name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={this.onChangeHandler}
            />
            <span>{errors.name || ' '}</span>
          </label>

          <label>
            Enter your username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={this.onChangeHandler}
            />
            <span>{errors.username || ' '}</span>
          </label>

          <label>
            Enter your email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={this.onChangeHandler}
            />
            <span>{errors.email || ' '}</span>
          </label>

          <label>
            Enter {'"valid"'}
            <input
              type="text"
              name="valid"
              value={formData.valid}
              onChange={this.onChangeHandler}
            />
            <span>{errors.valid || ' '}</span>
          </label>

          <label>
            Enter password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={this.onChangeHandler}
            />
            <span>{errors.password || ' '}</span>
          </label>

          <label>
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={this.onChangeHandler}
            />
            <span>{errors.confirmPassword || ' '}</span>
          </label>

          <label>
            Enter Message (max. 50 characters)
            <textarea
              name="message"
              value={formData.message}
              onChange={this.onChangeHandler}
            />
            <span>{errors.message || ' '}</span>
          </label>

          <address>
            Enter your address
            <label>Address line 1
              <input
                type="text"
                name="address.line1"
                value={formData.address.line1}
                onChange={this.onChangeHandler}
              />
              <span>{errors['address.line1'] || ' '}</span>
            </label>

            <label>Address line 2
              <input
                type="text"
                name="address.line2"
                value={formData.address.line2}
                onChange={this.onChangeHandler}
              />
              <span>{errors['address.line2'] || ' '}</span>
            </label>

            <label>City
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={this.onChangeHandler}
              />
              <span>{errors['address.city'] || ' '}</span>
            </label>

            <label>State
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={this.onChangeHandler}
              />
              <span>{errors['address.state'] || ' '}</span>
            </label>

            <label>Zip
              <input
                type="text"
                name="address.zip"
                value={formData.address.zip}
                onChange={this.onChangeHandler}
              />
              <span>{errors['address.zip'] || ' '}</span>
            </label>
          </address>

          <button disabled={!isValid}>Submit</button>
        </form>
        <pre>
          {Object.keys(errors).length > 0 ? (
            <ul>
              { Object.keys(errors).map((error, index) => (
                <li key={index}>{`field: ${error}, error: ${errors[error]}`}</li>
              )) }
            </ul>
          ) : 'Form is valid'}
        </pre>
      </div>
    );
  }
}
