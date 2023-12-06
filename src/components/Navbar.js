import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextData } from "../App.js";
import { useContext } from "react";

function Navbar() {
  //Navigate
  const navigate = useNavigate();

  //Context
  const { setLoading } = useContext(ContextData);

  const handleDisconnect = (e) => {
    e.preventDefault();
    setLoading(false);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <div>
          <Link class="navbar-brand ps-3" to="/home">
            Region-restauration
          </Link>
        </div>
        <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          {/* <div class="input-group">
                    <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
                </div> */}
        </form>

        <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-user fa-fw"></i>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <span
                  style={{ cursor: "pointer", backgroundColor: "#fff" }}
                  class="dropdown-item"
                  onClick={(e) => {
                    handleDisconnect(e);
                  }}
                >
                  Déconnection
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
