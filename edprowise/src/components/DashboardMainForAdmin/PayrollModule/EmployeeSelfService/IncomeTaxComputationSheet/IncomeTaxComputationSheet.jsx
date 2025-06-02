import React from "react";

const IncomeTaxComputationSheet = () => {
  return (
    <div className="container text-dark">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body px-1">
              <div id="receipt-content" className="my-2 box-border p-3">
                <div className="text-center mb-3">
                  <h6>
                    <strong>[From Letter Head]</strong>
                  </h6>
                </div>
                <div className="row border border-dark" />

                <h4 className="text-center payroll-title mb-0 p-2">
                  <strong>TAX COMPUTATION</strong>
                </h4>
                <div className="row border border-dark" />

                <div className="row m-0 salary-slip-box pt-2 my-2">
                  <div className="col-md-7">
                    <p className="text-dark payroll-box-text">
                      <strong>Employee Name : </strong> Umesh Jadhav
                    </p>
                    <p className="text-dark payroll-box-text">
                      <strong>Employee ID : </strong> EMP-001
                    </p>
                    <p className="text-dark payroll-box-text">
                      <strong>PF No : </strong> 123456
                    </p>
                  </div>

                  <div className="col-md-5">
                    <p className="text-dark payroll-box-text">
                      <strong>Grade : </strong> A
                    </p>
                    <p className="text-dark payroll-box-text">
                      <strong>Job Designation :</strong> Teacher
                    </p>
                    <p className="text-dark payroll-box-text">
                      <strong>Security Deposit :</strong> 500
                    </p>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table border border-dark text-dark mb-2">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          Particulars
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2 ">
                          Actual Salary
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2 ">
                          projection
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          No.of Months
                        </td>
                        <td className="align-content-center text-end p-2 border border-dark">
                          3
                        </td>
                        <td className="align-content-center text-end p-2 border border-dark">
                          9
                        </td>
                        <td className="align-content-center text-end p-2 border border-dark"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Basic Salary
                        </td>
                        <td className="align-content-center text-end p-2 border border-dark">
                          1,00,000
                        </td>
                        <td className="align-content-center text-end p-2 border border-dark">
                          9,00,000
                        </td>
                        <td className="align-content-center text-end p-2 border border-dark">
                          10,00,000
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          HRA
                        </td>
                        <td className="align-content-center text-end p-2 border border-dark"></td>
                        <td className="align-content-center text-end p-2 border border-dark"></td>
                        <td className="align-content-center text-end p-2 border border-dark"></td>
                      </tr>

                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center fw-bold p-2 border border-dark">
                          Income from Salary
                        </td>
                        <td className="text-end align-content-center fw-bold p-2 border border-dark"></td>
                        <td className="text-end align-content-center fw-bold p-2 border border-dark"></td>
                        <td className="text-end align-content-center fw-bold p-2 border border-dark">
                          10,00,000
                        </td>
                      </tr>

                      <tr className="payroll-table-body">
                        <td className="align-content-center px-3 p-2 border border-dark">
                          Less: HRA Exemption
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          10,000
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td
                          className="align-content-center px-3 p-2 border border-dark"
                          style={{ border: "1px solid black" }}
                        >
                          Less: Standard Deduction
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td
                          className="text-end align-content-center p-2 border border-dark"
                          style={{ border: "1px solid black" }}
                        ></td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          75,000
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center px-3 p-2 border border-dark">
                          Less: LTA Exemption
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center px-3 p-2 border border-dark">
                          Less: Professional Tax Exemption
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                      </tr>
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center fw-bold p-2 border border-dark">
                          Salary After Deduction Under Section 16
                        </td>
                        <td className="text-end align-content-center fw-bold p-2 border border-dark"></td>
                        <td className="text-end align-content-center fw-bold p-2 border border-dark"></td>
                        <td className="text-end align-content-center fw-bold p-2 border border-dark"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center px-3 p-2 border border-dark">
                          Other Income
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center px-3 p-2 border border-dark">
                          Income from House Property
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                      </tr>
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center fw-bold p-2 border border-dark">
                          Total Income
                        </td>
                        <td className="text-end align-content-center fw-bold p-2 border border-dark"></td>
                        <td className="text-end align-content-center fw-bold p-2 border border-dark"></td>
                        <td className="text-end align-content-center fw-bold p-2 border border-dark"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center px-3 p-2 border border-dark">
                          Less: Section 80C
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          1,50,000
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td
                          className="align-content-center px-3 p-2 border border-dark"
                          style={{ border: "1px solid black" }}
                        >
                          Less: Section 80D
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          20,000
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center px-3 p-2 border border-dark">
                          Less: Other Section
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          45,000
                        </td>
                      </tr>

                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center fw-bold p-2 border border-dark">
                          Net Taxable Income
                        </td>
                        <td
                          className="text-end align-content-center fw-bold p-2 border border-dark"
                          style={{ border: "1px solid black" }}
                        ></td>
                        <td
                          className="text-end align-content-center fw-bold p-2 border border-dark"
                          style={{ border: "1px solid black" }}
                        ></td>
                        <td
                          className="text-end align-content-center fw-bold p-2 border border-dark"
                          style={{ border: "1px solid black" }}
                        >
                          7,00,000
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Total Tax Incl Education Cess
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Rebate 87A (New Regime: If Net Taxable Income is upto
                          7 Lakhs, Old Regime: If Net Taxable Income is upto 5
                          Lakhs)
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Net Tax Payable
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td
                          className="align-content-center p-2 border border-dark"
                          style={{ border: "1px solid black" }}
                        >
                          Tax already deducted
                        </td>
                        <td
                          className="text-end align-content-center p-2 border border-dark"
                          style={{ border: "1px solid black" }}
                        ></td>
                        <td
                          className="text-end align-content-center p-2 border border-dark"
                          style={{ border: "1px solid black" }}
                        ></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                      </tr>
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center fw-bold p-2 border border-dark">
                          Tax yet to be deducted
                        </td>
                        <td
                          className="text-end align-content-center fw-bold p-2 border border-dark"
                          style={{ border: "1px solid black" }}
                        ></td>
                        <td className="text-end align-content-center fw-bold p-2 border border-dark"></td>
                        <td className="text-end align-content-center fw-bold p-2 border border-dark"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IncomeTaxComputationSheet;
