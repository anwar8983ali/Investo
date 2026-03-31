import React from "react";

function RightSection({
  imageUrl,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container mt-5">
      <div className="row">

        <div className="col p-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <a href={learnMore}>Learn More<i class="fa-solid fa-arrow-right-long"></i></a>
        </div>

        <div className="col p-5">
          <img src={imageUrl} className="img-fluid" style={{ width: "90%" }} alt="product"/>
        </div>

      </div>
    </div>
  );
}

export default RightSection;
