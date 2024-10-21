import React, { useState, createElement } from "react";
import { useNavigate } from "react-router-dom";
import LoginUser from "../components/LoginUser";
import { RiUserFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import LoginAdmin from "../components/LoginAdmin";
import { Select, SelectItem, Image } from "@nextui-org/react";
import "../css/homeStyles.css";
import "../css/animations.css";
function TypeUserL() {
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  const x = "";
  const handlerChange = (e) => {
    setValue(e.target.value);
  };

  const typesUsers = [
    {
      key: "user",
      label: "Cliente",
    },
    {
      key: "admin",
      label: "Administrador",
    },
  ];

  return (
    <section
      className={` font-mono justify-center relative ${
        value && "flex-row-reverse"
      } lg:justify-between rounded-lg mt-4 flex w-full `}
    >
      <div className='w-full basis-3/6'>
        {value !== null ? (
          value.anchorKey === "user" ? (
            <LoginUser />
          ) : (
            <LoginAdmin />
          )
        ) : (
          <div className=' ml-32 rounded-3xl  z-20 relative bg-black/70 backdrop-blur-sm  w-full '>
            <div className=' mt-28  shadow-2xl border border-white/20  shadow-black p-6 rounded-3xl'>
              <h3 className='text-4xl  uppercase  w-11/12'>
                Elije tu tipo de{" "}
                <span className='text-kenyan-copper-500 font-bold'>
                  usuario
                </span>
              </h3>
              <h6 className='text-md mt-1 text-white/40'>
                Recuerda elegir correctamente
              </h6>
              <Select
                items={typesUsers}
                selectedKeys={value}
                color='primary'
                variant='underlined'
                className=' w-2/3 mt-10 shadow-2xl text-white'
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
      <Image
        src='../../public/img2.jpeg'
        className={`hidden outline ${value ? "ml-20" : "mr-30 "} ${
          value !== "user" && " absolute left-1/2  -translate-x-1/2   top-0"
        } outline-white  z-10 outline-offset-8 relative  lg:block`}
        radius='full'
        height={560}
        width={670}
      />
    </section>
  );
}

export default TypeUserL;
