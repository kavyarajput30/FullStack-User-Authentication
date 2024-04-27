import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.get('/logout').then((res) => {
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
      }
    })
  }
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink onClick={handleLogout} >Logout</NavLink>
    </nav>
  );
}

export default Navbar;
