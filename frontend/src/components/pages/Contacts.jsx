import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";

const Contacts = () => {
  return (
    <>
      <NavBar />
      <div className="contact" id="contact">
        <div className="container">
          <div className="w3ls-heading">
            <h3>Contact</h3>
          </div>
          <div className="contact-top-grids">
            <div className="col-md-6 contact-left-">
              <div className="left-top">
                <h4>Contact information</h4>
                <p>
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  <strong>
                    Monday - Friday <span className="dot">:</span>
                  </strong>
                  9:30 AM to 6:30 PM
                </p>
                <p>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <strong className="p">
                    address <span className="dot1">:</span>
                  </strong>
                  Chicago, 5th main road, carnivalle
                </p>
                <p>
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <strong className="p1">
                    phone <span className="dot2">:</span>
                  </strong>
                  +040 2345 6789
                </p>
                <p>
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <strong className="p2">
                    email <span className="dot3">:</span>
                  </strong>
                  <a href="mailto:info@example.com">example@email.com</a>
                </p>
              </div>
              <div className="left-bottom">
                <h4>get connected</h4>
                <p>
                  Pellentesque finibus dapibus volutpat. Curabitur imperdiet
                  vulputate rhoncus. Nullam scelerisque magna non turpis euismod
                  bibendum.
                </p>
                <div className="right-w3l fotw3">
                  <ul className="top-links">
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 contact-right">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.296948478801!2d-87.70494908450506!3d41.88647047922158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e32a54d21f20f%3A0x51b98b6ffbdca819!2sW+Fulton+St%2C+Chicago%2C+IL%2C+USA!5e0!3m2!1sen!2sin!4v1489574334335"></iframe>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="contact-w3ls">
            <form action="#" method="post">
              <div className="col-md-7 col-sm-7 contact-left agileits-w3layouts">
                <input
                  type="text"
                  name="First Name"
                  placeholder="Name"
                  required=""
                />
                <input
                  type="email"
                  className="email"
                  name="Email"
                  placeholder="Email"
                  required=""
                />
                <input
                  type="text"
                  name="Number"
                  placeholder="Mobile Number"
                  required=""
                />
                <input
                  type="text"
                  className="email"
                  name="Last Name"
                  placeholder="Last Name"
                  required=""
                />
              </div>
              <div className="col-md-5 col-sm-5 contact-right agileits-w3layouts">
                <textarea
                  name="Message"
                  placeholder="Message"
                  required=""
                ></textarea>
                <input type="submit" value="Submit" />
              </div>
              <div className="clearfix"> </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contacts;
