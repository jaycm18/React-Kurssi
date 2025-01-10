import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom' // Lisätty import-lauseke
import UserAdd from './UserAdd'

test('renders UserAdd component', () => {
  render(<UserAdd setLisäystila={() => {}} setIsPositive={() => {}} setMessage={() => {}} setShowMessage={() => {}} />)
  
  // Tarkista, että lomakekentät renderöityvät oikein
  expect(screen.getByPlaceholderText('First name')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Access level')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument()
})

test('shows error message when passwords do not match', () => {
  render(<UserAdd setLisäystila={() => {}} setIsPositive={() => {}} setMessage={() => {}} setShowMessage={() => {}} />)
  
  const passwordInput = screen.getByPlaceholderText('Password')
  const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
  
  fireEvent.change(passwordInput, { target: { value: 'password123' } })
  fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } })
  
  expect(screen.getByText('Salasanat eivät täsmää')).toBeInTheDocument()
})