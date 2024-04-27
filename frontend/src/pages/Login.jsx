import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function Login() {
  const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
      });
    
      const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        return setData({ ...data, [name]: value });
      };
      const handleSubmit =  async (e) =>{
        e.preventDefault();
        try{
         const res = await axios.post("/login", data);
        //  console.log(res);
         if(res.data.success){  
          toast.success(res.data.message);
         navigate("/dashboard");
         }else if (res.data.error){
          toast.error("Wrong Credentials");
         }


        }catch(err){
          console.log(err.response.data.error);
          toast.error(err.response.data.error);
        }
      }
    return (
        <form onSubmit={handleSubmit}>
        <label>Email</label>
  
        <input
          type="email"
          placeholder="email"
          required
          name="email"
          value={data.email}
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
        <button type="submit">Login</button>
      </form>
    )
}

export default Login
