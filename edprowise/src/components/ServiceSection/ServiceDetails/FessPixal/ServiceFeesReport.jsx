import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const reportsPlans = [
  {
    title: " Form & Receipts",
    features: [
      "Registration Form",
      "Admission Form",
      "TC  Form",
      " Fees Concession Form",
      " School Fees Receipts",
      "Board  registration & exam fees tracking",
    ],
  },
  {
    title: "Report",
    features: [
      "Daily Collection Register",
      "Fees Concession Report",
      "Defaulter Report",
      "Report on loss of fees due to late admission",
      "Report on loss of fees left students",
      "Students ledger",
      "Fee wise collection report",
      "Admission Fees, Registration Fees, TC Fees ,Board  Registration & Board Exam fees report",
      "Arrear  fees received & Advance fees received report ",
      "Late Fees, Excess fees & Fees refund report",
      "Student Master & Fees Structure",
      "Other Multiple reports",
    ],
    // buttonColor: "success"
  },
  {
    title: "Compliance & Audit",
    features: [
      "Automatic posting of fees entry into financial books results in accuracy of financial books.",
      "Head Wise Fees Reconciliation (Reconciliation between Fees dues & fees Received).",
      "Fees Wise Reconciliation ( Reconciliation between Fees dues & fees Received).",
      "Reconciliation of fees between Fees Software & Financial books.",
      "Remote Audit Facility",
    ],
    // buttonColor: "dark"
  },
  {
    title: "Tech Enabled",
    features: [
      "Online Payment facility (Payment Gateway).",
      "Integration of online approval of principal for admission & fees concession form.",
      "SMS Reminder to parents for fees payment before & after due date",
      "Parent Portal & School App for Parents",
      " Update on daily collection of fees to management through SMS",
      "Graphical view on students & fees.",
      "KPI to monitor the performance of institution.",
    ],
    // buttonColor: "dark"
  },
];

const ServiceFeesReport = () => {
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

export default ServiceFeesReport;
