import React from "react";

const FreezeITDeclaration = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Freeze IT Declaration
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="row my-3">
                  <div className="col-md-6">
                    <p className="text-dark text-center">
                      <label
                        for="yearSelect"
                        className="mb-0 payroll-box-text fw-bold"
                      >
                        Financial Year :{" "}
                      </label>
                      <select
                        id="yearSelect"
                        className="ms-1 custom-select payroll-table-body border border-dark"
                        aria-label="Select Year"
                      >
                        <option selected>2025-26</option>
                        <option>2026-27</option>
                        <option>2027-28</option>
                        <option>2028-29</option>
                        <option>2029-30</option>
                      </select>
                    </p>
                  </div>

                  <div className="col-md-6">
                    <p className="text-dark text-center">
                      <div className="d-flex align-items-center gap-2">
                        <label
                          for="yearSelect"
                          className="mb-0 payroll-box-text flex-grow-2 fw-bold"
                        >
                          Freeze IT Declaration :{" "}
                        </label>
                        <button className="btn btn-success btn-sm custom-select">
                          Yes
                        </button>
                        <button className="btn btn-danger btn-sm custom-select ">
                          No
                        </button>
                      </div>
                    </p>
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

export default FreezeITDeclaration;
