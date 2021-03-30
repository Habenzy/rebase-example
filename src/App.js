import { useState } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCJGRvSo2zhLjgJn7pZ7oCKuFHraXDQ-34",
  authDomain: "example-auth-5e946.firebaseapp.com",
  databaseURL: "https://example-auth-5e946.firebaseio.com",
  projectId: "example-auth-5e946",
  storageBucket: "example-auth-5e946.appspot.com",
  messagingSenderId: "111109385265",
  appId: "1:111109385265:web:e404cc2ae5d06b2d3b7910",
};

let provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  function loginPass(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userObj) => {
        // Signed in
        setUser(userObj);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  function googleLogin() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });
  }

  //set up google login and pass to Login

  return (
    <BrowserRouter>

      <Switch>
        <Route
          exact
          path="/dashboard"
          render={(props) => {
            return <Dashboard user={user} />;
          }}
        />
        <Route
        exact
          path="/"
          render={(props) => {
            return (
              <Login
                loginPass={loginPass}
                user={user}
                googleLogin={googleLogin}
              />
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
