import React from "react";

const coursesData = [
  {
    id: 1,
    title: "Define Salary Structure & Inbuilt Offer Letter",
    description:
      "  Define salary structure with customizable components and generate inbuilt offer letters, streamlining the hiring process and ensuring clear communication of compensation details.",
    classid: 1,
  },
  {
    id: 2,
    title: "Attendance MGT & Employee Self Services",
    description:
      " Deployment of face/biometric machine for attendance & provide attendance report. Application for employees through which employees can apply & track leave, Salary Slip, Tax Management, etc.",
    classid: 2,
  },
  {
    id: 3,
    title: "Automate Salary Payment",
    description:
      "Automatic salary payment at the end of the month which simplifies & streamlines the payroll process This feature enhances efficiency, reduces errors, and ensures timely payments.",
    classid: 3,
  },
  {
    id: 4,
    title: "Deduction & Benefits",
    description:
      "Manages  PF , ESI & Tax as per laws to ensure accurate calculations & transparent communication of employee entitlements and withholdings.",
    classid: 4,
  },
  {
    id: 5,
    title: "Salary,Pf & ESI Recon",
    description:
      " Ensures accurate financial records by comparing payroll data with contributions, enhancing compliance and streamlining auditing processes. Reconcile data between Payroll & Financial.",
    classid: 5,
  },
  {
    id: 6,
    title: "Reporting & Analytics",
    description:
      " Reporting and analytics provide valuable insights into payroll trends, expenses, and employee performance, enabling data-driven decisions and optimizing financial management strategies.",
    classid: 6,
  },
  {
    id: 7,
    title: "Tax Management",
    description:
      "  Tax management streamlines calculations, ensures compliance with regulations, and facilitates timely submissions, minimizing liabilities and optimizing tax strategies for organizations.",
    classid: 1,
  },
  {
    id: 8,
    title: "Salary Slip",
    description:
      " Generates salary slips for employees, providing a clear breakdown of earnings, deductions, and net pay, ensuring transparency and understanding of compensation.",
    classid: 2,
  },
  {
    id: 9,
    title: "Audit Compliance",
    description:
      "Ensure compliance with audit such as person wise salary, Salary recon, Tax Calculation, PF & ESI Reconciliation, Audit Remote, etc.",
    classid: 3,
  },
  {
    id: 10,
    title: "Data Security & Access",
    description:
      "Data security and access controls protect sensitive information, ensuring only authorized users can access fee data, maintaining confidentiality and preventing unauthorized transactions.",
    classid: 4,
  },
];

const CourseItem = ({ title, description, classid }) => {
  return (
    <div
      className={`category-items col-lg-3 col-md-6 col-12 grid-web s${classid}`}
    >
      <div className="wpo-courses-item category-itemm">
        <div className="wpo-courses-text">
          {/* <div className="courses-icon category-icons">{icon}</div> */}
          <h2 className="category-h2 font-weight-web-h2">
            <a>{title}</a>
          </h2>
        </div>
        <p className="all-info">{description}</p>
      </div>
    </div>
  );
};

const PayrollKeyFeacher = () => {
  return (
    <div className="row-web wpo-courses-wrap service-row">
      {coursesData.map((course) => (
        <CourseItem
          key={course.id}
          title={course.title}
          description={course.description}
          classid={course.classid}
        />
      ))}
    </div>
  );
};

export default PayrollKeyFeacher;
