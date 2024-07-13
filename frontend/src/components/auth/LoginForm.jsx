import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm({ baseURL }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('loggin in')
    const user = {email:email, password:password}

    // GENERATE TOKEN
    const data = axios.post(`${baseURL}/auth/jwt/create/`, user).then((response)=>{
      localStorage.setItem('refresh_token', response.data.refresh)
      localStorage.setItem('access_token', response.data.access)
    })

    // GET USER INFORMATION
    const token = localStorage.getItem('access_token')
    if(token) {
      axios.get(`${baseURL}/auth/users/me/`,{
        headers: {
          Authorization: `FRISKY ${token}`
        }
      }).then(res=>{
        console.log(res.data)
        localStorage.setItem('firstname',res.data.firstname)
        localStorage.setItem('lastname',res.data.lastname)
        localStorage.setItem('email',res.data.email)
        localStorage.setItem('phone',res.data.phone)
      })
    }

    if (data && token){navigate("/");}
  };

  return (
    <>
      <div className="container-fluid booking py-5">
            <div className="container py-5">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-12">
                        <h1 className="text-white mb-3">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <div className="form-floating">
                                        <input type="text" className="form-control bg-white border-0" id="name" placeholder="Your Email"
                                          value={email}
                                          onChange={(e)=>setEmail(e.target.value)}
                                        />
                                        <label>Your Email</label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-floating">
                                        <input type="password" className="form-control bg-white border-0" id="password" placeholder="Your Password"
                                          value={password}
                                          onChange={(e)=>setPassword(e.target.value)}
                                        />
                                        <label>Your Password</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary text-white w-100 py-3" type="submit">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
