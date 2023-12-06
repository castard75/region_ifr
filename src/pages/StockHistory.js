import React from "react";
import Navbar from "../components/Navbar";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavSide from "../components/NavSide";
import { ContextData } from "../App";

function StockHistory() {
  const [loadEmployee, setLoadEmployee] = useState(false);
  const [tabEmployee, setTabEmployee] = useState();
  const [loadings, setLoadings] = useState(false);
  const [name, setName] = useState("");
  const [history, setHistory] = useState();

  let { id } = useParams();

  //Navigate
  const navigate = useNavigate();

  //----------------------------Context------------------------------/////
  const { loading, setLoading } = useContext(ContextData);

  useEffect(() => {
    const getEmployee = axios
      .get(`https://localhost:8000/api/stocks/${id}`)
      .then((res) => {
        let datas = res.data;

        let valeur;
        setName(res.data.produit.nom);
        console.log(res.data.produit.nom);
        valeur = datas["stockHistoriques"];

        setTabEmployee(valeur);
        setHistory(valeur);
        setLoadEmployee(true);

        setLoadings(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
  }, []);

  const handleRetour = () => {
    navigate("/home");
    setLoading(true);
  };
  return (
    <>
      <Navbar />
      <>
        {loadEmployee ? (
          <>
            <div id="layoutSidenav">
              <NavSide />
              <div id="layoutSidenav_content">
                <main>
                  <div class="container-fluid px-4">
                    <h1 class="mt-4">Historique produits</h1>
                    <ol class="breadcrumb mb-4">
                      <div>
                        <li class="breadcrumb-item active">
                          <span style={{ fontSize: "20px" }}>{name}</span>
                        </li>
                      </div>
                    </ol>
                  </div>
                  <table class="table container table-hover">
                    <thead>
                      <tr className="table-primary">
                        <th scope="col" style={{ textAlign: "left" }}>
                          Etat
                        </th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((user) => {
                        return (
                          <tr>
                            {" "}
                            <td>{user.etat} </td>
                            <td style={{ textAlign: "center" }}>
                              {user.date.split("T")[0]}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </main>
              </div>
            </div>
          </>
        ) : null}
      </>
    </>
  );
}

export default StockHistory;
