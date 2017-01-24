
# React Validations HOC

React higher order component for form validations

## Usage

```jsx
import React from 'react'
import withValidations from 'react-hoc-validations'

const SignupForm = ({
  username,
  password,
  zip,
  onChange,
  onSubmit,
  errors,
  onBlur
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          name='username'
          value={username}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors.username && (
          <span>{errors.username}</span>
        )}
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors.password && (
          <span>{errors.password}</span>
        )}
      </div>
      <div>
        <label htmlFor='zip'>ZIP Code</label>
        <input
          type='number'
          id='zip'
          name='zip'
          value={zip}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors.zip && (
          <span>{errors.zip}</span>
        )}
      </div>
    </form>
  )
}

const validations = {
  username: (value) => {
    if (value.length < 6) {
      return 'Must be at least 6 characters'
    }
    return null
  },
  password: (value, props) => {
    if (value === props.password) {
      return 'Password must be different from username'
    }
    if (value.length < 8) {
      return 'Must be at least 8 characters'
    }
    return null
  },
  zip: (value) => {
    if (value.length !== 5) {
      return 'ZIP code must be 5 digits'
    }
    return null
  }
}

export default withValidations(validations)(SignupForm)
```

## API

### `withValidations(validations)(Component)`

Returns a higher order component for form components,
which provides the following props:

- `onBlur` - an onBlur handler to be passed onto form inputs
- `touched` - object of keys for form fields that have values and have been blurred. This requires the `onBlur` handler be passed to each input.
- `errors` - object of validation errors

The `validations` argument is an object of validation functions.
Each validation function should return null for valid values and a string for invalid values. The first argument is the form input value; the second is the component props.


[MIT License](LICENSE.md)
