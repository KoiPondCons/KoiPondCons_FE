import React from "react";
import "./index.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import Header from "../header";
import Footer from "../footer";

function AuthenTemplate({ children }) {
  const handleLoginWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="authen-template-container">
      <Header />
      <div className="authen-template">
        <div className="authen-template__form">
          {children}
          <button onClick={handleLoginWithGoogle} className="google-button">
            <img
              src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
              alt="Google logo"
              style={{ width: "20px", marginRight: "8px" }}
            />
            Tiếp tục với Google
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AuthenTemplate;
