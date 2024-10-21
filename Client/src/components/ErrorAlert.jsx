import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

function ErrorAlert({ typeError, children }) {
  return (
    <>
      {typeError && (
        <span className=" flex items-center text-xs gap-1 mt-1  text-red-700 opacity-90">
          <RiErrorWarningLine/>
          {children}
        </span>
      )}
    </>
  );
}

export default ErrorAlert;
