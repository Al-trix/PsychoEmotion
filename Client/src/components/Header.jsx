import React from 'react'
import Nav from './Nav'
function Header({children, home=false}) {
  return (
    <> 
    <header className=' container   mx-auto'>
      <Nav />
      {!home && children}
    </header>
    {home && children}
    </>

  );
}

export default Header
