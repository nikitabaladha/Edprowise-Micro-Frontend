import React from "react";

const PerformanceTrackingList = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Performance Tracking
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
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Designation</th>
                        <th>Overall Rating</th>

                        <th>Teaching Style</th>
                        <th>Teaching Explanation</th>

                        <th>Class Activity</th>
                        <th>Engagment With Students</th>
                        <th>Lesson Planning</th>

                        <th>Behaviour Skills</th>
                        <th>Discipline</th>
                        <th>Communication Skills</th>
                        <th>Good Listener</th>
                        <th>Arrival On Class On Time</th>
                        <th>Guidance & Motivational</th>
                        <th>Inspiration</th>
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
                        <td>Jay</td>
                        <td>Teacher</td>
                        <td>4</td>
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

export default PerformanceTrackingList;
