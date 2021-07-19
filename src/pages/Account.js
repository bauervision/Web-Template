import React, { useContext, useEffect, useState } from "react";
import { Table, Spinner } from 'reactstrap';

import { FirebaseContext } from "../firebase";

export default (props) => {

    const [currentUser, setCurrentUser] = useState({});

    const { user, firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if (user) {
            console.log();
            getUser(user.uid);
        }
        else
            console.log("No user");
    }, [user])

    async function getUser(userId) {
        console.log("fetching user: ", userId);

        const userData = await firebase.getUser(userId);
        console.log("raw userData", userData);
        console.log("formated userData", Object.entries(userData));
        if (userData) {
            setCurrentUser(userData);
        }

    }


    return (<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <h2 >Your Account</h2>

        {!currentUser && (<Spinner color="dark" />)}

        {currentUser &&
            <Table striped bordered hover responsive>
                <thead className="thead-dark">
                    <tr>
                        <th>Data</th>
                        <th>Value</th>

                    </tr>
                </thead>
                <tbody >
                    {Object.entries(currentUser).map(([key, value]) => (
                        <tr>
                            <td key={key}>{key}</td>
                            <td key={value}>{value}</td>
                        </tr>
                    )
                    )}
                </tbody>


            </Table>
        }

    </div>);
}

