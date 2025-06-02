import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoanStatement = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center ">
                    Loan Statement
                  </h4>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form onSubmit="">
                <div className="row m-0 salary-slip-box pt-2 my-2">
                  <div className="col-md-8">
                    <p className="text-dark payroll-box-text">
                      <strong>Employee ID : </strong> EMP-001
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p className="text-dark payroll-box-text">
                      <strong>Employee Name : </strong> Umesh Jadhav
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p className="text-dark payroll-box-text">
                      <strong>Loan Type : </strong> A
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p className="text-dark payroll-box-text">
                      <strong>Loan Date : </strong> 11-05-2025
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p className="text-dark payroll-box-text">
                      <strong>Loan Amount :</strong> 10,000
                    </p>
                  </div>
                </div>
                <div className="table-responsive mb-2">
                  <table className="table text-dark border border-dark mb-4">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center align-content-center border border-dark p-2">
                          Month
                        </th>
                        <th className="text-center align-content-center border border-dark p-2">
                          Opening Balance
                        </th>
                        <th className="text-center align-content-center border border-dark p-2">
                          Loan Added
                        </th>
                        <th className="text-center align-content-center border border-dark p-2">
                          Installment Paid
                        </th>
                        <th className="text-center align-content-center border border-dark p-2">
                          Closing Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="payroll-table-body">
                        <td className="text-center align-content-center border border-dark p-2">
                          Apr-24
                        </td>
                        <td className="text-end align-content-center border border-dark p-2"></td>
                        <td className="text-end align-content-center border border-dark p-2">
                          10,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          1000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          9000
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="text-center align-content-center border border-dark p-2">
                          May-24
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          9000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2"></td>
                        <td className="text-end align-content-center border border-dark p-2">
                          1000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          8000
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="text-center align-content-center p-2">
                          Jun-24
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          8000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2"></td>
                        <td className="text-end align-content-center border border-dark p-2">
                          1000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          7000
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="text-center border border-dark align-content-center p-2">
                          Jul-24
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          7000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2"></td>
                        <td className="text-end align-content-center border border-dark p-2">
                          1000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          6000
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="text-center align-content-center border border-dark p-2">
                          Aug-24
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          6000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2"></td>
                        <td className="text-end align-content-center border border-dark p-2">
                          1000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          5000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-end"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanStatement;
