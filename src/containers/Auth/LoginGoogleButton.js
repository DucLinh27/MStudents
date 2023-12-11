/* eslint-disable no-unused-vars */
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";
function LoginGoogleButton() {
  const history = useHistory();
  const handleLogin = async (user) => {
    try {
      // Replace with your API endpoint
      const response = await axios.post(
        "http://localhost:8080/api/login",
        user
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <GoogleOAuthProvider clientId="1052696457949-iefguoppirjrg1q8t2l3ns6epgtu2ggs.apps.googleusercontent.com">
      <GoogleLogin
        buttonText="Login with Google"
        onSuccess={(credentialResponse) => {
          var decode = jwtDecode(credentialResponse.credential);
          console.log(credentialResponse);
          console.log(decode);
          handleLogin(decode);
          history.push("/Home");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default LoginGoogleButton;
