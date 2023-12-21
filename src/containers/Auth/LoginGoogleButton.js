/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/actions";
function LoginGoogleButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogin = async (decodedUser) => {
    try {
      const { email, name } = decodedUser;
      // Replace with your API endpoint
      const response = await axios.post("http://localhost:8080/api/users", {
        email,
        name,
      });
      console.log(response.data);

      // Assuming response.data contains the userId
      const userId = response.data.userId;
      console.log(userId);

      // Add userId to decodedUser
      const updatedUser = { ...decodedUser, userId };

      dispatch(setUser({ ...updatedUser, isLoggedIn: true }));
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
          history.push("/home");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default LoginGoogleButton;
