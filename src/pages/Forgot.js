import React, { useContext, useState } from "react";
import { FirebaseContext } from "../firebase";


export default (props) => {
    const { firebase } = useContext(FirebaseContext);

    const [resetEmail, setResetEmail] = useState('');
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [passwordResetError, setPasswordResetError] = useState(null);

    async function handleReset() {
        try {
            await firebase.resetPassword(resetEmail);
            setIsPasswordReset(true);
            setPasswordResetError(null);
        } catch (err) {
            console.error(err);
            setPasswordResetError(err.message);
            setIsPasswordReset(false);
        }
    }

    return (<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <h2 >Reset Your Password</h2>

        <div>
            <input
                name="email"
                type="email"
                className='input'
                placeholder="Provide your email"
                onChange={event => setResetEmail(event.target.value)}
            />
        </div>

        <button type="button" onClick={handleReset}>Reset</button>

        {isPasswordReset && <p style={{ color: "green" }}>Password Reset Successful: Check your email!</p>}
        {passwordResetError && <p className="firebaseError">{passwordResetError}</p>}
    </div>);
}

