import React from "react";

function LeftSection({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col p-5">
          <img src={imageUrl} style={{width:"90%"}}/>
        </div>
        <div className="col p-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a href={tryDemo}>Try Demo<i class="fa-solid fa-arrow-right-long"></i></a>
            <a href={learnMore} style={{marginLeft:"50px"}}>Learn More<i class="fa-solid fa-arrow-right-long"></i></a>
          </div>
          <div className="mt-3">
            <a href={googlePay}>
              <img src="media/images/googlePlayBadge.svg"></img>
            </a>
            <a href={appStore}>
              <img src="media/images/appStoreBadge.svg"></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
