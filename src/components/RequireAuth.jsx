import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import { useSelector } from "react-redux";

export default function RequireAuth({ children }) {
  const { data, loading } = useSelector((store) => store.user);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!data?.id) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
