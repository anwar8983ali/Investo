import React from "react";

function Hero() {
  return (
    <div className="container border-bottom mb-5">
      <div className="row text-center mt-5 p-3">
        <h1>Technology</h1>
        <h3 className="text-muted mt-3 fs-4">sleek,modern intuitive trading platforms</h3>
        <p className="mt-2">
          check out our{" "}
          <a href="external" style={{ textDecoration: "none" }}>
            investment offerings
            <i className="fa-solid fa-arrow-right-long ms-2"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
