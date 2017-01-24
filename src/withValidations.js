
import React from 'react'

const withValidations = (validations = {}) => (Component) => {
  class FormComponent extends React.Component {
    constructor () {
      super()
      this.state = {
        touched: {},
        errors: {}
      }
      this.onBlur = this.onBlur.bind(this)
      this.validate = this.validate.bind(this)
    }

    onBlur (e) {
      const { name } = e.target
      const { touched } = this.state

      if (this.props[name] && this.props[name].length) {
        touched[name] = true
        this.setState({ touched })
        this.validate(this.props)
      }
    }

    validate (props) {
      const errors = {}
      for (let key in validations) {
        const touched = this.state.touched[key]

        if (!touched) continue

        const validator = validations[key]
        const value = props[key]
        errors[key] = validator(value, props)
      }
      this.setState({ errors })
    }

    componentWillReceiveProps (nextProps) {
      this.validate(nextProps)
    }

    render () {
      return (
        <Component
          {...this.props}
          {...this.state}
          onBlur={this.onBlur}
        />
      )
    }
  }

  return FormComponent
}

export default withValidations

