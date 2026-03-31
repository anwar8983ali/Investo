import React from "react";

function Team() {
  return (
    <div className="container ">
      <div className="row  mt-5 mb-5 border-top">
        <h1 className=" text-center">People</h1>
      </div>

      <div className="row m-5 mt-5 " style={{ lineHeight: "30px" }}>
        <div className="col text-muted mt-5 p-5 text-center">
          <img
            src="/media/images/anwar.jpeg"
            style={{ width: "60%", height: "60%", borderRadius: "100%" }}
          ></img>
          <h6 className="mt-5">Anwar Ali</h6>
        </div>
        <div className="col text-muted mt-5 p-5">
          <p>
            Anwar bootstrapped and founded Investo in 2026 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Investo has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on Homepage / <a href="external">TradingQnA</a> /
            <a href="external">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
