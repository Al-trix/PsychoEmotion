import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import Icons from "./Icons";
import '../css/homeStyles.css'

function DeveloperView({
  src,
  imgStyleView,
  nameStyleView,
  name,
  handleClickExit,
}) {
  return (
    <section className='flex border-3 border-rainbow  w-max mx-auto mt-4  rounded-xl bg-black/20 py-4 px-7 gap-5'>
      <picture className=' w-1/2 border border-white/30 rounded-xl'>
        <img
          src={src}
          className='w-full'
          style={{ viewTransitionName: `${imgStyleView}` }}
        />
      </picture>
      <div className='basis-1/2'>
        <div className='mt-2'>
          <h3
            className={` ${
              name && name === "Alvaro Arboleda"
                ? "text-ming-500"
                : name === "Deivy Gallego"
                ? "text-red-500"
                : "text-jade-500"
            } text-3xl font-bold`}
            style={{ viewTransitionName: `${nameStyleView}` }}
          >
            {name}
          </h3>
          <span className='w-14 h-px bg-kenyan-copper-50 block'></span>
        </div>

        <p className='text-white/80 mt-4 animation-title text-justify text-wrap w-96'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero porro
          consequatur nisi nemo ipsam necessitatibus adipisci eius impedit,
          dignissimos dolorum natus id quis velit eaque! Animi cupiditate soluta
          porro pariatur! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Ipsum, cupiditate cum nesciunt esse perspiciatis ducimus rem hic
          officiis fugiat, maxime, quaerat at. Nostrum, vero tempora omnis saepe
          aspernatur et. Voluptate.
        </p>
        <div>
          <div>
            <h6
              className={`${
                name && name === "Alvaro Arboleda"
                  ? "text-ming-500"
                  : name === "Deivy Gallego"
                  ? "text-red-500"
                  : "text-jade-500"
              } text-2xl mt- font-semibold  animation-text  `}
            >
              Skills
            </h6>
            <span className='mb-5 w-14 h-px bg-kenyan-copper-50 block'></span>
          </div>
          <Icons name={name} />
        </div>

        <Button
          color='primary'
          className='py-2 w-full  bg-black/70 mt-5'
          radius='sm'
          onClick={handleClickExit}
        >
          <FaArrowLeft />
          volver
        </Button>
      </div>
    </section>
  );
}

export default DeveloperView;
