import React from "react";

const AddSalaryIncrement = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    CTC Master & Salary Increment
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th style={{ width: 20 }}>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheck1"
                            />
                          </div>
                        </th>
                        <th colspan="5"></th>
                        <th colspan="2"></th>
                        <th colspan="3">Salary Components (Old)</th>
                        <th colspan="3">Salary Components (Revised)</th>
                      </tr>
                      <tr>
                        <th style={{ width: 20 }}>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheck1"
                            />
                          </div>
                        </th>
                        <th>Employee No</th>
                        <th>Employee Name</th>
                        <th>Grade</th>
                        <th>Designation</th>
                        <th>Category</th>

                        <th>Inc %</th>
                        <th>Applicable From</th>

                        <th>Basic Salary</th>
                        <th>HRA</th>
                        <th>Gross Earning</th>

                        <th>Basic Salary</th>
                        <th>HRA</th>
                        <th>Gross Earning</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ width: 20 }}>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheck1"
                            />
                          </div>
                        </td>
                        <td>Emp10</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* <div className="d-flex justify-content-end mt-3"> */}
                <div className="text-end mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit
                  </button>
                </div>
                {/* </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalaryIncrement;
