import React, { useState } from 'react'
import Input from '../../components/input'
import {
  CONTAINS_NUMBER_RULE,
  CONTAINS_SPECIAL_CHARACTER_RULE,
  CONTAINS_UPPERCASE_CHARACTER_RULE,
  NO_CONSECUTIVE_CHARACTERS_RULE
} from '../../components/input/input.constants'

import * as styles from './style.module.css'

const rulesConfig = {
  [CONTAINS_NUMBER_RULE]: 'Password must contain at least one number',
  [CONTAINS_SPECIAL_CHARACTER_RULE]:
    'Password must contain at least one of these special characters: !@#$%^&*',
  [CONTAINS_UPPERCASE_CHARACTER_RULE]:
    'Password must contain at least one uppercase letter',
  [NO_CONSECUTIVE_CHARACTERS_RULE]:
    'Password must not contain consecutive characters'
}

const LoginForm = () => {
  const rules = Object.keys(rulesConfig)
  const rulesConfigValues = Object.values(rulesConfig)
  const [passwordErrors, setPasswordErrors] = useState(rulesConfigValues)

  const handlePasswordErrors = (errors) => {
    setPasswordErrors(errors)
  }

  const renderValidationIcon = (condition) => {
    return condition ? '✅' : '❌'
  }

  return (
    <article className={styles.article}>
      <h2>Password Component</h2>
      <section className={styles.section}>
        <div>
          <Input
            type='password'
            rules={rules} // Pass the rules to the Input component as an array of strings
            showError={false} // Set this to true to show the error message as a label
            onError={handlePasswordErrors}
          />
        </div>
        <div className={styles['rules-list']}>
          {rules.map((rule) => (
            <div key={rule}>
              {renderValidationIcon(
                !passwordErrors.includes(rulesConfig[rule])
              )}{' '}
              {rulesConfig[rule]}
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}

export default LoginForm
