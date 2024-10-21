import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import InputsContents from "./InputsContents";
import { Input, Button } from "@nextui-org/react";
import { adminToken } from "../api/admin.js";

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
        <div className='w-full h-3/4 text-center items-center justify-center flex flex-col'>
          <h3 className='text-3xl text-kenyan-copper-500 font-bold font-mono lg:mt-14 uppercase w-11/12'>
            Introduce el token de Administradores
          </h3>
          <h6 className='text-md mt-1 text-white/40'>
            Para poder iniciar sesión
          </h6>
          <form
            onSubmit={handleSubmitToken}
            className='w-3/2 mt-8 flex items-center gap-8'
          >
            <Input
              type='password'
              variant='underlined'
              value={token}
              onChange={(e) => setToken(e.target.value)}
              label='Introduce el token'
              errorMessage={tokenMessageLabel}
              className={`max-w-xs ${
                tokenMessageLabel || !tokenAdmin
                  ? "border-red-500 text-red-500"
                  : ""
              }`}
              color={tokenMessageLabel || !tokenAdmin ? "danger" : "default"}
            />
            <Button
              color='primary'
              className={`px-5 bg-kenyan-copper-800`}
              type='submit'
              variant='shadow'
            >
              Enviar
            </Button>
          </form>
        </div>
      ) : (
        <div className='lg:ml-20 px-10 py-16 lg:py-0'>
          <h3 className='text-4xl font-mono lg:mt-14 uppercase w-11/12'>
            <span className='text-kenyan-copper-500 font-bold'>
              Regístrate{" "}
            </span>
            para continuar
          </h3>
          <h6 className='text-md mt-1 text-white/40'>
            Introduce los datos pedidos
          </h6>
          <section>
            <form
              onSubmit={handleSubmit}
              className='relative w-min border-b pb-3 flex flex-col mt-3 gap-5'
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
      )}
    </>
  );
}

export default RegisterAdmin;
