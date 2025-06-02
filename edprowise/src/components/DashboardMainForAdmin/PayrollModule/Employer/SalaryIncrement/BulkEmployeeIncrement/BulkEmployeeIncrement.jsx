import React from "react";

const BulkEmployeeIncrement = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center">Employee Increment</h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="table-responsive mb-4">
                  <table className="table  text-dark mb-4">
                    <thead>
                      <tr className="payroll-table-header">
                        <th
                          colSpan={5}
                          className="text-center align-content-center text-nowrap p-2"
                          style={{
                            borderBottom: "1px solid black",
                            background: "snow",
                          }}
                        ></th>
                        <th
                          colSpan={2}
                          className="text-center align-content-center text-nowrap p-2"
                          style={{
                            borderBottom: "1px solid black",
                            background: "snow",
                          }}
                        ></th>
                        <th
                          colSpan={3}
                          className="text-center border border-dark align-content-center text-nowrap p-2"
                        >
                          Salary Components (Old)
                        </th>
                        <th
                          colSpan={3}
                          className="text-center payroll-table-header border border-dark align-content-center text-nowrap p-2"
                        >
                          Salary Components (Revised)
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
                          Increment %
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Applicable From
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Basic Salary
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          HRA
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Gross Earning
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Basic Salary
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          HRA
                        </th>
                        <th className="text-center border border-dark align-content-center text-nowrap p-2">
                          Gross Earning
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="payroll-table-body">
                        <td className="text-start align-content-center border border-dark p-2">
                          Emp-001
                        </td>
                        <td className="text-start align-content-center border border-dark p-2">
                          Umesh Jadhav
                        </td>
                        <td className="text-start align-content-center border border-dark p-2">
                          A
                        </td>
                        <td className="text-start align-content-center border border-dark p-2">
                          Teacher
                        </td>
                        <td className="text-start align-content-center border border-dark p-2">
                          Teaching Staff
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          <input
                            type="text"
                            id="incrementPercentage"
                            name="incrementPercentage"
                            className="form-control payroll-table-body payroll-input-border"
                            required
                            placeholder="Enter Percentage"
                          />
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          <input
                            type="date"
                            id="applicableFromDate"
                            name="applicableFromDate"
                            className="form-control payroll-table-body payroll-input-border"
                            // value={formData.applicableFromDate}
                            // onChange={handleChange}
                            required
                          />
                        </td>
                        <td className="text-end align-content-center border border-dark p-2"></td>
                        <td className="text-end align-content-center border border-dark p-2"></td>
                        <td className="text-end align-content-center border border-dark p-2"></td>
                        <td className="text-end align-content-center border border-dark p-2"></td>
                        <td className="text-end align-content-center border border-dark p-2"></td>
                        <td className="text-end align-content-center border border-dark p-2"></td>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkEmployeeIncrement;
