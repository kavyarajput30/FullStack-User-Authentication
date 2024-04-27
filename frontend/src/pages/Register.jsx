import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    return setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const { name, email, password } = data;
    try {
      let responce = await axios.post("/register", { name, email, password });
      if (responce.data.success) {
        // console.log(responce.data);
        setData({ ...data, email: "", name: "", password: "" });
        toast.success(responce.data.message);
        navigate("/login");
      } else if(responce.data.error){
        toast.error(responce.data.error);
      }
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>

      <input
        type="email"
        placeholder="write email"
        required
        name="email"
        value={data.email}
        onChange={handleInputChange}
      ></input>
      <label>Name</label>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={data.name}
        onChange={handleInputChange}
      ></input>
      <label>Password</label>
      <input
        type="password"
        placeholder="password"
        required
        name="password"
        value={data.password}
        onChange={handleInputChange}
      ></input>
      <br></br>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
