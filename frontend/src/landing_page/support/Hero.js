import React from "react";

function Hero() {
  return (
    <section className="container-fluid text-white" style={{backgroundColor:"#387ed1"}}>

      <div className="d-flex justify-content-between p-4">
        <h5>Support Portal</h5>
        <a href="#" className="text-white">Track Tickets</a>
      </div>

      <div className="row p-5">

        <div className="col-md-6">
          <h3 className="mb-4">
            Search for an answer or browse help topics to create a ticket
          </h3>

          <input
            className="form-control mb-3"
            placeholder="Eg: how do I activate F&O, why is my order getting rejected.."
          />

          <div>
            <a href="#" className="text-white me-3">Track account opening</a>
            <a href="#" className="text-white me-3">Track segment activation</a>
            <a href="#" className="text-white me-3">Intraday margins</a>
            <a href="#" className="text-white">Kite user manual</a>
          </div>
        </div>

        <div className="col-md-6">
          <h4>Featured</h4>
          <ol>
            <li>
              <a href="#" className="text-white">
                Current Takeovers and Delisting - January 2024
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Latest Intraday leverages - MIS & CO
              </a>
            </li>
          </ol>
        </div>

      </div>
    </section>
  );
}

export default Hero;