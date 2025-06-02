import React from "react";

const PreviousEmploymentIncome = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="payroll-title text-center mb-0">
                    Previous Employment Income
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="table-responsive px-lg-6 px-md-4 mb-2">
                  <table className="table border border-dark text-dark mb-2">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center align-content-center w-75 border border-dark p-2">
                          Particulars
                        </th>

                        <th className="text-center align-content-center w-25 border border-dark p-2">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Basic Salary
                        </td>
                        <td className="align-content-center text-end p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          House Rent Allowance
                        </td>
                        <td className="align-content-center text-end p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>

                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Leave Travel Allowance
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td
                          className="align-content-center p-2 border border-dark"
                          style={{ border: "1px solid black" }}
                        >
                          Education Allowance
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center  p-2 border border-dark">
                          Lunch Allowance
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Conveyance Allowance
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>

                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Other Allowance (Balance)
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center px-3 p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                      </tr>
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center fw-bold p-2 border border-dark">
                          Income from Salary
                        </td>
                        <td className="text-end align-content-center fw-bold p-2 border border-dark">
                          0
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark"></td>
                        <td className="text-end align-content-center p-2 border border-dark"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Professional Tax
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center p-2 border border-dark">
                          Employee PF Contribution
                        </td>
                        <td className="text-end align-content-center p-2 border border-dark">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-start "
                            required
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousEmploymentIncome;
