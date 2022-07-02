import { AppState, Auth0Provider } from "@auth0/auth0-react";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithHistory = ({
  children,
}: PropsWithChildren<any>): JSX.Element | null => {
  const navigate = useNavigate();

  const domain: string | undefined = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId: string | undefined = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience: string | undefined = process.env.REACT_APP_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState: AppState | undefined) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={process.env.REACT_APP_LOGIN_REDIRECT_URL}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};