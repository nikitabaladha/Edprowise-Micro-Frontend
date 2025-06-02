import React from "react";
import { FaPrint, FaDownload } from "react-icons/fa";

const SalarySlip = () => {
  return (
    <div className="container  text-dark">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="row mt-2 payroll-box-line" />
              {/* style={{ borderTop: "2px solid black" }} */}
              <div className="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <label for="yearSelect" className="mb-0 fw-bold">
                    Year :
                  </label>
                  <select
                    id="yearSelect"
                    className="custom-select"
                    aria-label="Select Year"
                  >
                    <option selected>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                    <option>2029</option>
                  </select>

                  <label for="monthSelect" className="mb-0 fw-bold">
                    Month :
                  </label>
                  <select
                    id="monthSelect"
                    className="custom-select"
                    aria-label="Select Month"
                  >
                    <option selected>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December.</option>
                  </select>
                  <button className="btn btn-light btn-sm">
                    <iconify-icon
                      icon="solar:eye-broken"
                      className="align-middle fs-18"
                    />
                  </button>
                </div>
                <div className="d-flex">
                  <button className="btn btn-light me-2">
                    <FaPrint /> Print
                  </button>

                  <button className="btn btn-light">
                    <FaDownload /> Download PDF
                  </button>
                </div>
              </div>

              <div
                id="receipt-content"
                className="salary-slip-box border-dark p-3"
              >
                <div className="text-center mb-3">
                  <h6>
                    <strong>[From Letter Head]</strong>
                  </h6>
                </div>
                <div className="row border border-dark" />

                <h4 className="text-center payroll-title mb-0 p-2">
                  <strong>SALARY SLIP - MONTH</strong>
                </h4>
                <div className="receipt-content row m-0 pt-2 salary-slip-box mb-2">
                  <div className="col-md-7">
                    <p className="text-dark payroll-box-text">
                      <strong>Employee Name :</strong> Umesh Jadhav
                    </p>
                    <p className="text-dark payroll-box-text">
                      <strong>Employee ID:</strong> 1
                    </p>
                    <p className="text-dark payroll-box-text">
                      <strong>PF No :</strong> 123456
                    </p>
                    <p className="text-dark payroll-box-text">
                      <strong>Paid Days :</strong> 30
                    </p>
                    <p className="text-dark payroll-box-text">
                      <strong>Lone/Advance Balance :</strong> 200
                    </p>
                  </div>

                  <div className="col-md-5 ">
                    <p className="text-dark payroll-box-text">
                      <strong>Grade :</strong> A
                    </p>
                    <p className="text-dark payroll-box-text">
                      <strong>Job Designation :</strong> Teacher
                    </p>
                    <p className="text-dark payroll-box-text">
                      <strong>UAN :</strong>
                    </p>
                    <p className="text-dark payroll-box-text">
                      <strong>Pay Mode :</strong> Cash
                    </p>
                    <p className="text-dark payroll-box-text">
                      <strong>Security Deposit :</strong> 500
                    </p>
                  </div>
                </div>

                <div className="row pt-3 payroll-box-line mb-2" />

                <div className="table-responsive mb-4">
                  <table className="table border border-dark text-dark mb-4">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center border border-dark p-2">
                          Earning
                        </th>
                        <th className="text-center border border-dark p-2">
                          Amount
                        </th>
                        <th className="text-center border border-dark p-2">
                          Deduction
                        </th>
                        <th className="text-center border border-dark p-2">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="payroll-table-body">
                        <td className="text-center border border-dark p-2">
                          Basic Salary
                        </td>
                        <td className="text-center border border-dark p-2"></td>
                        <td className="text-center border border-dark p-2">
                          PF Deduction
                        </td>
                        <td className="text-center border border-dark p-2"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="text-center border border-dark p-2">
                          HRA
                        </td>
                        <td className="text-center border border-dark p-2"></td>
                        <td className="text-center border border-dark p-2">
                          Professional Tax
                        </td>
                        <td className="text-center border border-dark p-2"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="text-center border border-dark p-2"></td>
                        <td className="text-center border border-dark p-2"></td>
                        <td className="text-center border border-dark p-2">
                          Income Tax
                        </td>
                        <td className="text-center border border-dark p-2"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="text-center fw-bold border border-dark p-2">
                          Gross Earning
                        </td>
                        <td className="text-center fw-bold border border-dark p-2">
                          0
                        </td>
                        <td className="text-center fw-bold border border-dark p-2">
                          Gross Deduction
                        </td>
                        <td className="text-center border border-dark fw-bold p-2">
                          0
                        </td>
                      </tr>
                      <tr className="payroll-table-body it-declaration-section-bg">
                        <td
                          colSpan={3}
                          className="text-center border border-dark fw-bold p-2"
                        >
                          Net Salary
                        </td>

                        <td className="text-center border border-dark fw-bold p-2">
                          0
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="row text-dark">
                  <div className="col-12 text-start">
                    <p className="text-dark">
                      <strong>
                        P.S. This is a system generated document and hence no
                        signature is required.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySlip;
