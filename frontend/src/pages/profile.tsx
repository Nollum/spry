import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Loading from "../components/loader";
import Nav from "../components/nav";

export const ProfilePage = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />
  }

  if (!user) {
    return null;
  };

  return (
      <div className="profile">
        <Nav />
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
  );
};

export default ProfilePage;
