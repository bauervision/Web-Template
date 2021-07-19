import React, { useContext } from "react";
import { FirebaseContext } from "../firebase";

export default (props) => {

    const { user } = useContext(FirebaseContext);

    return (<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <h2 >AR Create Portal</h2>
        {user && <p>{`Welcome back ${user.displayName}`} </p>}
        <p></p>
    </div>);
}

