import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Stock({ stocks }) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const stockDetails = (e) => {
    let productId = e;
    console.log(productId);
    navigate(`/StockHistory/${productId}`);
  };
  return (
    <>
      {stocks ? (
        <>
          {" "}
          <div class="container-fluid px-4 d-flex justify-content-center">
            <h2 class="mt-4">Liste des produits </h2>
          </div>
          <table className="table table-hover ">
            <thead>
              <tr className="table-primary">
                <th scope="col">Nom Produit</th>

                <th scope="col">Détail</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((product) => {
                return (
                  <tr>
                    <td scope="row">{product.produit}</td>

                    <td
                      onClick={(id) => {
                        stockDetails(product.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye pe-auto"
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
        </>
      ) : null}
    </>
  );
}

export default Stock;
