import "./App.css";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Home } from "./components/Home.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "./components/UserProfile.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      console.log("codeResponse: ", codeResponse);
      sessionStorage.setItem("isUserLoggedIn", true);
      sessionStorage.setItem("codeResponse", JSON.stringify(codeResponse));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const isUserLoggedIn = sessionStorage.getItem("isUserLoggedIn");
    const codeResponse = JSON.parse(sessionStorage.getItem("codeResponse"));
    console.log("rudransh");

    if (isUserLoggedIn) {
      console.log("isUserLoggedIn: ", isUserLoggedIn);

      if (codeResponse) {
        getUserDetails(codeResponse);
        console.log("codeResponse: ", codeResponse);
      }
    }
  }, []);

  function getUserDetails(user) {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setProfile(res.data);
        sessionStorage.setItem("userDetails ", JSON.stringify(res.data));

        setAccessToken(user?.access_token);
      })
      .catch((err) => {
        sessionStorage.clear();

        console.log("Error : ", err);
      });
  }

  useEffect(() => {
    if (user) {
      getUserDetails(user);
    }
  }, [user]);

  

  const logOut = () => {
    googleLogout();
    setProfile(null);
    sessionStorage.clear();
    // const isUserLoggedIn = sessionStorage.getItem("isUserLoggedIn");
    // const codeResponse = JSON.parse(sessionStorage.getItem("codeResponse"));
  };
  return (
    <>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <>
          <UserProfile
            profile={profile}
            accessToken={accessToken}
            logOut={logOut}
          />
          <Home />
        </>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </>
  );
}

export default App;
