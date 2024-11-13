import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UsersTable from "../components/users/UsersTable";

export default function UsersPage() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser)
  // Redirect if user accesses page directly via url and does not have permissions 
  // (This is mainly for usability, authorization is of course handled by the api)
  if (typeof loggedInUser.perms !== 'undefined' ) {
    if ( typeof loggedInUser.perms.users === 'undefined' || loggedInUser.user.Role === 'role::superadmin' || loggedInUser.user.Role === 'role::user'|| loggedInUser.user.Role === 'role::npuser') {
      return <Navigate to="/" replace />
    }
  }
  return (
    <UsersTable/>
  );
}
