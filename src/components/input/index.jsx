import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  ALLOWED_RULES,
  CONTAINS_NUMBER_RULE,
  CONTAINS_SPECIAL_CHARACTER_RULE,
  CONTAINS_UPPERCASE_CHARACTER_RULE,
  LONG_ENOUGH_RULE,
  NO_CONSECUTIVE_CHARACTERS_RULE
} from './input.constants'
import * as styles from './style.module.css'

const Input = ({
  label,
  type = 'text',
  showError = true,
  rules = [LONG_ENOUGH_RULE],
  minCharacters = 8,
  onError = () => {},
  onChange,
  ...props
}) => {
  const [localErrors, setLocalErrors] = useState([])

  /**
   * The function `handleErrors` checks a given password against a set of rules and generates error
   * messages based on rule violations.
   */
  const handleErrors = (localValue) => {
    const errors = []
    rules.forEach((rule) => {
      switch (rule) {
        case LONG_ENOUGH_RULE:
          if (localValue.length < minCharacters) {
            errors.push(
              `Password must be at least ${minCharacters} characters long`
            )
          }
          break
        case CONTAINS_NUMBER_RULE:
          if (!/\d/.test(localValue)) {
            errors.push('Password must contain at least one number')
          }
          break
        case CONTAINS_SPECIAL_CHARACTER_RULE:
          if (!/[!@#$%^&*]+/.test(localValue)) {
            errors.push(
              'Password must contain at least one of these special characters: !@#$%^&*'
            )
          }
          break
        case CONTAINS_UPPERCASE_CHARACTER_RULE:
          if (!/[A-Z]+/.test(localValue)) {
            errors.push('Password must contain at least one uppercase letter')
          }
          break
        case NO_CONSECUTIVE_CHARACTERS_RULE:
          if (/(\w)\1{1,}/.test(localValue)) {
            errors.push('Password must not contain consecutive characters')
          }
          break
        default:
          break
      }
    })
    setLocalErrors(errors)
    onError(errors)
  }

  const handleChange = (e) => {
    const { value: localValue } = e.target
    if (type === 'password') {
      handleErrors(localValue)
    }
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className={styles['input-container']}>
      {label && <label>{label}</label>}
      <input type={type} onChange={handleChange} {...props} role='textbox' />
      {showError &&
        localErrors.length > 0 &&
        localErrors.map((error) => (
          <label className={styles['error-label']} key={error}>
            {error}
          </label>
        ))}
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  showError: PropTypes.bool,
  rules: PropTypes.arrayOf(PropTypes.oneOf(ALLOWED_RULES)),
  minCharacters: PropTypes.number,
  onError: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
}

export default Input
