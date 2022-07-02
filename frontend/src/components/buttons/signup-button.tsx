import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'semantic-ui-react';

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button secondary onClick={() => loginWithRedirect({ action: 'signup' })}>Sign Up</Button>
  );
};

export default SignupButton;