import React from "react";

const coursesData = [
  {
    id: 1,
    title: "Fees Collection",
    description:
      " Ensure accurate & timely collection of fees with zero leakage. Streamlines the process, providing secure transactions and real-time tracking to maximize efficiency and minimize errors.",
    classid: 1,
  },
  {
    id: 2,
    title: "Flexible Payment",
    description:
      "Support Online payment, Bank Transfer , EMI, Cheque & Cash. Parents can pay fees at anytime (24*7) through parent portal & school application.",
    classid: 2,
  },
  {
    id: 3,
    title: "Fees Concession",
    description:
      "Manage the application for fees concession along with authorization of principal & automatically recording of fees concession ensuring correct financial..",
    classid: 3,
  },
  {
    id: 4,
    title: "Fees Reconciliation",
    description:
      "Detail analysis to identify the gap b/w fees dues & fees collected. The reason for lower fees are due to defaulter, late admission, left students,etc.",
    classid: 4,
  },
  {
    id: 5,
    title: "Defaulter Report",
    description:
      "Defaulter report highlights students with unpaid fees, detailing amounts owed and payment history, enabling schools to take prompt action and enhance collection strategies.",
    classid: 5,
  },
  {
    id: 6,
    title: "Reporting & Analytics",
    description:
      "Provides real-time reporting and analytics, offering insights into collections and outstanding balances. Customizable reports and dashboards empower schools to track trends and make informed financial decisions.",
    classid: 6,
  },
  {
    id: 7,
    title: "Fees Structure MGT.",
    description:
      " Fees structure management allows schools to customize and organize fee categories, ensuring clarity and flexibility in billing for different programs and services.",
    classid: 1,
  },
  {
    id: 8,
    title: "Integration With Financial",
    description:
      "Seamless integration with financial systems ensures accurate data synchronization, simplifies accounting processes, and enhances overall efficiency in fee management and reporting.",
    classid: 2,
  },
  {
    id: 9,
    title: "Audit Compliance",
    description:
      " Ensure compliance with audit such as fees reconciliation, No manual entry, remote audit,etc.",
    classid: 3,
  },
  {
    id: 10,
    title: "Parent Portal & School Application",
    description:
      "We provide parent portal & application through which parent can pay fees & track fees due.",
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

const SchoolFessKey = () => {
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

export default SchoolFessKey;
