import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const GoogleSignIn = () => {
  const router = useRouter();
  const googleButton = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Load the Google Sign-In script
    const loadGoogleScript = () => {
      if (typeof window === 'undefined' || window.google) return;
      
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (!window.google || !googleButton.current) return;

      try {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
          auto_select: false,
        });

        window.google.accounts.id.renderButton(googleButton.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
        });

        setIsScriptLoaded(true);
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
      }
    };

    loadGoogleScript();

    // Cleanup
    return () => {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  const handleGoogleSignIn = async (response) => {
    try {
      // Use existing login endpoint with Google credentials
      const result = await fetch('https://backend-apigame.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: response.credential.email,
          googleToken: response.credential, // Send the Google token
        }),
      });

      if (result.ok) {
        const data = await result.json();
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id);
        router.push('/dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-4">
      <div ref={googleButton} className="g-signin2" />
    </div>
  );
};

export default GoogleSignIn;