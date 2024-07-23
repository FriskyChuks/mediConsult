import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm({ baseURL }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const phone = '080'

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {email:email, password:password}

    axios.get(`${baseURL}/accounts/get_user/${email}/${phone}/`).then((res)=>{
        if(res.data[0].is_active===false){setMsg("You're acoount has not been verified, please check your mail and confirm your account")}
    })

    // GENERATE TOKEN
    const data = await axios.post(`${baseURL}/auth/jwt/create/`, user).then((response)=>{
      localStorage.setItem('refresh_token', response.data.refresh)
      localStorage.setItem('access_token', response.data.access)
    })
    const access = localStorage.getItem('access_token')
    if(access){
        axios.get(`${baseURL}/auth/users/me/`,{
          headers: {
            Authorization: `FRISKY ${access}`
          }
        }).then((res)=>{
          console.log(res.data)
          localStorage.setItem('firstname',res.data.firstname)
          localStorage.setItem('lastname',res.data.lastname)
          localStorage.setItem('email',res.data.email)
          localStorage.setItem('phone',res.data.phone)
          navigate('/')
        })
      }
  };

  return (
    <>
      <div className="container-fluid booking py-5">
            <div className="container py-5">
                <div className="row g-5 align-items-center">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-6">
                      <h1 className="text-white mb-3">Login</h1>
                      <h4 style={{color:"red"}}>{msg}</h4>
                      <form onSubmit={handleSubmit}>
                          <div className="row g-3">
                              <div className="col-md-12">
                                  <div className="form-floating">
                                      <input type="email" className="form-control bg-white border-0" id="name" placeholder="Your Email"
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
                  <div className="col-lg-3"></div>
                </div>
            </div>
        </div>
    </>
  );
}
