import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserAdd from './UserAdd'
import UserService from './services/User'

jest.mock('./services/User')

test('submits form successfully', async () => {
  UserService.create.mockResolvedValue({ status: 200 })
  
  render(<UserAdd setLisäystila={() => {}} setIsPositive={() => {}} setMessage={() => {}} setShowMessage={() => {}} />)
  
  fireEvent.change(screen.getByPlaceholderText('First name'), { target: { value: 'John' } })
  fireEvent.change(screen.getByPlaceholderText('Last name'), { target: { value: 'Doe' } })
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } })
  fireEvent.change(screen.getByPlaceholderText('Access level'), { target: { value: '2' } })
  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } })
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } })
  fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } })
  
  fireEvent.click(screen.getByText('save'))
  
  await waitFor(() => {
    expect(UserService.create).toHaveBeenCalledWith({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      accesslevelId: 2,
      username: 'johndoe',
      password: expect.any(String) // MD5-hashattu salasana
    })
  })
})