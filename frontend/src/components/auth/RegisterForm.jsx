import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

export default function RegisterForm( {baseUrl}) {
  const navigate = useNavigate()
  const [msg, setMsg] =  useState("")
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    const user = {firstname:firstname, lastname:lastname, email:email,
                  phone:phone, password:password, re_password:confirmPassword}

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verify email and password
    axios.get(`${baseUrl}/accounts/get_user/${email}/${phone}/`)
      .then((res)=>{
        console.log(res.data)
        if(res.data[0].email===email){
          setMsg("A User with this Email already exists!")
        } else if(res.data[0].phone===phone){
          setMsg("This Phone Number has already been used by another User!")
        }
      })

    // Create User
    axios.post(`${baseUrl}/auth/users/`,user)
    navigate('/login')
  };

  return (
    <> 
      <div className="container-fluid booking py-5">
            <div className="container py-5">
                <div className="row g-5 align-items-center">
                    {/* <div className="col-lg-6">
                        <h5 className="section-booking-title pe-3">Booking</h5>
                        <h1 className="text-white mb-4">Online Booking</h1>
                        <p className="text-white mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur maxime ullam esse fuga blanditiis accusantium pariatur quis sapiente, veniam doloribus praesentium? Repudiandae iste voluptatem fugiat doloribus quasi quo iure officia.
                        </p>
                        <p className="text-white mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur maxime ullam esse fuga blanditiis accusantium pariatur quis sapiente, veniam doloribus praesentium? Repudiandae iste voluptatem fugiat doloribus quasi quo iure officia.
                        </p>
                        <a href="#" className="btn btn-light text-primary rounded-pill py-3 px-5 mt-2">Read More</a>
                    </div> */}
                    <div className="col-lg-12">
                        <h1 className="text-white mb-3">Register With Us</h1>
                        {/* <p className="text-white mb-4">Get <span className="text-warning">50% Off</span> On Your First Adventure Trip With Travela. Get More Deal Offers Here.</p> */}
                        <form>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control bg-white border-0" id="name" placeholder="Your Name" />
                                        <label>Your Name</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="email" className="form-control bg-white border-0" id="email" placeholder="Your Email" />
                                        <label>Your Email</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating date" id="date3" data-target-input="nearest">
                                        <input type="text" className="form-control bg-white border-0" id="datetime" placeholder="Date & Time" data-target="#date3" data-toggle="datetimepicker" />
                                        <label>Date & Time</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating date" id="date3" data-target-input="nearest">
                                        <input type="text" className="form-control bg-white border-0" id="datetime" placeholder="Date & Time" data-target="#date3" data-toggle="datetimepicker" />
                                        <label>Date & Time</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating date" id="date3" data-target-input="nearest">
                                        <input type="text" className="form-control bg-white border-0" id="datetime" placeholder="Date & Time" data-target="#date3" data-toggle="datetimepicker" />
                                        <label>Date & Time</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating date" id="date3" data-target-input="nearest">
                                        <input type="text" className="form-control bg-white border-0" id="datetime" placeholder="Date & Time" data-target="#date3" data-toggle="datetimepicker" />
                                        <label>Date & Time</label>
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="form-floating">
                                        <select className="form-select bg-white border-0" id="select1">
                                            <option value="1">Destination 1</option>
                                            <option value="2">Destination 2</option>
                                            <option value="3">Destination 3</option>
                                        </select>
                                        <label>Destination</label>
                                    </div>
                                </div> */}
                                {/* <div className="col-12">
                                    <div className="form-floating">
                                        <textarea className="form-control bg-white border-0" placeholder="Special Request" id="message" style={{height: "100px"}}></textarea>
                                        <label>Special Request</label>
                                    </div>
                                </div> */}
                                <div className="col-12">
                                    <button className="btn btn-primary text-white w-100 py-3" type="submit">Register Now</button>
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
