import React from "react";

function RightSection({
  imageUrl,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container mt-5">
      <div className="row text-center mb-5">
        <h1 className="mb-4">The Investo Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms.
        </p>
      </div>
      <div className="row text-center mb-5">
        <div className="col-4">
          <img className ="mb-2" src="media/images/smallcaseLogo.png" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>

        <div className="col-4">
          <img className ="mb-2" src="media/images/streakLogo.png"  style={{width:"50%"}}/>
          <p className="text-small text-muted">Algo & strategy platform</p>
        </div>

        <div className="col-4">
          <img className ="mb-5" src="media/images/sensibullLogo.svg" />
          <p className="text-small text-muted">Options & trading platform</p>
        </div>
      </div>

      <div className="row text-center">
        <div className="col-4">
          <img className ="mb-2" src="media/images/zerodhaFundhouse.png" style={{width:"50%"}}/>
          <p className="text-small text-muted">Asset management</p>
        </div>

        <div className="col-4">
          <img className ="mb-2" src="media/images/goldenpiLogo.png" />
          <p className="text-small text-muted">Bonds trading platform</p>
        </div>

        <div className="col-4">
          <img className ="mb-2" src="media/images/dittoLogo.png" style={{width:"37%"}}/>
          <p className="text-small text-muted">Insurance</p>
        </div>
      </div>
      <div className="row mt-5">
        <button className='p-2 btn btn-primary fs-5'  style={{width:"20%", margin:"0 auto"}}>SignUp</button>
      </div>
    </div>
  );
}

export default RightSection;
