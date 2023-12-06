import React from "react";
import Navbar from "../components/Navbar";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavSide from "../components/NavSide";
import { ContextData } from "../App";

function EmployeeHistory() {
  const [loadEmployee, setLoadEmployee] = useState(false);
  const [tabEmployee, setTabEmployee] = useState();
  const [loadings, setLoadings] = useState(false);
  const [name, setName] = useState("");

  let { id } = useParams();

  //----------------------------Context------------------------------/////
  const { loading, setLoading } = useContext(ContextData);

  useEffect(() => {
    const getEmployee = axios
      .get(`https://localhost:8000/api/employees/${id}`)
      .then((res) => {
        let datas = res.data;

        let valeur;

        setName(res.data.nom);
        valeur = datas["employeeHistoriques"];

        setTabEmployee(valeur);
        setLoadEmployee(true);

        setLoadings(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    console.log(loading);
  }, []);

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
                    <h1 class="mt-4">Historique Employée</h1>
                    <ol class="breadcrumb mb-4">
                      <li class="breadcrumb-item active">{name}</li>
                    </ol>
                  </div>
                  <table class="table container table-hover">
                    <thead>
                      <tr className="table-primary">
                        <th scope="col-6" style={{ textAlign: "left" }}>
                          Etat
                        </th>
                        <th scope="col-6" style={{ textAlign: "center" }}>
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabEmployee.map((user) => {
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

export default EmployeeHistory;
