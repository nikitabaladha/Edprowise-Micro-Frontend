import React from "react";

const AddProcessPayroll = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center">Payroll Process</h4>
                </div>
              </div>
              <form onSubmit="">
                <div class="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
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
                  </div>
                </div>
                <div className="table-responsive mb-4">
                  <table className="table text-dark border border-dark mb-4">
                    <thead>
                      <tr className="payroll-table-header">
                        <th
                          colSpan={5}
                          className="text-center text-nowrap border border-dark align-content-center p-2"
                        ></th>
                        <th
                          colSpan={4}
                          className="text-center text-nowrap border border-dark align-content-center p-2"
                        >
                          Days
                        </th>
                        <th
                          colSpan={12}
                          className="text-center text-nowrap border border-dark align-content-center p-2"
                        >
                          Salary Components
                        </th>
                      </tr>
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Employee ID
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Employee Name
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Grade
                        </th>

                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Designation
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Category
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Total Days in a Month
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Paid Days
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Regularization Leave
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Leave Deduction
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Basic Salary
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          HRA
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Variable Pay
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Overtime Allowance
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Bonus
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Gross Earning
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          PF Deduction
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Income Tax
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Professional Tax
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Leave Deduction
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Gross Deduction
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Net Salary
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="payroll-table-body">
                        <td className="text-center border border-dark align-content-center p-2">
                          Emp-001
                        </td>
                        <td className="text-center border border-dark align-content-center p-2">
                          Umesh Jadhav
                        </td>
                        <td className="text-center border border-dark align-content-center p-2">
                          A
                        </td>
                        <td className="text-center border border-dark align-content-center p-2">
                          Teacher
                        </td>
                        <td className="text-center border border-dark align-content-center p-2">
                          Teaching Staff
                        </td>
                        <td className="text-center border border-dark align-content-center p-2">
                          31
                        </td>
                        <td className="text-center border border-dark align-content-center p-2"></td>
                        <td className="text-center border border-dark align-content-center p-2"></td>
                        <td className="text-center border border-dark align-content-center p-2"></td>
                        <td className="text-center border border-dark align-content-center p-2"></td>
                        <td className="text-center border border-dark align-content-center p-2"></td>
                        <td className="text-center border border-dark align-content-center p-2"></td>
                        <td className="text-center border border-dark align-content-center p-2"></td>
                        <td className="text-center border border-dark align-content-center p-2"></td>
                        <td className="text-center border border-dark align-content-center p-2">
                          0
                        </td>
                        <td className="text-center border border-dark align-content-center p-2"></td>
                        <td className="text-center border border-dark align-content-center p-2"></td>
                        <td className="text-center border border-dark align-content-center p-2"></td>
                        <td className="text-center border border-dark align-content-center p-2"></td>
                        <td className="text-center border border-dark align-content-center p-2">
                          0
                        </td>
                        <td className="text-center border border-dark align-content-center p-2">
                          0
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <div className="mr-2">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Submit for Principal Approval
                    </button>
                  </div>
                  <div className="text" style={{ marginLeft: "1rem" }}>
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                    >
                      Proceed for Payment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProcessPayroll;
