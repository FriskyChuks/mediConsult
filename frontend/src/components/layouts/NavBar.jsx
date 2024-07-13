import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  
  useEffect(() => {  
      const checkAuth = () => {  
      if (localStorage.getItem('access_token') !== null) {        
          setIsAuth(true);
          setEmail(localStorage.getItem('email'))
      }else {
        setIsAuth(false);
        setEmail('');
      }
    } 
    checkAuth();
  }, [isAuth]);

  const handleSignout = () => {
    localStorage.clear()
    setIsAuth(false); // Update state immediately
    setEmail(''); // Clear email state
    navigate('/')
  }

  return (
    <>
       {/* <!-- Spinner Start --> */}
        {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div> */}
        {/* <!-- Spinner End --> */}

        {/* <!-- Topbar Start --> */}
        <div className="container-fluid bg-primary px-5 d-none d-lg-block">
            <div className="row gx-0">
                <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
                    <div className="d-inline-flex align-items-center" style={{height: "45px"}}>
                        <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-twitter fw-normal"></i></a>
                        <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-facebook-f fw-normal"></i></a>
                        <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-linkedin-in fw-normal"></i></a>
                        <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-instagram fw-normal"></i></a>
                        <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle" href=""><i className="fab fa-youtube fw-normal"></i></a>
                    </div>
                </div>
                <div className="col-lg-4 text-center text-lg-end">
                    <div className="d-inline-flex align-items-center" style={{height: "45px"}}>
                        { isAuth ? 
                            <>
                            <Link onClick={handleSignout}><small className="me-3 text-light"><i onClick={handleSignout} className="fa fa-sign-in-alt me-2"></i>Logout</small></Link>
                            </>
                            :
                            <>
                            <Link to="register"><small className="me-3 text-light"><i className="fa fa-user me-2"></i>Register</small></Link>
                            <Link to="login"><small className="me-3 text-light"><i className="fa fa-sign-in-alt me-2"></i>Login</small></Link>
                            </>
                        }
                        
                        <div className="dropdown">
                            <a href="#" className="dropdown-toggle text-light" data-bs-toggle="dropdown"><small><i className="fas fa-user-alt me-2"></i> {email}</small></a>
                            <div className="dropdown-menu rounded">
                                <a href="#" className="dropdown-item"><i className="fas fa-user-alt me-2"></i> My Profile</a>
                                <a href="#" className="dropdown-item"><i className="fas fa-comment-alt me-2"></i> Inbox</a>
                                <a href="#" className="dropdown-item"><i className="fas fa-bell me-2"></i> Notifications</a>
                                <a href="#" className="dropdown-item"><i className="fas fa-cog me-2"></i> Account Settings</a>
                                <Link onClick={handleSignout} className="dropdown-item"><i className="fas fa-power-off me-2"></i> Log Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Topbar End --> */}

        {/* <!-- Navbar & Hero Start --> */}
        <div className="container-fluid position-relative p-0">
            <nav style={{backgroundColor:"grey"}} className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                <a href="" className="navbar-brand p-0">
                    <h1 className="m-0">
                      {/* <i className="fa fa-map-marker-alt me-3"></i> */}
                      mediConsult
                    </h1>
                    {/* <!-- <img src="img/logo.png" alt="Logo"> --> */}
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="fa fa-bars"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0">
                        <Link to="/" className="nav-item nav-link active">Home</Link>
                        <Link to="/about" className="nav-item nav-link">About</Link>
                        <Link to="/services" className="nav-item nav-link">Services</Link>
                        <Link to="/categories" className="nav-item nav-link">Categories</Link>
                        <Link to="/" className="nav-item nav-link">Packages</Link>
                        <Link to="/" className="nav-item nav-link">Blog</Link>
                        <div className="nav-item dropdown">
                            <a to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div className="dropdown-menu m-0">
                                <Link to="/" className="dropdown-item">Destination</Link>
                                <Link to="/" className="dropdown-item">Explore Tour</Link>
                                <Link to="/" className="dropdown-item">Travel Booking</Link>
                                <Link to="/" className="dropdown-item">Our Gallery</Link>
                                <Link to="/" className="dropdown-item">Travel Guides</Link>
                                <Link to="/" className="dropdown-item">Testimonial</Link>
                                {/* <Link to="404.html" className="dropdown-item">404 Page</Link> */}
                            </div>
                        </div>
                        <a to="contact.html" className="nav-item nav-link">Contact</a>
                    </div>
                    <a to="" className="btn btn-primary rounded-pill py-2 px-4 ms-lg-4">Book Now</a>
                </div>
            </nav>

            
        </div>
        {/* <div className="container-fluid search-bar position-relative" style={{top: "-50%", transform: "translateY(-50%)"}}>
            <div className="container">
                <div className="position-relative rounded-pill w-100 mx-auto p-5" style={{background: "rgba(19, 53, 123, 0.8)"}}>
                    <input className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5" type="text" placeholder="Eg: Thailand" />
                    <button type="button" className="btn btn-primary rounded-pill py-2 px-4 position-absolute me-2" style={{top: "50%", right: "46px", transform: "translateY(-50%)"}}>Search</button>
                </div>
            </div>
        </div> */}
        {/* <!-- Navbar & Hero End --> */}
    </>
  );
};

export default NavBar;
