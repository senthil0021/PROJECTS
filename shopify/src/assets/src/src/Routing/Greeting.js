import React from 'react';
import UserGreeting from './UserGreeting';
import GuestGreeting from './GuestGreeting';
import Signin from './Signin';
import Signout from './Signout';

function Greetings({ isSignedIn, onSignIn, onSignOut }) {
  return (
    <div>
      {isSignedIn ? <UserGreeting /> : <GuestGreeting />}
      {isSignedIn ? 
        <Signout onSignOut={onSignOut} /> : 
        <Signin onSignIn={onSignIn} />
      }
    </div>
  );
}

export default Greetings;
