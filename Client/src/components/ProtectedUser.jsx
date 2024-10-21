import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { surveyResponsedUser } from "../api/surveyResponse.js";
import { bouncy } from "ldrs";

function ProtectedUser({ children }) {
  const { user, loading, responsedSurvey, userAdmin } = useAuth();

  bouncy.register();

  if (loading) {
    return (
      <div className='flex w-full h-lvh justify-center items-center'>
        <l-bouncy size='80' speed='1.2' color='#288'></l-bouncy>
      </div>
    );
  }
  // Llamada a la API en un useEffect para ejecutarse solo cuando el componente se monta
  
  if (!user && !userAdmin) return <Navigate to='/login' />;
  if (user && userAdmin) return <Navigate to='/' />;
  useEffect(() => {
    const datesUser = async () => {
      try {
        const surveyAnswered = await surveyResponsedUser({ userId: user.uid });
        responsedSurvey(true); // Usuario ha respondido la encuesta
      } catch (error) {
        if (error.response && error.response.status === 400) {
          responsedSurvey(false); // Usuario no ha respondido la encuesta
        }
      }
    };

    if (user) {
      datesUser(); // Solo llamar a la API si el usuario está autenticado
    }
  }, [user]); // Solo se ejecuta cuando 'user' cambia


  return <>{children}</>;
}

export default ProtectedUser;
