import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const feedbackCategories = [
  "Teaching Style",
  "Teaching Explanation",
  "Class Activity",
  "Engagement with Students",
  "Lesson Planning",
  "Behaviour Skills",
  "Discipline",
  "Communication Skills",
  "Good Listener",
  "Arrival on class on time",
  "Guidance & Motivational",
  "Inspiration",
];

const ViewEmployeePerformanceAppraisal = () => {
  const [ratings, setRatings] = useState({});
  const [hoverRatings, setHoverRatings] = useState({});
  const navigate = useNavigate();
  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleHover = (category, value) => {
    setHoverRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleHoverOut = (category) => {
    setHoverRatings((prev) => ({ ...prev, [category]: 0 }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Employee Feedback
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

              <div className="row m-0 mb-2 pt-2 salary-slip-box">
                <div className="col-md-8">
                  <p className="text-dark payroll-box-text">
                    <strong>Employee ID : </strong>Emp-001
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Employee Name : </strong>Umesh Jadhav
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Designation : </strong>Teacher
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Overall Rating : </strong>4 Star
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Grade : </strong>A
                  </p>
                </div>
              </div>

              <div className="table-responsive mb-2 px-lg-7 px-md-5">
                <table className="table border border-dark text-dark mb-2">
                  <thead>
                    <tr className="payroll-table-header">
                      <th className="text-center border border-dark p-2">
                        Feedback
                      </th>
                      <th className="text-center border border-dark p-2">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbackCategories.map((category) => (
                      <tr className="payroll-table-body" key={category}>
                        <td className="align-middle p-2 border border-dark">
                          {category}
                        </td>
                        <td className="text-center align-middle p-2 border border-dark">
                          <div className="star-rating d-flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                onClick={() =>
                                  handleRatingChange(category, star)
                                }
                                onMouseEnter={() => handleHover(category, star)}
                                onMouseLeave={() => handleHoverOut(category)}
                                style={{
                                  cursor: "pointer",
                                  fontSize: "2rem",
                                  color:
                                    star <=
                                    (hoverRatings[category] ||
                                      ratings[category] ||
                                      0)
                                      ? "#ffc107"
                                      : "#e4e5e9",
                                  marginRight: "0.5rem",
                                  transition: "color 0.2s",
                                }}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeePerformanceAppraisal;
