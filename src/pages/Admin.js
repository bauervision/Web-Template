import React, { useContext, useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';

import { FirebaseContext } from "../firebase";

export default (props) => {
    const { user, firebase } = useContext(FirebaseContext);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, [])

    async function getAllUsers() {
        const userData = await firebase.getAllUsers();
        setAllUsers(userData);
    }

    return (<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <h2 >Admin Account</h2>

        {user ? <p>{user.displayName}</p> : <p>No User</p>}
        {!allUsers ?
            <Spinner color="dark" />
            : <ListGroup className="flex center justifyCenter">

                {allUsers.length > 0
                    ? (<>
                        {allUsers.map(user => (
                            <ListGroupItem key={user.id}>{user.name}</ListGroupItem>
                        ))}

                    </>)
                    : (<Spinner color="dark" />)
                }

            </ListGroup>
        }
    </div>);
}

