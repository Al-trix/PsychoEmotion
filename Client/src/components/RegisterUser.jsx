import React, { useContext, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Button, Image } from "@nextui-org/react";

import InputsContents from "./InputsContents";

function RegisterUser() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };
  const [passwordView, setPasswordView] = useState(false);

  const navigate = useNavigate();

  const handleClickPassword = () => {
    setPasswordView(passwordView ? false : true);
  };

  const handeleNavigate = () => {
    navigate("/login");
  };

  const { singup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await singup(user.email, user.password);

      navigate("/login");
    } catch (err) {
      setError(err);
    }
  };
  const errorEmailInUse = error && error?.code?.includes("email-already-in-use");
  const errorEmail = error && error?.code?.includes("email");
  const errorMinPassword = error && error?.code?.includes("weak-password");
  const errorPassword = error && error?.code?.includes("missing-password");

  return (
    <section className='font-mono justify-center  lg:justify-between rounded-lg  mt-4 flex w-full '>
      <form
        onSubmit={handleSubmit}
       
      >
        <div className='lg:ml-24 px-10 py-16 lg:py-0 relative w-min pb-3 flex flex-col mt-3 gap-5'>
          <h3 className='text-4xl font-mono lg:mt-14 uppercase w-11/12'>
            <span className='text-kenyan-copper-500 font-bold'>
              Registrate{" "}
            </span>
            para continuar
          </h3>
          <h6 className='text-md text-white/40'>
            Introduce un correo y contraseña validos
          </h6>
          <InputsContents
            handleEvent={handleChange}
            id={"email"}
            name={"email"}
            errorEmail={errorEmail}
            errorPassword={errorPassword}
            errorEmailInUse={errorEmailInUse}
            type={"email"}
          />
          <InputsContents
            handleEvent={handleChange}
            errorMinPassword={errorMinPassword}
            id={"password"}
            name={"password"}
            errorEmail={errorEmail}
            errorPassword={errorPassword}
            type={"password"}
            passwordView={passwordView}
            eventPassword={handleClickPassword}
          />

          <div className='relative flex justify-between items-center'>
            <Button
              color='primary'
              onClick={handleSubmit}
              isDisabled={user.email === "" || user.password === ""}
              className='bg-kenyan-copper-800 w-96 disabled:bg-gray-900 disabled:opacity-40'
            >
              Continuar
            </Button>
          </div>
        </div>
        <div className=' text-center mt-8 '>
          <p>
            ¿Ya tienes una cuenta?{" "}
            <a
              onClick={handeleNavigate}
              className='text-xs cursor-pointer  underline underline-offset-2 hover:opacity-40 font-light text-gray-300'
            >
              Inicia sesion
            </a>
          </p>
        </div>
      </form>
    </section>
  );
}

export default RegisterUser;
