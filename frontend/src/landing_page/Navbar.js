import React from "react";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="box container-fluid px-5">
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo1.svg"
            alt="logo"
            style={{ width: "120px" }}
          />
        </Link>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link active px-3" aria-current="page" to="/auth">
                  Signup
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active px-3" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active px-3" to="/product">
                  Product
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active px-3" to="/pricing">
                  Pricing
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active px-3" to="/support">
                  Support
                </Link>
              </li>

            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;