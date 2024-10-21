import React from "react";
import ErrorAlert from "./ErrorAlert";
import "../css/effectGoogle.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
function InputsContents({
  handleEvent,
  name,
  id,
  passwordView = false,
  errorEmail=null,
  errorCredential=null,
  errorEmailInUse=null,
  errorMinPassword=null,
  errorRequired=null,
  type,
  errorPassword=null,
  errorUsername=null,
  eventPassword=null,
}) {
  
  return (
    <>
      {type !== "password" ? (
        type === "email" ? (
          <div className='relative'>
            <input
              className={`border-b-1 bg-transparent z-10  w-96 focus:outline-none sele text-kenyan-copper-50 py-3 pl-3 ${
                errorEmail || errorEmailInUse || errorRequired
                  ? "border-red-600 focus:border-red-600"
                  : "focus:border-emerald-700 border-kenyan-copper-400"
              }`}
              onChange={handleEvent}
              name={name}
              autoComplete='email'
              id={id}
              required
              placeholder=' '
              type={type}
            />
            <label
              htmlFor={id}
              className={`absolute cursor-text  py-3 pl-1   z-20  opacity-70 left-0 ${
                errorEmail || errorEmailInUse
                  ? "text-red-600"
                  : "text-kenyan-copper-50"
              }`}
            >
              Introduce tu correo
            </label>
            <ErrorAlert typeError={errorRequired}>
              El correo es requerido
            </ErrorAlert>
            <ErrorAlert typeError={errorEmail}>Correo invalido, ingreselo nuevamente</ErrorAlert>
            <ErrorAlert typeError={errorEmailInUse}>
              El correo ya esta en uso, incia sesion o registrate con otro
            </ErrorAlert>
          </div>
        ) : (
          <div className='relative'>
            <input
              className={`border-b-1 bg-transparent z-10  w-96 focus:outline-none sele text-kenyan-copper-50 py-3 pl-3 ${
                errorUsername || errorRequired || errorRequired
                  ? "border-red-600 focus:border-red-600"
                  : "focus:border-emerald-700 border-kenyan-copper-400"
              }`}
              onChange={handleEvent}
              name={name}
              autoComplete='name'
              required
              id={id}
              placeholder=' '
              type={type}
            />
            <label
              htmlFor={id}
              className={`absolute cursor-text  py-3 pl-1   z-20  opacity-70 left-0 ${
                errorUsername || errorRequired
                  ? "text-red-600"
                  : "text-kenyan-copper-50"
              }`}
            >
              Introduce tu nombre de usuario
            </label>
            <ErrorAlert typeError={errorUsername}>Usuario ya en uso</ErrorAlert>
            <ErrorAlert typeError={errorRequired}>
              El usuario es requerido
            </ErrorAlert>
          </div>
        )
      ) : (
        <div className='relative'>
          <input
            className={`border-b-1  bg-transparent  w-96 focus:outline-none sele text-kenyan-copper-50 py-3 pl-3 ${
              errorPassword ||
              errorMinPassword ||
              errorCredential ||
              errorRequired
                ? "border-red-600 focus:border-red-600"
                : "focus:border-emerald-700 border-kenyan-copper-400"
            }`}
            onChange={handleEvent}
            name={name}
            required
            id={id}
            type={passwordView ? "password" : "text"}
            placeholder=' '
          />
          <label
            htmlFor={id}
            className={`absolute cursor-text py-3 pl-1 opacity-70 left-0 ${
              errorPassword ||
              errorMinPassword ||
              errorCredential ||
              errorRequired
                ? "text-red-600"
                : " text-kenyan-copper-50"
            }`}
          >
            Introduce tu contraseña
          </label>
          <div
            onClick={eventPassword}
            className='cursor-pointer absolute top-4 right-4 w-min'
          >
            {passwordView ? (
              <FaRegEyeSlash
                size={20}
                className={`${
                  errorPassword ||
                  errorMinPassword ||
                  errorCredential ||
                  errorRequired
                    ? "text-red-600"
                    : "text-kenyan-copper-400"
                } `}
              />
            ) : (
              <FaRegEye
                size={20}
                className={`${
                  errorPassword ||
                  errorMinPassword ||
                  errorCredential ||
                  errorRequired
                    ? "text-red-600"
                    : "text-kenyan-copper-400"
                } `}
              />
            )}
          </div>
          <ErrorAlert typeError={errorPassword}>
            Introduce la contraseña
          </ErrorAlert>
          <ErrorAlert typeError={errorRequired}>
            IIntroduce la contraseña
          </ErrorAlert>
          <ErrorAlert typeError={errorCredential}>
            Introduce la contraseña correctamente
          </ErrorAlert>
          <ErrorAlert typeError={errorMinPassword}>
            La contraseña debe ser minimo de 6 caracteres
          </ErrorAlert>
        </div>
      )}
    </>
  );
}

export default InputsContents;
