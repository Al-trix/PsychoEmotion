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

      navigate("/");
    } catch (err) {
      setError(err);
    }
  };
  const errorEmailInUse =
    error && error?.code?.includes("email-already-in-use");
  const errorEmail = error && error?.code?.includes("email");
  const errorMinPassword = error && error?.code?.includes("weak-password");
  const errorPassword = error && error?.code?.includes("missing-password");

  return (
    <div className='translate-x-52 animation-out translate-y-3  rounded-3xl z-20 relative  backdrop-blur-xl  w-max'>
      <div className=' shadow-2xl  border border-white/20 bg-black/70 shadow-black px-12 py-10 rounded-3xl'>
        <h3 className='text-2xl/relaxed w-full font-mono uppercase'>
          <span className='text-kenyan-copper-500 font-bold'>Registrate </span>
          para continuar
        </h3>
        <h6 className='text-xs text-white/40'>
          Introduce un correo y contraseña validos
        </h6>
        <section>
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
            <div>
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
        <div className='w-full mt-3 align-center flex justify-center gap-3 h-full'>
          {" "}
          <span className='w-1/2 h-px my-auto bg-white '></span> o{" "}
          <span className='w-1/2 h-px my-auto bg-white '></span>{" "}
        </div>

        <div className=' text-center my-3 '>
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
      </div>
    </div>
  );
}

export default RegisterUser;
