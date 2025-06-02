import React, { useState } from "react";

const SchoolApplicationKeyFeature = () => {
  const [activeTab, setActiveTab] = useState("buyer");

  const chooseDataPrinciple = [
    {
      id: 1,
      title: "Daily Fees Collection Notification",
      description: "Alerts for fee collection updates and reminders.",
      classNameS: "s1",
    },
    {
      id: 2,
      title: "Approval Flow",
      description:
        "Streamlined process for approving leave requests, expenses, and other activities.",
      classNameS: "s2",
    },
    {
      id: 3,

      title: "Self Notes (My Notes)",
      description:
        "A personal space for the principal to take and store notes.",
      classNameS: "s3",
    },
    {
      id: 4,

      title: "MIS Report (Monthly P&L, KPI, etc.)",
      description:
        "Access to financial reports and key performance indicators.",
      classNameS: "s4",
    },
    {
      id: 5,
      title: "Staff Leave & Late Arrival Report",
      description:
        "Track and manage staff attendance, leave, and late arrivals.",
      classNameS: "s2",
    },
    {
      id: 6,
      title: "Student Absence Report",
      description: "View and manage student attendance, including absences.",
      classNameS: "s3",
    },
    {
      id: 7,
      title: "Place Orders to EdProwise",
      description:
        "Directly place orders for services or products from EdProwise.",
      classNameS: "s4",
    },
  ];

  const chooseDataTeacher = [
    {
      id: 1,
      title: "Student Attendance",
      description: "Mark student attendance and track absenteeism.",
      classNameS: "s1",
    },
    {
      id: 2,
      title: "Teacher Timetable",
      description: "View and manage teaching schedules and room assignments.",
      classNameS: "s2",
    },
    {
      id: 3,
      title: "Self Notes (My Notes)",
      description: " Keep track of personal notes, reminders, and tasks.",
      classNameS: "s3",
    },
    {
      id: 4,
      title: "Online Notice Board",
      description:
        "Receive and share important school announcements and updates.",
      classNameS: "s4",
    },
    {
      id: 5,
      title: "Exam Timetable",
      description: "Access exam schedules and related details.",
      classNameS: "s1",
    },
    {
      id: 6,
      title: "Self Services",
      description: "Manage personal and professional details.",
      classNameS: "s2",
    },
    {
      id: 7,
      title: "View Salary Slip",
      description: "Access and view salary details and payment history.",
      classNameS: "s3",
    },
    {
      id: 8,
      title: "Income Tax Declaration & Computation",
      description:
        "Submit income tax declarations and view tax computation sheets.",
      classNameS: "s4",
    },
    {
      id: 9,
      title: "Form 16",
      description: "Access the Form 16 for tax purposes.",
      classNameS: "s1",
    },
    {
      id: 10,
      title: "My Loan Statement",
      description: "View loan details and repayment status.",
      classNameS: "s2",
    },
    {
      id: 11,
      title: "My Attendance Report",
      description: "View personal attendance and leave records.",
      classNameS: "s3",
    },
    {
      id: 12,
      title: "Apply for Leave",
      description: "Request leave and track approval status.",
      classNameS: "s4",
    },
    {
      id: 13,
      title: "School Holidays View",
      description:
        "Stay informed about school holidays and vacation schedules.",
      classNameS: "s1",
    },
    {
      id: 14,
      title: "Upload Homework for Students",
      description: "Upload assignments, track submissions, and grade homework.",
      classNameS: "s2",
    },
    {
      id: 15,
      title: "Class Group Chat",
      description:
        "Participate in class discussions and share information with students.",
      classNameS: "s3",
    },
    {
      id: 16,
      title: "Update Exam Results",
      description: "Input and manage exam results for students.",
      classNameS: "s4",
    },
    {
      id: 17,
      title: "Training Tools",
      description:
        "Access tools and resources for teacher development and training.",
      classNameS: "s1",
    },
  ];

  const chooseDataStudent = [
    {
      id: 1,
      title: "Fee Payment",
      description: "Pay school fees securely and track payment history.",
      classNameS: "s1",
    },
    {
      id: 2,
      title: "Student Progress",
      description: "View academic progress, exam results, and report cards.",
      classNameS: "s2",
    },
    {
      id: 3,
      title: "Attendance Tracking",
      description: "Track attendance and stay updated on any absences.",
      classNameS: "s3",
    },
    {
      id: 4,
      title: "Class Schedule",
      description: "View class schedules, assignments, and homework deadlines.",
      classNameS: "s4",
    },
    {
      id: 5,
      title: "Exam Timetable",
      description: "Access exam schedules and preparation details.",
      classNameS: "s1",
    },
    {
      id: 6,
      title: "Homework Tracker",
      description:
        "View homework assignments, submit work, and track due dates.",
      classNameS: "s2",
    },
    {
      id: 7,
      title: "Communication with Teachers",
      description:
        "Directly communicate with teachers about progress, assignments, and concerns.",
      classNameS: "s3",
    },
    {
      id: 8,
      title: "School Event Calendar",
      description:
        "Stay informed about upcoming school events, activities, and holidays.",
      classNameS: "s4",
    },
    {
      id: 9,
      title: "Notice Board Updates",
      description:
        "Receive school notices, announcements, and updates in real time.",
      classNameS: "s1",
    },
    {
      id: 10,
      title: "Feedback/Grades",
      description:
        "View and provide feedback on exams, assignments, and overall academic performance.",
      classNameS: "s2",
    },
  ];
  return (
    <>
      <section className="wpo-courses-section-s2 section-padding pt-0 pb-0">
        <div className="container">
          <div className="tabs p-1">
            <button
              id="buyerTab"
              className={`tab-appli-keyfeacher theme-choose-btn ${
                activeTab === "buyer" ? "active" : ""
              }`}
              onClick={() => setActiveTab("buyer")}
            >
              Principal
            </button>
            <button
              id="supplierTab"
              className={`tab-appli-keyfeacher theme-choose-btn ${
                activeTab === "supplier" ? "active" : ""
              }`}
              onClick={() => setActiveTab("supplier")}
            >
              Teacher
            </button>
            <button
              id="studentTab"
              className={`tab-appli-keyfeacher theme-choose-btn ${
                activeTab === "student" ? "active" : ""
              }`}
              onClick={() => setActiveTab("student")}
            >
              Student/Parents
            </button>
          </div>
          <div
            className={`show-tab ${activeTab === "buyer" ? "active" : ""}`}
            id="buyerSection"
          >
            <div className="row-web wpo-courses-wrap">
              {chooseDataPrinciple.map((item) => (
                <div
                  key={item.id}
                  className={`category-items col-lg-3 col-md-6 col-12 grid-web ${item.classNameS}`}
                >
                  <div className="wpo-courses-item category-itemm">
                    <div className="wpo-courses-text">
                      <h2 className="category-h2 font-weight-web-h2">
                        <a>{item.title}</a>
                      </h2>
                      <p className="category-text font-family-web ">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`show-tab ${activeTab === "supplier" ? "active" : ""}`}
            id="supplierSection"
          >
            <div className="row-web wpo-courses-wrap">
              {chooseDataTeacher.map((item) => (
                <div
                  key={item.id}
                  className={`category-items col-lg-3 col-md-6 col-12 grid-web ${item.classNameS}`}
                >
                  <div className="wpo-courses-item category-itemm">
                    <div className="wpo-courses-text">
                      <h2 className="category-h2 font-weight-web-h2">
                        <a>{item.title}</a>
                      </h2>
                      <p className="category-text font-family-web">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`show-tab ${activeTab === "student" ? "active" : ""}`}
            id="studentSection"
          >
            <div className="row-web wpo-courses-wrap">
              {chooseDataStudent.map((item) => (
                <div
                  key={item.id}
                  className={`category-items col-lg-3 col-md-6 col-12 grid-web ${item.classNameS}`}
                >
                  <div className="wpo-courses-item category-itemm">
                    <div className="wpo-courses-text">
                      <h2 className="category-h2 font-weight-web-h2">
                        <a>{item.title}</a>
                      </h2>
                      <p className="category-text font-family-web">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SchoolApplicationKeyFeature;
