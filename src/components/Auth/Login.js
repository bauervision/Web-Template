
import React from "react";
import { Link } from "react-router-dom";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

export default (props) => {
  const [login, setLogin] = React.useState(true);
  const [firebaseError, setFirebaseError] = React.useState(null);

  const { handleChange, HandleBlur, handleSubmit, values, errors, isSubmitting } = useFormValidation(
    INITIAL_STATE, validateLogin, authenticateUser);

  async function authenticateUser() {
    try {
      const { name, email, password } = values;

      if (login)
        await firebase.login(email, password)
      else {

        // creating a new user
        const data = await firebase.register(name, email, password);

        if (data) {

          //successfully created a new user, push up new data to the DB
          let newUserData = {
            createdOn: data.user.metadata.creationTime,
            lastUpdate: data.user.metadata.lastSignInTime,
            id: data.user.uid,
            name: data.user.displayName,
            email: data.user.email,
            role: 2, //default to a normal user
            userpin: "1234"//default to something easy
          }

          await firebase.setNewUser(newUserData);

        }
      }

      props.history.push("/");

    } catch (err) {
      setFirebaseError(err.message);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <h2 >{!login ? "Create Account" : "Welcome Back!"}</h2>

      {/* turn form border red if there is a firebase error */}
      <form onSubmit={handleSubmit} className={(login && firebaseError) ? 'formError' : ''}>


        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: "1rem" }}>

          {/* Show name field only when creating account */}
          {!login &&
            <>
              <p> Name</p>
              <input
                onChange={handleChange}
                value={values.username}
                name="name"
                type="text"
                placeholder="Your Name"
              />
            </>
          }



          < input
            onChange={handleChange}
            onBlur={HandleBlur}
            value={values.email}
            name="email"
            type="email"
            placeholder={login ? "Email" : "Enter a Valid Email"}
            className={errors.email && 'error-input'}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}




          <input
            onChange={handleChange}
            onBlur={HandleBlur}
            value={values.password}
            name="password"
            type="password"
            placeholder={login ? "Password" : "Choose a secure password"}
            className={errors.password && 'error-input'}
          />

          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>



        <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
          <button
            type="submit"
            disabled={isSubmitting}
          >Submit</button>

          <button type="button" onClick={() => setLogin(prevState => !prevState)} style={{ backgroundColor: "powderblue" }}>
            {!login ? "Login Instead" : "Create My Account"}
          </button>
        </div>

      </form>
      {/* If there is a firebase error display it here */}
      {(login && firebaseError) && <p className="firebaseError"> {firebaseError}</p>}

      {/* Forgot Password? */}
      {login &&
        <Link to="/forgot" className="forgot-password">Forgot Password?
        </Link>
      }


    </div>);
}

