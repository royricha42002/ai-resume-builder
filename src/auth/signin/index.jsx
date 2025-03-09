import { SignIn } from '@clerk/clerk-react';
import React from 'react';
import './signin.css';

function Signin() {
  return (
    <div className="signin-page">
      <div className="signin-container">
        <SignIn />
      </div>
    </div>
  );
}

export default Signin;
