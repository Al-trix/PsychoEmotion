import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Link({
  name = null,
  border = false,
  href,
  menu = false,
  responsing = false,
}) {
  const { user } = useAuth();
  return (
    <NavLink
      to={menu ? (!user ? "/login" : href) : href}
      className={
        responsing
          ? "block bg-transparent duration-500 hover:bg-kenyan-copper-800 pl-1 py-1 text-white transition-colors rounded-md"
          : ({ isActive }) =>
              isActive
                ? border
                  ? "  duration-500 px-4 py-2 text-white  bg-kenyan-copper-800 transition-colors rounded-md "
                  : "border-b-2 border-kenyan-copper-700 pb-2 hover:text-kenyan-copper-400  px-3 py-2 rounded-t-md    text-white inline-block"
                : border
                ? ` bg-transparent duration-400 hover:bg-kenyan-copper-700 border-kenyan-copper-700 px-4 py-2 text-white  bg-kenyan-copper-800 transition-colors rounded-md border`

                : "  text-kenyan-copper-50 hover:text-kenyan-copper-300 px-2 py-2 transition-colors duration-500 rounded-lg animate-pulse  "
      }
    >
      {name}
    </NavLink>
  );
}

export default Link;
