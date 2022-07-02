import { useAuth0 } from "@auth0/auth0-react";
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WelcomePage from '../pages/welcome';

jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = jest.mocked(useAuth0, true);
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));

describe('Non-protected routes', () => {
    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: false,
            isLoading: false,
        });
    });

    test('renders login and signup buttons', async () => {
        render(<WelcomePage />);
        const loginButton = screen.getByText(/Log In/i);
        const signupButton = screen.getByText(/Sign Up/i);
        expect(loginButton).toBeInTheDocument();
        expect(signupButton).toBeInTheDocument();
    })
    
});

