import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Homepage from '@/app/page'
import { useRouter } from 'next/navigation'

jest.mock("next/navigation")

describe('Home page', () => {

  it('Should check if each h1 contains correct text', () => {
    render(<Homepage />)

    const headings = screen.getAllByRole('heading', { level: 1 })
    const expectedTexts = 
    [
      'Welcome to Audio Deepfake Detection', 
      'We provide a quick and easy way for you to detect deepfake audios.',
      'We work with Singapore HTX, providing a range of models for you to choose from.'
    ]

    headings.forEach((header, index) => {
      expect(header).toHaveTextContent(expectedTexts[index])
    })
  })

  it('Should redirect to the detect page', () => {
    
    const pushMock = jest.fn();
    
    (useRouter as jest.Mock).mockImplementation(() => ({
      route: '/',
      prefetch: () => null,
      push: pushMock,
    }));

    render(<Homepage />)

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/detect');
  })
})