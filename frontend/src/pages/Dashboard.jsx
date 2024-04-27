import { useContext } from "react";
import UserContext from "../context/userContext";

function Dashboard() {
    const {user} = useContext(UserContext);
    // console.log(user);
    return (
        <>
        <div>User's Dashboard</div>
        {user && <div>
            <p>Welcome {user.name}</p>
            <p>Email: {user.email}</p>
            </div>}
        {!user && <p>Please login first</p>}    
        </>



    )
}

export default Dashboard
