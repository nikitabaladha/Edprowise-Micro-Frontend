import React from "react";

const Form16 = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Form 16
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <p>
                  Those employee whose tax has been deducted, Their name should
                  appear here.
                </p>
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
                        <th>Employee ID</th>
                        <th>Name Of Employee</th>
                        <th>Upload Documents</th>
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
                        <td>Kunal Shah</td>
                        <td>
                          <input
                            type="file"
                            id="documentFile"
                            name="documentFile"
                            className="form-control"
                            accept="image/*,application/pdf"
                          />
                        </td>
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

export default Form16;
