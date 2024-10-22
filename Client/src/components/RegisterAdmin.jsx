import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import InputsContents from "./InputsContents";
import { Input, Button } from "@nextui-org/react";
import { adminToken } from "../api/admin.js";
import "../css/animationAuth.css";


function RegisterAdmin() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };
  const [passwordView, setPasswordView] = useState(false);
  const [tokenAdmin, setTokenAdmin] = useState(true);
  const [tokenMessageLabel, setTokenMessageLabel] = useState(null);
  const [token, setToken] = useState("");

  const { registerAdmin, error } = useAuth();

  const handleClickPassword = () => {
    setPasswordView(passwordView ? false : true);
  };
  const handleSubmitToken = async (e) => {
    e.preventDefault();
    try {
      const admin = await adminToken({ token });
      setTokenAdmin(false);
      setTokenMessageLabel(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setTokenMessageLabel(err.response.data.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerAdmin(user);
  };

  const errors = {
    errorEmailInUse: false,
    errorEmail: false,
    errorMinPassword: false,
    errorUserExistent: false,
    errorRequired: false,
  };

  if (error) {
    errors.errorEmailInUse = error.map((errorItem) =>
      errorItem?.includes("email-in-use")
    )[0];
    errors.errorEmail = error.map((errorItem) =>
      errorItem?.includes("email-invalid")
    )[0];
    errors.errorMinPassword = error.map((errorItem) =>
      errorItem?.includes("min-6-characters")
    )[0];
    errors.errorUserExistent = error.map((errorItem) =>
      errorItem?.includes("user-existent")
    )[0];
    errors.errorRequired = error.map((errorItem) =>
      errorItem?.includes("required")
    )[0];
  }

  return (
    <>
      {tokenAdmin ? (
        <div className='animation-in  rounded-3xl relative z-20 translate-x-36  translate-y-1/3   backdrop-blur-lg w-max'>
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
        <div className='animation-bottom rounded-3xl translate-x-64 translate-y-6  z-20 relative  backdrop-blur-xl  w-max'>
          <div className='shadow-2xl border border-white/20 bg-black/90 shadow-black px-12 py-10 rounded-3xl'>
            <h3 className='text-2xl/relaxed w-full font-mono uppercase'>
              <span className='text-kenyan-copper-500 font-bold'>
                Regístrate{" "}
              </span>
              para continuar
            </h3>
            <h6 className='text-xs  text-white/40'>
              Introduce los datos pedidos
            </h6>
            <section>
              <form
                onSubmit={handleSubmit}
                className='relative w-min  pb-3 flex flex-col mt-6 gap-5'
              >
                <InputsContents
                  errorRequired={errors.errorRequired}
                  handleEvent={handleChange}
                  id='username'
                  name='username'
                  errorUsername={errors.errorUserExistent}
                  type='text'
                />
                <InputsContents
                  errorRequired={errors.errorRequired}
                  handleEvent={handleChange}
                  id='email'
                  errorEmail={errors.errorEmail}
                  errorEmailInUse={errors.errorEmailInUse}
                  name='email'
                  type='email'
                />
                <InputsContents
                  errorRequired={errors.errorRequired}
                  handleEvent={handleChange}
                  id='password'
                  name='password'
                  type='password'
                  errorMinPassword={errors.errorMinPassword}
                  passwordView={passwordView}
                  eventPassword={handleClickPassword}
                />
                <div className='flex justify-between items-center'>
                  <Button
                    type='submit'
                    size='lg'
                    color='primary'
                    isDisabled={user.email === "" || user.password === ""}
                    className='bg-kenyan-copper-800 disabled:bg-gray-900 disabled:opacity-40'
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

export default RegisterAdmin;
