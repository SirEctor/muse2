import React from 'react';
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <nav className='top-nav'>
            <Link to="/muse2">Try Muse2 Here!</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
      </nav>
      <div>Home</div>
    </>
  )
}
