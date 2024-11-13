import React, { useState } from "react";
import Link from "./Link";
import { NavLink } from "react-router-dom";
import logo from "../../public/logo-lite.png";
import ProfileUser from "./ProfileUser";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useAuth } from "../context/authContext";
const menuItems = [
  "Dashboard",
  "about us",
  "info",
  "Analytics",
  "Help & Feedback",
];
function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user,  userAdmin } = useAuth();
  return (
    <Navbar
      className=' mx-auto py-2 w-11/12'
      isMenuOpen={isMenuOpen}
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent
        className='sm:hidden text-2xl font-bold text-kenyan-copper-200'
        justify='start'
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className='sm:hidden pr-3' justify=''>
        <NavbarBrand>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "border-b-1  border-kenyan-copper-950 " : ""
            }
          >
            <img width={70} height={70} src={logo} alt='' />
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-6' justify='center'>
        <NavbarBrand>
          <NavLink
            className={({ isActive }) =>
              isActive ? "border-b-3 border-kenyan-copper-950 " : ""
            }
            to={"/"}
          >
            <img width={70} height={70} src={logo} alt='' />
          </NavLink>
        </NavbarBrand>
       
        <NavbarItem>
          <Link name={"Sobre nosotros"} href={"/aboutUs"} />
        </NavbarItem>
        <NavbarItem>
          <Link name={"Información"} href={"/info"} />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='sm:flex gap-5' justify='end'>
        {!user && !userAdmin && (
          <>
            <NavbarItem className='hidden lg:flex'>
              <Link name={"Inicia sesión"} href={"/login"} />
            </NavbarItem>
            <NavbarItem>
              <Link name={"Resgistrate"} border={true} href={"/signup"} />
            </NavbarItem>
          </>
        )}
      </NavbarContent>
        {user && !userAdmin &&<ProfileUser user={user}  />}
        {userAdmin && !user && <ProfileUser user={userAdmin}  />}

      <NavbarMenu className='z-50 bg-inherit text-kenyan-copper-100 mt-2'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link name={item} href={`/${item}`} responsing={true} />
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Nav;
