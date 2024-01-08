import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

jest.mock('next/link', () => {
    return ({ children }: { children: React.ReactNode }) => children;
});

const pushMock = jest.fn();

describe('Navigation bar', () => {

    beforeEach(() => {
        jest.mock('next/router', () => ({
            useRouter: () => ({
                push: pushMock,
            }),
        }));

        render(<Navbar />);
    })

    it('Should render all the navigation links', () => {
        const aboutLink = screen.getAllByText('About')
        const detectLink = screen.getAllByText('Detect')
        const loginLink = screen.getAllByText('Login')

        expect(aboutLink).toHaveLength(2)
        expect(detectLink).toHaveLength(2)
        expect(loginLink).toHaveLength(2)
    })

    it('Should navigate to about page', () => {
        const aboutLink = screen.getAllByText('About')
        aboutLink.forEach(link => {
            if(link.classList.contains('block')) {
                fireEvent.click(link);
                expect(pushMock).toHaveBeenCalledWith('/about');
                expect(link.classList.contains('active'))
            }
        })
    })

    it('Should navigate to detect page', () => {
        const aboutLink = screen.getAllByText('Detect')
        aboutLink.forEach(link => {
            if(link.classList.contains('block')) {
                fireEvent.click(link);
                expect(pushMock).toHaveBeenCalledWith('/detect');
                expect(link.classList.contains('active'))
            }
        })
    })

    it('Should navigate to login page', () => {
        const aboutLink = screen.getAllByText('Login')
        aboutLink.forEach(link => {
            if(link.classList.contains('block')) {
                fireEvent.click(link);
                expect(pushMock).toHaveBeenCalledWith('/login');
                expect(link.classList.contains('active'))
            }
        })
    })
})