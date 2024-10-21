import React, { useState, createElement } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectItem, Image } from "@nextui-org/react";
import "../css/homeStyles.css";
import "../css/animations.css";
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
    <section className=' font-mono justify-center  lg:justify-between rounded-lg    mt-4 flex w-full '>
      <div className='border-2 w-full border-rainbow lg:border-r-0 basis-3/6'>
        {value !== null ? (
          value.anchorKey === "user" ? (
            <RegisterUser />
          ) : (
            <RegisterAdmin />
          )
        ) : (
          <div className='ml-14'>
            <h3 className='text-5xl mt-20 uppercase w-11/12'>
              Elije el tipo de{" "}
              <span className='text-kenyan-copper-500 font-bold'>usuario</span>
            </h3>
            <h6 className='text-md mt-1 text-white/40'>
              Seleciona que tipo de usuario iniciara sesion
            </h6>
            <Select
              items={typesUsers}
              label='Tipos de usuario'
              selectedKeys={value}
              placeholder='Seleciona tu tipo de usuario'
              className='w-10/12 mt-10 shadow-2xl border  border-kenyan-copper-300 rounded-xl'
              size='lg'
              variant='bordered'
              onSelectionChange={setValue}
            >
              {(user) => <SelectItem key={user.key}>{user.label}</SelectItem>}
            </Select>
          </div>
        )}
      </div>
      <Image
        src='../../public/img2.jpeg'
        className='hidden lg:block'
        radius='none'
        height={560}
        width={650}
        isBlurred
      />
    </section>
  );
}

export default TypeUserR;
