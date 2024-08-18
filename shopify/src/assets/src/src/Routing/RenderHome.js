import React,{useState} from 'react'
import Greetings from './Greeting'

export default function RenderHome() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const handleSignIn = () => {
        setIsSignedIn(true);
    };

    const handleSignOut = () => {
        setIsSignedIn(false);
    };
    return (
    <div>
      <Greetings 
        isSignedIn={isSignedIn} 
        onSignIn={handleSignIn} 
        onSignOut={handleSignOut} 
      />
    </div>
  )
}
