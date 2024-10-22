import React, { useState, createElement } from "react";
import { useNavigate } from "react-router-dom";
import { RiUserFill, RiAdminFill } from "react-icons/ri";

import { Select, SelectItem, Image } from "@nextui-org/react";
import "../css/homeStyles.css";
import "../css/animationAuth.css";
import RegisterUser from "../components/RegisterUser";
import RegisterAdmin from "../components/RegisterAdmin";
function TypeUserR() {
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  const x = "";
  const handlerChange = (e) => {
    setValue(e.target.value);
  };

  const typesUsers = [
    {
      key: "user",
      label: "Usuario",
    },
    {
      key: "admin",
      label: "Administrador",
    },
  ];

  return (
    <section
      className={` font-mono justify-center relative flex ${
        value ? "flex-row" : "flex-row-reverse"
      } lg:justify-between  rounded-lg mt-4  w-full `}
    >
      <div className='w-full basis-3/6'>
        {value !== null ? (
          value.anchorKey === "user" ? (
            <RegisterUser />
          ) : (
            <RegisterAdmin />
          )
        ) : (
          <div className='animation-translate  -translate-y-1/5 -translate-x-32 rounded-3xl  z-20 relative bg-black/80 backdrop-blur-lg  w-full '>
            <div className=' mt-28 mx-auto py-8 text-center shadow-2xl border border-white/20  shadow-black p-6 rounded-3xl'>
              <h3 className='text-3xl  uppercase '>
                Elije el usuario a{" "}
                <span className='text-kenyan-copper-500 font-bold'>
                  registrar
                </span>
              </h3>
              <h6 className='text-xs text-white/40'>
                Recuerda elegir correctamente
              </h6>
              <Select
                items={typesUsers}
                selectedKeys={value}
                color='primary'
                variant='underlined'
                className=' w-2/3 mx-auto mt-8 shadow-2xl text-white'
                size='xl'
                placeholder='Seleciona tu tipo de usuario'
                onSelectionChange={setValue}
              >
                {(user) => (
                  <SelectItem
                    startContent={
                      user.key === "user" ? <RiUserFill /> : <RiAdminFill />
                    }
                    key={user.key}
                  >
                    {user.label}
                  </SelectItem>
                )}
              </Select>
            </div>
          </div>
        )}
      </div>
      <div>
        <Image
          src='../../public/img2.jpeg'
          className={` outline  animation-out ${
            value ? "-translate-x-20" : "translate-x-20"
          } outline-white/10 relative z-10 outline-offset-8  shadow-xl shadow-white/30`}
          radius='full'
          height={560}
          width={670}
        />
      </div>
    </section>
  );
}

export default TypeUserR;
