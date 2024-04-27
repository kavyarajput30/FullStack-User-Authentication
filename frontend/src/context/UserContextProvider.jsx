import UserContext from "./userContext";
import axios from "axios";
import { useState, useEffect } from "react";

const UserContextProvider =  ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        console.log("user context");
        console.log(user);
        if(!user) {
            axios.get('/profile').then((res) => {
                console.log(res.data)
                setUser(res.data);
            })
        }
    }, []);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;