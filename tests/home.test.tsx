import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Page from '../app/page'

vi.mock('@clerk/nextjs/server', () => {
  return {
    auth: () =>
      Promise.resolve({ userId: null }), // Mock as null to see the landing page
  }
})

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  }
})

vi.mock('next/navigation', () => {
  return {
    redirect: vi.fn(),
  }
})

test(`Home`, async () => {
  render(await Page())
  expect(screen.getByText(/Understand your/i)).toBeTruthy()
  expect(screen.getByText(/Project Mood/i)).toBeTruthy()
})