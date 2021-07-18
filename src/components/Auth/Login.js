
import React from "react";
import useFormValidation from "./useFormValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

export default (props) => {

  const { handleChange, handleSubmit, values } = useFormValidation(INITIAL_STATE);

  const [login, setLogin] = React.useState(true);

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <h2 >{!login ? "Create Account" : "Welcome Back!"}</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>


        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: "1rem" }}>
          {!login &&
            <input
              onChange={handleChange}
              value={values.name}
              name="name"
              type="text"
              placeholder="Your name"
              autoComplete="off"
            />}
          <input
            onChange={handleChange}
            value={values.email}
            name="email"
            type="email"
            placeholder="Your email"
            autoComplete="off"
          />
          <input
            onChange={handleChange}
            value={values.password}
            name="password"
            type="password"
            placeholder="Choose a secure password"
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
          <button type="submit">Submit</button>

          <button type="button" onClick={() => setLogin(prevState => !prevState)}>
            {!login ? "Login Instead" : "Create My Account"}
          </button>
        </div>

      </form>
    </div>);
}

