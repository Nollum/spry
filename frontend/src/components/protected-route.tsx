import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import Loader from "./loader";

interface ProtectedRouteProps {
  component: ComponentType;
}

const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Loader />,
  });

  return <Component />;
};

export default ProtectedRoute;