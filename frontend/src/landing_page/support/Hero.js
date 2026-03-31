import React from "react";

function Hero() {
  return (
    <section className="container-fluid text-white" style={{backgroundColor:"#387ed1"}}>

      <div className="d-flex justify-content-between p-4">
        <h5>Support Portal</h5>
        <button className="text-white bg-transparent border-0">
          Track Tickets
        </button>
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
            <button className="text-white bg-transparent border-0 me-3">
              Track account opening
            </button>
            <button className="text-white bg-transparent border-0 me-3">
              Track segment activation
            </button>
            <button className="text-white bg-transparent border-0 me-3">
              Intraday margins
            </button>
            <button className="text-white bg-transparent border-0">
              Kite user manual
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <h4>Featured</h4>
          <ol>
            <li>
              <button className="text-white bg-transparent border-0">
                Current Takeovers and Delisting - January 2024
              </button>
            </li>
            <li>
              <button className="text-white bg-transparent border-0">
                Latest Intraday leverages - MIS & CO
              </button>
            </li>
          </ol>
        </div>

      </div>
    </section>
  );
}

export default Hero;
