import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Stock from "./Stock";
import { ContextData } from "../App";

function Home() {
  ///----------------------------HOOK----------------------------------////
  // const [loading, setLoading] = useState(false);
  const [tabEmployee, setTabEmployee] = useState();
  const [loadEmployee, setLoadEmployee] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tabStock, setTabStock] = useState();
  const [loadStock, setLoadStock] = useState(false);

  ///---------------------------NAVIGATE------------------------------/////
  const navigate = useNavigate();
  const load = useContext(ContextData);

  //----------------------------Context------------------------------/////
  const { loading, setLoading } = useContext(ContextData);

  //Si le context est à true on lance la requête
  if (loading) {
    const getEmployee = axios
      .get("https://localhost:8000/api/employees")
      .then((res) => {
        let datas = res.data;

        let valeur;
        let findGabaritItemId;
        valeur = datas["hydra:member"];

        setTabEmployee(valeur);
        setLoadEmployee(true);
        setLoaded(false);
      })
      .catch((err) => {
        console.log(err);
      });

    const getStock = axios
      .get("https://localhost:8000/api/stocks")
      .then((res) => {
        let datas = res.data;

        let valeur;
        let findGabaritItemId;
        valeur = datas["hydra:member"];

        setTabStock(valeur);
        setLoadStock(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ////---------------------------------EMPLOYEE HISTORY------------------------------/////

  const submit = (e) => {
    let userId = e;
    console.log(userId);
    navigate(`/employeeHistory/${userId}`);
  };

  return (
    <>
      {" "}
      <Navbar />
      {loadEmployee ? (
        <>
          <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
              <nav
                class="sb-sidenav accordion sb-sidenav-dark"
                id="sidenavAccordion"
              >
                <div class="sb-sidenav-menu">
                  <div class="nav">
                    <div class="sb-sidenav-menu-heading">
                      Liste employées et produits
                    </div>

                    <a
                      class="nav-link collapsed"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsePages"
                      aria-expanded="false"
                      aria-controls="collapsePages"
                    >
                      <div class="sb-nav-link-icon">
                        <i class="fas fa-book-open"></i>
                      </div>
                      Accueil
                    </a>

                    {/* <div class="sb-sidenav-menu-heading">Addons</div> */}
                    {/* <a class="nav-link" href="charts.html">
                      <div class="sb-nav-link-icon">
                        <i class="fas fa-chart-area"></i>
                      </div>
                      Charts
                    </a> */}
                    {/* <a class="nav-link" href="tables.html">
                      <div class="sb-nav-link-icon">
                        <i class="fas fa-table"></i>
                      </div>
                      Tables
                    </a> */}
                  </div>
                </div>
                <div class="sb-sidenav-footer">
                  <div class="small">Logged in as:</div>
                  Start Bootstrap
                </div>
              </nav>
            </div>

            <div id="layoutSidenav_content">
              <main>
                <div class="container-fluid px-4 d-flex justify-content-center">
                  <h2 class="mt-4">Liste des employées </h2>
                </div>
                <table class="table  table-hover datatablesSimple">
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">Nom</th>
                      <th scope="col">Téléphone</th>
                      <th scope="col">Adresse</th>
                      <th scope="col">Role</th>
                      <th scope="col">Détail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabEmployee.map((user) => {
                      return (
                        <tr>
                          <th scope="row">{user.nom}</th>
                          <td>{user.telephone}</td>
                          <td>{user.adresse}</td>
                          <td>{user.role}</td>
                          <td
                            onClick={(id) => {
                              submit(user.id);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-eye"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>{" "}
                {tabEmployee !== null || undefined ? (
                  <Stock stocks={tabStock} />
                ) : null}
              </main>
              <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                  <div class="d-flex align-items-center justify-content-between small">
                    <div class="text-muted">
                      Copyright &copy; Your Website 2023
                    </div>
                    <div>
                      <a href="#">Privacy Policy</a>
                      &middot;
                      <a href="#">Terms &amp; Conditions</a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Home;
