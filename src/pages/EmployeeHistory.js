import React from "react";
import Navbar from "../components/Navbar";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavSide from "../components/NavSide";
function EmployeeHistory() {
  const [loadEmployee, setLoadEmployee] = useState(false);
  const [tabEmployee, setTabEmployee] = useState();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  let { id } = useParams();

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

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
                        <th scope="col-6">Etat</th>
                        <th scope="col-6">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabEmployee.map((user) => {
                        return (
                          <tr>
                            {" "}
                            <td>{user.etat} </td>
                            <td>{user.date.split("T")[0]}</td>
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
