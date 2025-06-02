import React from "react";

const coursesData = [
  {
    id: 1,
    title: "Invoice Processing Tool",
    description:
      " Automates invoice receipt, validation, and payment, improving efficiency, reducing errors, and ensuring timely payments.",
    classid: 1,
  },
  {
    id: 2,
    title: "Online Payments To Vendors",
    description:
      "Payments to vendors can be made online through an invoice processing tool, enabling secure, efficient, and automated transaction management.",
    classid: 2,
  },
  {
    id: 3,
    title: "Online Invoice Availability",
    description:
      "Online invoice availability ensures instant access, enabling real-time tracking, faster payments, efficient management, and improved transparency for businesses and vendors.",
    classid: 3,
  },
  {
    id: 4,
    title: "Automatic TDS Calculations",
    description:
      "Streamline tax compliance by accurately computing tax deductions, reducing manual errors, ensuring timely payments, and improving financial accuracy.",
    classid: 4,
  },
  {
    id: 5,
    title: "Automated Entries",
    description:
      "Once invoice is processed & +payment made to vendor entry +will be posted automated in +books of account which reduces +manual error & enhance +accuracy.",
    classid: 5,
  },
  {
    id: 6,
    title: "Ease In GL Selection",
    description:
      "Predefined ledgers are created in the system to facilitate user selection of GL accounts, improving accuracy and minimizing errors in financial transactions.",
    classid: 6,
  },
  {
    id: 7,
    title: "Mis Reporting",
    description:
      " Provides critical insights through data collection and analysis, enabling informed decision-making and enhancing organizational performance through effective monitoring and evaluation.",
    classid: 1,
  },
  {
    id: 8,
    title: "Dashboard And Insight",
    description:
      "Dashboards provide real-time insights through visual representations of data, enabling quick analysis, informed decision making, and improved performance monitoring across organizations.",
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
    title: "No Manual Work",
    description:
      "This tool avoid manual work through automation, reducing errors, saving time, and enhancing efficiency in operations and data management.",
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

const FinanceKeyFeacher = () => {
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

export default FinanceKeyFeacher;
