import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaPython,
  FaFigma,
  FaBook,
} from "react-icons/fa";
import { IoLogoJavascript, IoLogoFirebase } from "react-icons/io5";
import { SiMysql } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { RiTailwindCssFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { MdInvertColors } from "react-icons/md";
import { Divider } from "@nextui-org/react";
import { MdOutlinePsychologyAlt } from "react-icons/md";
import Icon from "./Icon";
function Icons({ name }) {
  return (
    <>
      {name === 'Alvaro Arboleda' ? (
        <div className="flex animation-up flex-wrap items-center justify-center gap-3   mb-2 mt-4 ">
          <Icon nameIcon="HTML5" name={name}>
            <FaHtml5 size={30} />
          </Icon>

          <Icon nameIcon="CSS3" name={name}>
            <FaCss3Alt size={30} />
          </Icon>

          <Icon name={name} nameIcon="MySql">
            <SiMysql size={30} />
          </Icon>

          <Icon name={name} nameIcon="Python">
            <FaPython size={30} />
          </Icon>

          <Icon nameIcon="Javascript" name={name}>
            <IoLogoJavascript size={30} />
          </Icon>

          <Icon nameIcon="React" name={name}>
            <FaReact size={30} />
          </Icon>

          <Icon nameIcon="Tailwind" name={name}>
            <RiTailwindCssFill size={30} />
          </Icon>

          <Icon name={name} nameIcon="firabase">
            <IoLogoFirebase size={30} />
          </Icon>

          <Icon name={name} nameIcon="NodeJs">
            <FaNodeJs size={30} />
          </Icon>

          <Icon name={name} nameIcon="MongoDB">
            <DiMongodb size={30} />
          </Icon>
        </div>
      ) : name === 'Deivy Gallego' ? (
        <div className="flex animation-up flex-wrap items-center justify-center gap-3   mb-2 mt-4 ">
          <Icon name={name} nameIcon="Colorizado">
            <MdInvertColors size={30} />
          </Icon>
          <Icon name={name} nameIcon="Diseño de la pagína(figma)">
            <FaFigma size={30} />
          </Icon>
          <Icon nameIcon="HTML5" name={name}>
            <FaHtml5 size={30} />
          </Icon>
          <Icon nameIcon="CSS3" name={name}>
            <FaCss3Alt size={30} />
          </Icon>
          <Icon name={name} nameIcon="MySql">
            <SiMysql size={30} />
          </Icon>
          <Icon name={name} nameIcon="Python">
            <FaPython size={30} />
          </Icon>
        </div>
      ) : name === 'Simon Andres Rojas' ? (
        <div className="flex animation-up flex-wrap items-center justify-center gap-3   mb-2 mt-4 ">
          <Icon name={name} nameIcon="crear contenido basado en lo psicologico">
            <MdOutlinePsychologyAlt size={30} />
          </Icon>
          <Icon
            name={name}
            nameIcon="Analizar y investigar para dichos contenidos"
          >
            <TbReportAnalytics size={30} />
          </Icon>
          <Icon
            name={name}
            nameIcon="Leer articulos y mas para corroborrar ello"
          >
            <FaBook size={30} />
          </Icon>
          <Icon nameIcon="HTML5" name={name}>
            <FaHtml5 size={30} />
          </Icon>
          <Icon nameIcon="CSS3" name={name}>
            <FaCss3Alt size={30} />
          </Icon>
          <Icon name={name} nameIcon="MySql">
            <SiMysql size={30} />
          </Icon>
          <Icon name={name} nameIcon="Python">
            <FaPython size={30} />
          </Icon>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
export default Icons;
