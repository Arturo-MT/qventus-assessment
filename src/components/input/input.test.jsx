import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from './index'
import {
  CONTAINS_NUMBER_RULE,
  CONTAINS_SPECIAL_CHARACTER_RULE,
  CONTAINS_UPPERCASE_CHARACTER_RULE,
  LONG_ENOUGH_RULE,
  NO_CONSECUTIVE_CHARACTERS_RULE
} from './input.constants'

describe('Input', () => {
  test('renders correctly', () => {
    const { getByRole } = render(<Input label='Test' />)
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  test('handles input change', async () => {
    const { getByRole } = render(<Input type='password' />)
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })

    await waitFor(() => {
      expect(input.value).toBe('test')
    })
  })

  test('validates password length', async () => {
    const { getByRole, findByText } = render(
      <Input
        type='password'
        showError
        rules={[LONG_ENOUGH_RULE]}
        minCharacters={5}
      />
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })

    const error = await findByText(
      'Password must be at least 5 characters long'
    )
    expect(error).toBeInTheDocument()
  })

  test('validates password length and clears error', async () => {
    const handleError = jest.fn()
    const { getByRole } = render(
      <Input
        type='password'
        showError
        rules={[LONG_ENOUGH_RULE]}
        minCharacters={5}
        onError={handleError}
      />
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([
        'Password must be at least 5 characters long'
      ])
    })

    fireEvent.change(input, { target: { value: 'testtest' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([])
    })
  })

  test('validates password contains number', async () => {
    const { getByRole, findByText } = render(
      <Input
        type='password'
        showError
        rules={[LONG_ENOUGH_RULE, CONTAINS_NUMBER_RULE]}
        minCharacters={5}
      />
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'testtest' } })

    const error = await findByText('Password must contain at least one number')
    expect(error).toBeInTheDocument()
  })

  test('validates password contains number and clears error', async () => {
    const handleError = jest.fn()
    const { getByRole } = render(
      <Input
        type='password'
        showError
        rules={[LONG_ENOUGH_RULE, CONTAINS_NUMBER_RULE]}
        minCharacters={5}
        onError={handleError}
      />
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([
        'Password must be at least 5 characters long',
        'Password must contain at least one number'
      ])
    })

    fireEvent.change(input, { target: { value: 'test1test' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([])
    })
  })

  test('validates password contains special character', async () => {
    const { getByRole, findByText } = render(
      <Input
        type='password'
        showError
        rules={[LONG_ENOUGH_RULE, CONTAINS_SPECIAL_CHARACTER_RULE]}
        minCharacters={5}
      />
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'testtest' } })

    const error = await findByText(
      'Password must contain at least one special character'
    )
    expect(error).toBeInTheDocument()
  })

  test('validates password contains special character and clears error', async () => {
    const handleError = jest.fn()
    const { getByRole } = render(
      <Input
        type='password'
        showError
        rules={[LONG_ENOUGH_RULE, CONTAINS_SPECIAL_CHARACTER_RULE]}
        minCharacters={5}
        onError={handleError}
      />
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([
        'Password must be at least 5 characters long',
        'Password must contain at least one special character'
      ])
    })

    fireEvent.change(input, { target: { value: 'test*test' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([])
    })
  })

  test('validates password contains uppercase character', async () => {
    const { getByRole, findByText } = render(
      <Input
        type='password'
        showError
        rules={[LONG_ENOUGH_RULE, CONTAINS_UPPERCASE_CHARACTER_RULE]}
        minCharacters={5}
      />
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'testtest' } })

    const error = await findByText(
      'Password must contain at least one uppercase letter'
    )
    expect(error).toBeInTheDocument()
  })

  test('validates password contains uppercase character and clears error', async () => {
    const handleError = jest.fn()
    const { getByRole } = render(
      <Input
        type='password'
        showError
        rules={[LONG_ENOUGH_RULE, CONTAINS_UPPERCASE_CHARACTER_RULE]}
        minCharacters={5}
        onError={handleError}
      />
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([
        'Password must be at least 5 characters long',
        'Password must contain at least one uppercase letter'
      ])
    })

    fireEvent.change(input, { target: { value: 'testTest' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([])
    })
  })

  test('validates password not contain consecutive characters', async () => {
    const { getByRole, findByText } = render(
      <Input
        type='password'
        showError
        rules={[LONG_ENOUGH_RULE, NO_CONSECUTIVE_CHARACTERS_RULE]}
        minCharacters={5}
      />
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'aaatest' } })

    const error = await findByText(
      'Password must not contain consecutive characters'
    )
    expect(error).toBeInTheDocument()
  })

  test('validates password not contain consecutive characters and clears error', async () => {
    const handleError = jest.fn()
    const { getByRole } = render(
      <Input
        type='password'
        showError
        rules={[LONG_ENOUGH_RULE, NO_CONSECUTIVE_CHARACTERS_RULE]}
        minCharacters={5}
        onError={handleError}
      />
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'ttt' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([
        'Password must be at least 5 characters long',
        'Password must not contain consecutive characters'
      ])
    })

    fireEvent.change(input, { target: { value: 'testTest' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([])
    })
  })

  test('validates password with all rules', async () => {
    const handleError = jest.fn()
    const { getByRole } = render(
      <Input
        type='password'
        showError
        rules={[
          LONG_ENOUGH_RULE,
          CONTAINS_NUMBER_RULE,
          CONTAINS_SPECIAL_CHARACTER_RULE,
          CONTAINS_UPPERCASE_CHARACTER_RULE,
          NO_CONSECUTIVE_CHARACTERS_RULE
        ]}
        minCharacters={5}
        onError={handleError}
      />
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'ttt' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([
        'Password must be at least 5 characters long',
        'Password must contain at least one number',
        'Password must contain at least one special character',
        'Password must contain at least one uppercase letter',
        'Password must not contain consecutive characters'
      ])
    })
  })

  test('validates password with all rules and clears error', async () => {
    const handleError = jest.fn()
    const { getByRole } = render(
      <Input
        type='password'
        showError
        rules={[
          LONG_ENOUGH_RULE,
          CONTAINS_NUMBER_RULE,
          CONTAINS_SPECIAL_CHARACTER_RULE,
          CONTAINS_UPPERCASE_CHARACTER_RULE,
          NO_CONSECUTIVE_CHARACTERS_RULE
        ]}
        minCharacters={5}
        onError={handleError}
      />
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'ttt' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([
        'Password must be at least 5 characters long',
        'Password must contain at least one number',
        'Password must contain at least one special character',
        'Password must contain at least one uppercase letter',
        'Password must not contain consecutive characters'
      ])
    })

    fireEvent.change(input, { target: { value: 'testTest1*' } })

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith([])
    })
  })
})
