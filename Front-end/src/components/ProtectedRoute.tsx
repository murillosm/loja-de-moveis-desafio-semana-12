import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;