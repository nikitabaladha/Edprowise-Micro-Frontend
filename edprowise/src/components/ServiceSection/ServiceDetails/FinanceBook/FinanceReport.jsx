import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const reportsPlans = [
  {
    title: "Tech Enabled",
    features: [
      "Invoice Processing System",
      "Online payment to vendor",
      "Integration of online approval of principal for invoice processing",
      "Remote access to auditor",
      "Integration with Fees & Payroll module",
      "Automatic TDS calculation",
    ],
  },
  {
    title: "Report",
    features: [
      "Monthly BS & P&L along with detailed schedule",
      "Ledger Book & Trail balance",
      "Financial Dashboard",
      "Graphical presentation",
      "Budgeting & Forecasting",
      "Attendance Report",
      "Apply & Track Leave",
      "Update details at anytime",
    ],
    // buttonColor: "success"
  },
  {
    title: "Compliance & Audit",
    features: [
      " Automatic posting of entry into financial books results in accuracy of financial books.",
    ],
    // buttonColor: "dark"
  },
];

const FinanceReport = () => {
  return (
    <div className="row-web wpo-courses-wrap service-row">
      {reportsPlans.map((plan, index) => (
        <div
          key={index}
          className="category-items col-lg-4 col-md-6 col-12 grid-web s3"
        >
          <div className="card shadow-sm border-0 p-3 text-center">
            {/* <h5 className="text-success fw-bold"></h5> */}
            <h2 className="fw-bold service-title-head">{plan.title}</h2>
            {/* <p className="text-muted">Fast project turnaround time, substantial cost savings & quality standards.</p> */}
            <ul className="list-unstyled ">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="d-flex gap-1 text-dark service-title-description"
                >
                  <span>
                    <FaCheckCircle className="service-font-icon" />
                  </span>
                  <div className="text-start"> {feature}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinanceReport;
