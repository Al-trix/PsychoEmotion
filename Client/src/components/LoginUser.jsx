import React, { useContext, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import InputsContents from "./InputsContents";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@nextui-org/react";

function LoginUser() {
  //!HOOKS DE REACT Y PERSONALIZADOS
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
  const [passwordView, setPasswordView] = useState(true);
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  //!-----------------------------------------------------------
  //!-----------------------------------------------------------
  //! EVENTOS RESPECTIVOS
  const handleGoogleSingin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  //!-----------------------------------------------------------
  const handleClickPassword = () => {
    setPasswordView(passwordView ? false : true);
  };
  //!-----------------------------------------------------------
  const handeleNavigate = () => {
    navigate("/signup");
  };
  //!-----------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  //!-----------------------------------------------------------
  const errorEmail = error && error.code.includes("email");
  const errorCredential = error && error.code.includes("credential");
  const errorPassword = error && error.code.includes("password");

  return (
    <div className='animation-bottom mr-48 mt-8 rounded-3xl  z-20 relative  backdrop-blur-xl  w-max'>
      <div className='  shadow-2xl border border-white/20 bg-black/70 px-12 py-10 shadow-black  rounded-3xl'>
        <h3 className='text-2xl/relaxed w-full font-mono uppercase '>
          <span className='text-kenyan-copper-400 font-bold'>
            Inicia sesion{" "}
          </span>
          para continuar
        </h3>
        <h6 className='text-xs text-white/40'>
          Introduce los datos solicitados.
        </h6>
        <section className=''>
          <form
            onSubmit={handleSubmit}
            className='relative w-min  flex flex-col mt-6 gap-7'
          >
            <InputsContents
              handleEvent={handleChange}
              id={"email"}
              name={"email"}
              errorEmail={errorEmail}
              errorPassword={errorPassword}
              errorCredential={errorCredential}
              type={"email"}
            />
            <InputsContents
              handleEvent={handleChange}
              id={"password"}
              name={"password"}
              errorEmail={errorEmail}
              errorPassword={errorPassword}
              errorCredential={errorCredential}
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
                className='bg-kenyan-copper-800 disabled:bg-gray-900 disabled:opacity-40'
              >
                Continuar
              </Button>
              <a
                className='text-xs underline underline-offset-2 hover:opacity-40 font-light text-gray-300'
                href=''
              >
                Olvidaste tu contraseña?
              </a>
            </div>
          </form>
          <div className='w-full mt-3 align-center flex justify-center gap-3 h-full'>
            {" "}
            <span className='w-1/2 h-px my-auto bg-white '></span> o{" "}
            <span className='w-1/2 h-px my-auto bg-white '></span>{" "}
          </div>
          <div className='w-full flex align-center'>
            <Button
              onClick={handleGoogleSingin}
              color='primary'
              radius='sm'
              className='mt-5 bg-white shadow-xl w-10/12 mx-auto py-5 '
            >
              <FcGoogle size={30} />
              <span className=' text-lg text-black  font-medium'>Google</span>
            </Button>
          </div>

          <div className='text-sm text-center  w-96 my-7 '>
            <p>
              ¿No tienes una cuenta?{" "}
              <span
                onClick={handeleNavigate}
                className='underline text-kenyan-copper-100 font-sans cursor-pointer'
              >
                Registrate
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginUser;
