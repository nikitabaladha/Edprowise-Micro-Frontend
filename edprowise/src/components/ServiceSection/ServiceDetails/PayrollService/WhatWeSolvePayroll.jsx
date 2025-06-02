import React from "react";

const coursesData = [
  {
    id: 1,
    title: "Fees & Payroll software not linked to accounting software",
    description:
      " EdProwise ERP software seamlessly integrates with the finance module, automating the posting of entries for fees received , fees concessions, Salary & expenses in finance module, eliminating manual data entry errors and saving administrative time.",
    classid: 1,
  },
  {
    id: 2,
    title: "Manual processing of salary payment",
    description:
      "Automatic salary payment at the end of the month which simplifies & streamlines the payroll process This feature enhances efficiency, reduces errors, and ensures timely payments.",
    classid: 2,
  },
  {
    id: 3,
    title: "Gratuity & LE Report",
    description:
      "Gratuity and Leave Encashment (LE) Report are essential components of payroll. Track & report on employee entitlements for gratuity and leave encashment, ensuring compliance with legal requirements and accurate financial planning.",
    classid: 3,
  },
  {
    id: 4,
    title: "Audit Requirement",
    description:
      "Our system is designed to fulfill all auditor requirements efficiently and effectively like fees reconciliation, salary reconciliation, PF& ESI reconciliation, fixed Assets register along with copy of Invoice, & remote audit.",
    classid: 4,
  },
  {
    id: 5,
    title:
      "End to End Services for Educational Institutions (Dealing with multiple vendors)",
    description:
      " We offer a comprehensive range of services, including technology integration, administrative solutions, educational consultation, and professional development. Our tailored support enhances all aspects of educational operations, allowing school management to streamline processes and avoid the hassle of dealing with multiple vendors.",
    classid: 5,
  },
];
const WhatWeSolvePayroll = () => {
  return (
    <div className="row-web wpo-courses-wrap service-row">
      {coursesData.map((course) => (
        <div
          className={`category-items col-lg-3 col-md-6 col-12 grid-web s${course.classid}`}
        >
          <div className="wpo-courses-item category-itemm">
            <div className="wpo-courses-text">
              {/* <div className="courses-icon category-icons">{icon}</div> */}
              <h2 className="category-h2 font-weight-web-h2">
                <a>{course.title}</a>
              </h2>
            </div>
            <p className="all-info">{course.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhatWeSolvePayroll;
