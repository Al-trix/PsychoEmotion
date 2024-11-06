import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import InputsContents from "./InputsContents";
import ErrorAlert from "../components/ErrorAlert";
import { Input, Button } from "@nextui-org/react";
import { FaUserSecret } from "react-icons/fa";

import { adminToken } from "../api/admin.js";

function LoginUser() {
  //!HOOKS DE REACT Y PERSONALIZADOS
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [tokenAdmin, setTokenAdmin] = useState(true);
  const [tokenMessageLabel, setTokenMessageLabel] = useState(null);
  const [token, setToken] = useState("");
  const [passwordView, setPasswordView] = useState(true);

  const { loginAdmin, error } = useAuth();

  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };
  //!-----------------------------------------------------------
  //! EVENTOS RESPECTIVOS
  const handleSubmitToken = async (e) => {
    e.preventDefault();

    try {
      const admin = await adminToken({ token });
      setTokenAdmin((prev) => !prev);
    } catch (err) {
      if (err.response.status === 404) {
        setTokenMessageLabel(err.response.data.message);
      }
    }
  };
  //!-----------------------------------------------------------
  const handleClickPassword = () => {
    setPasswordView(passwordView ? false : true);
  };
  //!-----------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginAdmin(user);
  };
  const errors = {
    errorEmailInUse: false,
    errorEmail: false,
    errorCredential: false,
    errorMinPassword: false,
    errorRequired: false,
  };

  if (error) {
    errors.errorEmail = error.map((errorItem) =>
      errorItem?.includes("email")
    )[0];
    errors.errorMinPassword = error.map((errorItem) =>
      errorItem?.includes("min-6-characters")
    )[0];
    errors.errorCredential = error.map((errorItem) =>
      errorItem?.includes("credential-invalid")
    )[0];

    errors.errorRequired = error.map((errorItem) =>
      errorItem?.includes("required")
    )[0];
  }

  return (
    <>
      {tokenAdmin ? (
        <div className='animation-translate  rounded-3xl relative z-20 -translate-x-36  translate-y-1/3   backdrop-blur-lg w-max mt-20'>
          <div className=' shadow-2xl border border-white/20 bg-black/80 shadow-black py-8 px-10 rounded-3xl'>
            <h3 className='text-2xl text-center   text-kenyan-copper-500 font-boldtext-kenyan-copper-500 font-bold  font-mono uppercase'>
              Introduce el token de Administradores{" "}
            </h3>
            <h6 className='text-sm text-center text-white/40'>
              Para poder iniciar sesion
            </h6>
            <form
              onSubmit={handleSubmitToken}
              className='w-3/5  mt-8 flex items-center mx-auto gap-8'
            >
              <div>
                <Input
                  type='password'
                  variant='underlined'
                  value={token} // Controla el valor del input
                  onChange={(e) => setToken(e.target.value)} // Actualiza el estado del token
                  label='Introduce el token'
                  isInvalid={!!tokenMessageLabel || !tokenAdmin} // Marca el input como inválido si hay error
                  errorMessage={
                    tokenMessageLabel || (!tokenAdmin && "Token inválido")
                  } // Muestra el mensaje de error si existe
                  className='max-w-xs' // Aplica clases fijas como ancho máximo
                  // Muestra el mensaje de error si existe
                />
              </div>

              <Button
                color='primary'
                className={`px-5 bg-kenyan-copper-800 `}
                type='submit'
                variant='shadow'
              >
                Enviar
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className='animation-out -translate-x-24 mt-20 rounded-3xl  z-20 relative  backdrop-blur-xl  w-max'>
          <div className='shadow-2xl border border-white/20 bg-black/80 shadow-black px-12 py-10 rounded-3xl'>
            <h3 className='text-2xl/relaxed w-full font-mono uppercase'>
              <span className='text-kenyan-copper-500 font-bold'>
                Inicia sesion{" "}
              </span>
              para continuar
            </h3>
            <h6 className='text-xs text-white/40'>
              Recuedrda que este apartado es privado.{" "}
            </h6>
            <section className=''>
              <form
                onSubmit={handleSubmit}
                className='relative w-min  pb-3 flex flex-col mt-6 gap-5'
              >
                <InputsContents
                  handleEvent={handleChange}
                  id={"email"}
                  name={"email"}
                  errorEmail={errors.errorEmail}
                  errorRequired={errors.errorRequired}
                  type={"email"}
                />
                <InputsContents
                  handleEvent={handleChange}
                  id={"password"}
                  name={"password"}
                  errorMinPassword={errors.errorMinPassword}
                  errorCredential={errors.errorCredential}
                  errorRequired={errors.errorRequired}
                  type={"password"}
                  passwordView={passwordView}
                  eventPassword={handleClickPassword}
                />
                <div className='flex justify-between items-center'>
                  <Button
                    type='submit'
                    size='lg'
                    color='primary'
                    isDisabled={user.email === "" || user.password === ""}
                    className='bg-kenyan-copper-800 '
                  >
                    Continuar
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginUser;
