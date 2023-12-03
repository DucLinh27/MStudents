/* eslint-disable no-unused-vars */
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function LoginGoogleButton() {
  return (
    <GoogleOAuthProvider clientId="1052696457949-0gapt2s7pvrcde196osu6i1n700nshk0.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default LoginGoogleButton;
