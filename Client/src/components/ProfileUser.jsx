import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { surveyResponseLogout } from "../api/surveyResponse.js";
import {
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useAuth } from "../context/authContext.jsx";

function ProfileUser({ user }) {
  const [error, setError] = useState("");
  const navigator = useNavigate();
  const { logOut, logOutAdmin } = useAuth();

  const handleClick = async () => {
    if (user?.uid) {
      try {
        await logOut();
        await surveyResponseLogout();
        navigator("/login");
      } catch (error) {
        setError(error);
      }
    } else {
      logOutAdmin();
      await surveyResponseLogout();
    }
  };

  return (
    <>
      <NavbarContent as='div' justify='end'>
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            {user?.photoURL === undefined ? (
              <Avatar
                icon={<FaUserAlt size={20} />}
                classNames={{
                  base: "bg-gradient-to-br from-[#Fb44] to-[#FF705B]",
                  icon: "text-black/80 cursor-pointer",
                }}
              />
            ) : (
              <Avatar
                isBordered
                as='button'
                className='transition-transform'
                color='warning'
                name='Jason Hughes'
                size='xl'
                src={user?.photoURL}
              />
            )}
          </DropdownTrigger>
          <DropdownMenu
            className='  bg-black/10 backdrop-blur-xl text-kenyan-copper-100 rounded-lg'
            aria-label='Profile Actions'
            variant='flat'
          >
            <DropdownItem key='profile' className='h-14 gap-2  '>
              <p className='font-semibold'>Correo: </p>
              <p className='font-semibold'>{user?.email}</p>
            </DropdownItem>
            <DropdownItem key='settings'>My Settings</DropdownItem>
            <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
            <DropdownItem
              onPress={handleClick}
              key='logout'
              color=''
              className='hover:bg-red-700/80 rounded-lg  transition-colors duration-300 hover:text-kenyan-copper-50 text-red-700'
            >
              <div className='flex items-center gap-2'>
                <CiLogout size={20} />
                Cerrar sesion
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </>
  );
}

export default ProfileUser;
