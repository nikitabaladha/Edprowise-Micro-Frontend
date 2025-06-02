import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const reportsPlans = [
  {
    title: "Report",
    features: [
      "Staff attendance & leave report",
      "Staff late arrival report",
      "Personwise salary report",
      "Variablepay/Bonus report",
      "PF & ESI Report",
      "Income Tax deduction report",
      "Gratuity & LE report",
      "Employee master",
    ],
  },
  {
    title: "Employee Self Services(Application)",
    features: [
      "Salary Slip",
      "Income tax declaration facility for employees",
      "Income Tax computation sheet",
      "Form 16",
      "Loan Statement",
      "Attendance Report",
      "Apply & Track Leave",
      "Update details at anytime",
    ],
    // buttonColor: "success"
  },
  {
    title: "Tech Enabled",
    features: [
      "Employee registration form.",
      "Define various CTC components for each employees.",
      "Automatic Salary disbursement",
      "Integration of online approval of principal for hiring of new employees.",
      "Employees can apply & track leave",
      " Staff leave report to principal on daily basis",
      "Biometric/face attendance machine",
      "Generate Appointment letter",
      " Overtime Allowance",
      " Performance Tracking",
      " CTC Update",
      " CTC Master",
      "Calculation of increment impact",
    ],
    // buttonColor: "dark"
  },
  {
    title: "Compliance & Audit",
    features: [
      "Automatic posting of entry into financial books results in accuracy of financial books",
      "Salary Reconciliation",
      "PF & ESI Reconciliation",
      "Income Tax computation working",
    ],
    // buttonColor: "dark"
  },
];

const PayrollReport = () => {
  return (
    <div className="row-web wpo-courses-wrap service-row">
      {reportsPlans.map((plan, index) => (
        <div
          key={index}
          className="category-items col-lg-3 col-md-6 col-12 grid-web s3"
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

export default PayrollReport;
