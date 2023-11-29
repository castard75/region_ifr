import React from "react";

import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../App";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //UseNavigate
  const navigate = useNavigate();

  //Context
  const { loading, setLoading } = useContext(ContextData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const useIdentifiant = "departement@reunion.re";
    const userPassword = "departement";
    axios
      .post(" https://127.0.0.1:8000/api/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        setLoading(true);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {" "}
      <main>
        <Navbar />
        <div class="container">
          <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div class="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      class="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logo.png" alt="" />
                    </a>
                  </div>

                  <div class="card mb-3">
                    <div class="card-body">
                      <div class="pt-4 pb-2">
                        <h5 class="card-title text-center pb-0 fs-4">
                          Connection utilisateur
                        </h5>
                        <p class="text-center small">
                          Entrer votre nom d'utilisateur & votre mot de passe
                          pour vous connecter
                        </p>
                      </div>

                      <form class="row g-3 needs-validation" novalidate>
                        <div class="col-12">
                          <label for="yourUsername" class="form-label">
                            Identifiant
                          </label>
                          <div class="input-group has-validation">
                            <span
                              class="input-group-text"
                              id="inputGroupPrepend"
                            >
                              @
                            </span>
                            <input
                              type="text"
                              name="username"
                              class="form-control"
                              id="yourUsername"
                              required
                              onChange={(e) => {
                                setUsername(e.target.value);
                              }}
                            />
                            <div class="invalid-feedback">
                              Svp entrer votre mot de passe.
                            </div>
                          </div>
                        </div>

                        <div class="col-12">
                          <label for="yourPassword" class="form-label">
                            Mot de passe
                          </label>
                          <input
                            type="password"
                            name="password"
                            class="form-control"
                            id="yourPassword"
                            required
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                          <div class="invalid-feedback">
                            Svp entrez un mot de passe valide
                          </div>
                        </div>

                        <div class="col-12">
                          <button
                            class="btn btn-primary w-100"
                            onClick={(e) => {
                              handleSubmit(e);
                            }}
                          >
                            Se connecter
                          </button>
                        </div>
                        {/* <div class="col-12">
                          <p class="small mb-0">
                            Don't have account?{" "}
                            <a href="pages-register.html">Create an account</a>
                          </p>
                        </div> */}
                      </form>
                    </div>
                  </div>

                  <div class="credits"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Login;
