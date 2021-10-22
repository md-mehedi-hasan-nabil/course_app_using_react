import React, { useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import swal from "sweetalert";
import { UserContext } from "../../App";

initializeApp(firebaseConfig);

const Login = () => {
  const [authUser, setAuthUser] = useContext(UserContext);
  const auth = getAuth();

  useEffect(() => {
    loggedInUser();
  }, []);

  const loggedInUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { accessToken, displayName, email, photoURL } = user;
        setAuthUser({ accessToken, displayName, email, photoURL });
      } else {
        setAuthUser({});
      }
    });
  }

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        swal("SignOut successful", "Account Sign Out successful", "success");
      })
      .catch((error) => {
        swal("SignOut Error", error.message, "error");
      });
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setAuthUser(user.providerData[0]);
        swal("SignIn successful", "Account Sign In successful", "success");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        swal("SignIn Error", errorMessage, "error");
        console.error(error);
      });
  };
  return (
    <div>
      {authUser.displayName ? (
        <>
        <button className="btn btn-primary">
          {authUser.displayName}
        </button>
        <button className="btn btn-danger mx-1" onClick={userSignOut}>
          SignOut
        </button>
        </>
      ) : (
        <button onClick={googleSignIn} className="btn btn-primary px-3 me-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-google"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>
          <span className="ms-2">SignIn With Google</span>
        </button>
      )}
    </div>
  );
};

export default Login;
