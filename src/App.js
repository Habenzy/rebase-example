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

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  function loginPass(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userObj) => {
        // Signed in
        setUser(userObj)
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  return (
    <BrowserRouter>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => {
            return <Dashboard user={user} />;
          }}
        />
        <Route
          path="/login"
          render={(props) => {
            return <Login loginPass={loginPass} user={user}/>;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
