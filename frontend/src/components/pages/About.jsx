import React from 'react'

const About = () => {
  return (
    <>
    <div className="line">
    </div>
	<div className="about" id="about">
		<div className="container">
			<div className="w3ls-heading">
				<h3>About</h3>
			</div>
			<div className="col-md-6 about-left">
				<div className="w3labout-img boxw3-agile"> 
					<img src="src/assets/images/about.jpg" alt="" className="img-responsive" />
					<div className="agile-caption">
						<h3>Medical care</h3>
						<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
							sed diam nonummy nibh euismod tincidunt.</p>
					</div> 
				</div>
			</div>
			<div className="col-md-6 about-right">
				<h2>Integer euismod in orci quis</h2>
				<p>Nullam maximus consequat bibendum. Integer euismod in orci quis tempus. Nunc sed ligula facilisisNullam maximus consequat bibendum. Integer euismod in orci quis tempus. Nunc sed ligula facilisisNullam maximus consequat bibendum. Integer euismod in orci quis tempus. Nunc sed ligula facilisis</p>
				<a href="#myModal" className="w3more" data-toggle="modal"><i className="fa fa-mail-forward" aria-hidden="true"></i> Read more</a>
			</div>
			<div className="clearfix"></div>
		</div>
	</div>

    {/* <!-- modal --><!-- for pop up --> */}
    <div className="modal about-modal fade" id="myModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header"> 
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span className="span2" aria-hidden="true">&times;</span></button>						
                    <h4 className="modal-title"> Medical Care </h4>
                </div> 
            <div className="modal-body">
                <div className="agileits-w3layouts-info">
                    <img src="src/assets/images/about.jpg" alt="" />
                    <p>Duis venenatis, turpis eu bibendum porttitor, sapien quam ultricies tellus, ac rhoncus risus odio eget nunc. Pellentesque ac fermentum diam. Integer eu facilisis nunc, a iaculis felis. Pellentesque pellentesque tempor enim, in dapibus turpis porttitor quis. Suspendisse ultrices hendrerit massa. Nam id metus id tellus ultrices ullamcorper.  Cras tempor massa luctus, varius lacus sit amet, blandit lorem. Duis auctor in tortor sed tristique. Proin sed finibus sem.</p>
                </div>
            </div>
            </div>
        </div>
    </div>
{/* <!-- //modal --><!-- //for pop up --> */}
    </>
  )
}

export default About