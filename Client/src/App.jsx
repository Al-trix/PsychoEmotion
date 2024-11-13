import React from "react";
import TypeUserL from "./pages/TypeUserL";
import TypeUserR from "./pages/TypeUserR";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/authContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProtectedUser from "./components/ProtectedUser";
import Register from "./components/RegisterUser";
import { bouncy } from "ldrs";
import AboutUs from "./pages/AboutUs";
import AnalysisSurvey from "./pages/AnalysisSurvey";
import CrudQuestions from "./pages/CrudQuestions";
import InfoProyect from "./pages/InfoProyect";

function App() {
  const { user, loading, userAdmin } = useAuth();
  bouncy.register();

  if (loading)
    return (
      <div className='flex w-full h-lvh  justify-center items-center'>
        <l-bouncy size='80' speed='1.4' color='#288'></l-bouncy>
      </div>
    );
  return (
    <Routes>
      {userAdmin ? (
        <Route
          path='/'
          element={
            <ProtectedUser>
              <Header home>
                <CrudQuestions />
              </Header>
            </ProtectedUser>
          }
        />
      ) : (
        <Route
          path='/'
          element={
            <ProtectedUser>
              <Header home>
                <Home />
              </Header>
            </ProtectedUser>
          }
        />
      )}

      <Route
        path='/AnalysisSurvey'
        element={
          <ProtectedUser>
            <Header>
              <AnalysisSurvey />
            </Header>
          </ProtectedUser>
        }
      />
      <Route
        path='/info'
        element={
          <ProtectedUser>
            <Header>
              <InfoProyect />
            </Header>
          </ProtectedUser>
        }
      />

      <Route
        path='/aboutus'
        element={
          <Header>
            <AboutUs />
          </Header>
        }
      />
      {!user && !userAdmin && (
        <>
          <Route
            path='/login'
            element={
              <Header>
                <TypeUserL />
              </Header>
            }
          />

          <Route
            path='/signup'
            element={
              <Header>
                <TypeUserR />
              </Header>
            }
          />
        </>
      )}

      <Route path='/*' element='Not found' />
    </Routes>
  );
}

export default App;
