import React from 'react'

const NavBar = () => {
  return (
    <>
    {/* <!-- banner --> */}
	<div id="home" className="w3ls-banner"> 
		{/* <!-- header --> */}
		<div className="header-w3layouts"> 
			{/* <!-- Navigation --> */}
			<nav className="navbar navbar-default navbar-fixed-top"> 
				<div className="container">
					<div className="navbar-header page-scroll">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
							<span className="sr-only">Medical_care</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<h1><a className="navbar-brand" href="index.html">Medical Consult</a></h1>
					</div> 
					{/* <!-- Collect the nav links, forms, and other content for toggling --> */}
					<div className="collapse navbar-collapse navbar-ex1-collapse">
						<ul className="nav navbar-nav navbar-right cl-effect-15">
							{/* <!-- Hidden li included to remove active className from about link when scrolled up past about section --> */}
							<li className="hidden"><a className="page-scroll" href="#page-top"></a>	</li>
							<li><a className="page-scroll scroll" href="#home">Home</a></li>
							<li><a className="page-scroll scroll" href="#about">About</a></li>
							<li><a className="page-scroll scroll" href="#services">Services</a></li>
							<li><a className="page-scroll scroll" href="#team">Team</a></li>
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
								<ul className="dropdown-menu">
									<li><a className="page-scroll scroll" href="#laboratories">laboratories</a></li>
									<li><a className="page-scroll scroll" href="#testimonials">Testimonials</a></li>
								</ul>
							</li>
							<li><a className="page-scroll scroll" href="#blog">Blog</a></li>
							<li><a className="page-scroll scroll" href="#contact">Contact</a></li>
						</ul>
					</div>
					{/* <!-- /.navbar-collapse --> */}
				</div>
				{/* <!-- /.container --> */}
			</nav>  
		</div>	
		{/* <!-- //header -->
		<!--banner-->
		<!--Slider--> */}
			<div className="w3l_banner_info">
				<div className="col-md-5 banner-form-agileinfo">
					<img src="src/assets/images/alt1.png" alt="" />
				</div>
				<div className="col-md-7 slider">
					<div className="callbacks_container">
								<ul className="rslides" id="slider3">
									<li>
										<div className="slider_banner_info">
											<h4>WE make healthy</h4>
											<p>Medical school education and post graduate education empha -size thoroughness.The good physician treats the disease, great physician treats the patient who has the disease.</p>
										</div>

									</li>
									<li>
										<div className="slider_banner_info">
											<h4>Medicine is a science</h4>
											<p>The best doctor is the one you run to and can't find.We should be concerned not only about the health of individual patients, but also the health of our entire society.</p>
										</div>

									</li>
									<li>
										<div className="slider_banner_info">
											<h4>Nothing cures health</h4>
											<p>Never go to a doctor whose office plants have died.You know what they call the fellow who finishes last in his medical school graduating className? They call him 'Doctor. </p>
										</div>

									</li>
									<li>
										<div className="slider_banner_info">
											<h4>We do best treatment</h4>
											<p>Time is generally the best doctor.so well choose your best doctor before time lossesThe art of medicine consists in amusing the patient while nature cures the disease.</p>
										</div>

									</li>
								</ul>
					</div>
				</div>
				<div className="clearfix"></div>
			{/* <!--//Slider--> */}
			
			</div>
		{/* <!--//banner--> */}
		
	</div>	
	{/* <!-- //banner -->  */}
    </>
  )
}

export default NavBar