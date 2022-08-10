import React from 'react';
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <nav className='top-nav'>
            <Link className='nav-links' to="/muse2">Try Muse2 Here!</Link>
            <Link className='nav-links' to="/login">Login</Link>
            <Link className='nav-links' to="/signup">Sign Up</Link>
      </nav>
      <div>Home</div>
    </>
  )
}
