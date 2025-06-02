import React, { useState } from "react";
import {
  FaMoneyBillTrendUp,
  FaBusinessTime,
  FaLaptopCode,
} from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdInstallMobile } from "react-icons/md";
import {
  TbDeviceMobileCog,
  TbDeviceMobileDollar,
  TbDeviceMobileMessage,
} from "react-icons/tb";
import { AiOutlineReconciliation } from "react-icons/ai";
import { IoLibrarySharp } from "react-icons/io5";
import { RiFilePaperFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
const coursesData = [
  {
    id: 1,
    icon: <FaMoneyBillTrendUp />,
    title: "School Fees Management Software - Pixel Fees",
    classid: 1,
    send: "/services/digital-services/school-fees-management",
  },
  {
    id: 2,
    icon: <GiReceiveMoney />,
    title: "Payroll Management Software – Ease Payroll",
    classid: 2,
    send: "/services/digital-services/school-payroll",
  },
  {
    id: 3,
    icon: <FcMoneyTransfer />,
    title: "Financial Management Software – Book Sync",
    classid: 3,
    send: "/services/digital-services/school-financial-management",
  },
  {
    id: 4,
    icon: <FaBusinessTime />,
    title: "School Operational Management Software",
    classid: 4,
    send: "/services/digital-services/school-operation-management",
  },
  {
    id: 5,
    icon: <MdInstallMobile />,
    title: "School Mobile Application",
    classid: 5,
    send: "/services/digital-services/school-mobile-application",
  },
  {
    id: 6,
    icon: <FaLaptopCode />,
    title: "School Website Design",
    classid: 6,
    send: "/services/digital-services/school-website-design",
  },
  {
    id: 7,
    icon: <TbDeviceMobileCog />,
    title: "Digital Exam Result System",
    classid: 1,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Automated Result Calculation & Grading",
        featureDescription:
          "Automatically calculates and posts results based on customizable grading systems, including percentages, GPA, and letter grades, reducing manual errors and saving time.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Real-Time Result Access",
        featureDescription:
          "Students and parents can access exam results instantly, with the ability to download reports, view individual performance, and track subject-wise analysis.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Secure Access & Verification",
        featureDescription:
          "Results are available securely through personalized logins for students, parents, and teachers. Students can verify their results before final publication, ensuring accuracy and transparency.",
      },
      {
        idFeature: 4,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Comprehensive Performance Analytics",
        featureDescription:
          "Provides detailed insights into student performance, including grade trends, subject-wise analysis, and overall results, helping educators assess areas for improvement.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Integration & Report Generation",
        featureDescription:
          "Seamlessly integrates with other school management systems and generates downloadable reports (PDF, Excel, etc.), while also allowing for the automated re-check process if students request a review.",
      },
    ],
  },
  {
    id: 8,
    icon: <AiOutlineReconciliation />,
    title: "Digital Student Attendance",
    classid: 2,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Automated Result Processing",
        featureDescription:
          "Automatically records student attendance through various methods like biometric systems, RFID, or mobile apps, reducing manual errors and saving time.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Result Analytics",
        featureDescription:
          "Teachers, students, and parents can access real-time attendance data, with immediate notifications for absentees and late arrivals.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: " Leave Management",
        featureDescription:
          "Students can apply for leave through the system, and attendance records are updated automatically upon approval, ensuring seamless integration with attendance reports.",
      },
      {
        idFeature: 4,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Attendance Reports & Analytics",
        featureDescription:
          "Generate detailed reports that track student attendance patterns, including tardiness, absenteeism, and overall attendance percentage for better monitoring and intervention.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Secure Access & Notifications",
        featureDescription:
          "Secure access for teachers, parents, and school administrators to view attendance data. Automated notifications are sent to parents for unexplained absences or late arrivals.",
      },
    ],
  },
  {
    id: 9,
    icon: <AiOutlineReconciliation />,
    title: "Digital Staff Attendance",
    classid: 3,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Biometric/Face Recognition & RFID Integration",
        featureDescription:
          "Staff attendance is recorded automatically through biometric systems, face recognition, or RFID, ensuring accurate and secure attendance logging.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: " Real-Time Attendance Monitoring",
        featureDescription:
          "Provides real-time tracking of staff attendance, including arrival and departure times, allowing for immediate access to attendance data. ",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Leave Management & Approval",
        featureDescription:
          "Staff can apply for leave, track approval status, and update their attendance records accordingly, while administrators can easily manage leave requests and maintain accurate records.",
      },
      {
        idFeature: 4,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Attendance Reports & Analytics ",
        featureDescription:
          "Generates detailed reports on staff attendance, including late arrivals, absences, and overall attendance percentage, offering insights for HR management and compliance. ",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Automated Notifications & Alerts",
        featureDescription:
          "Sends automated alerts for tardiness, absenteeism, and leave status to the concerned staff members and HR team, ensuring timely follow-up and action.",
      },
    ],
  },
  {
    id: 10,
    icon: <IoLibrarySharp />,
    title: "Library Management Software",
    classid: 4,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Book Cataloging & Search",
        featureDescription:
          "Efficiently catalogs books and other materials in the library, allowing users (students, staff) to search for titles by author, subject, ISBN, or keyword, with detailed information about each item.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Barcode/QR Code Integration: ",
        featureDescription:
          " Utilizes barcode or QR code scanning for quick check-ins and check-outs of library items, ensuring accurate tracking and reducing manual data entry.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Reporting & Analytics",
        featureDescription:
          ": Generates reports on library usage, popular books, overdue items, and inventory status. Analytics help the library team assess trends and improve resource management.",
      },
    ],
  },
  {
    id: 11,
    icon: <RiFilePaperFill />,
    title: "Entrance Management Software",
    classid: 5,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Online Registration & Application",
        featureDescription:
          "Enables students to register for entrance exams online, submit necessary documents, and track their application status in real-time, streamlining the entire registration process.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Admit Card Generation ",
        featureDescription:
          "Automatically generates and sends digital admit cards to students, including exam details, venue, and schedule, reducing manual errors and ensuring timely distribution.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Exam Scheduling & Slot Management",
        featureDescription:
          "Manages multiple exam dates, times, and slots, ensuring efficient scheduling of students based on their preferences or availability, while avoiding overlaps.",
      },
      {
        idFeature: 4,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Secure Exam Environment: ",
        featureDescription:
          "Provides features to ensure a secure examination environment, such as live tracking of exam sessions, monitoring of attendance, and restriction of unauthorized access. ",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "Result Processing & Reporting:Result Processing & Reporting",
        featureDescription:
          " Automates the grading process and generates detailed results, including performance analytics, rank lists, and scorecards, for both students and administrators.",
      },
    ],
  },
  {
    id: 12,
    icon: <TbDeviceMobileDollar />,
    title: "Online Payment Gateway",
    classid: 1,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Multiple Payment Methods",
        featureDescription:
          ": Supports various payment options such as credit/debit cards, net banking, UPI, wallets, and EMI options, allowing parents and students to choose the most convenient method for fee payment.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Secure Transactions ",
        featureDescription:
          "Ensures secure, encrypted payment processing to protect sensitive financial information, adhering to industry standards like PCI-DSS for data security. ",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Instant Payment Confirmation",
        featureDescription:
          " Provides real-time payment confirmation and receipt generation, allowing parents to receive immediate acknowledgment of payment and reducing administrative workload.",
      },
      {
        idFeature: 4,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: " Integration with School Management Systems",
        featureDescription:
          "Seamlessly integrates with the school’s financial management and fee tracking system, updating payment records automatically and reducing manual data entry.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Payment History & Reports",
        featureDescription:
          "Allows users (students/parents) to view their payment history, including past transactions, receipts, and outstanding dues. The school can generate reports for auditing and financial tracking.",
      },
    ],
  },
  {
    id: 13,
    icon: <TbDeviceMobileMessage />,
    title: "SMS & WhatsApp Integration Services",
    classid: 2,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Automated Notifications",
        featureDescription:
          "Instantly send updates on exams, events, and emergencies to students, parents, and staff.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Attendance Alerts ",
        featureDescription:
          " Notify parents about student absences, late arrivals, and leave approvals. ",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Fee Payment Reminders",
        featureDescription:
          "Send reminders for due payments and confirm successful transactions.",
      },
      {
        idFeature: 4,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "  Parent-Teacher Communication",
        featureDescription:
          "Enable direct, quick communication between parents and teachers via SMS/WhatsApp. ",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: " Bulk Messaging",
        featureDescription:
          "Efficiently send personalized messages to large groups, saving time and enhancing communication.",
      },
    ],
  },
];

const DigitalSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (course) => {
    if (course.send) {
      navigate(course.send);
    } else {
      setModalContent(course);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <div className="page-wrapper">
      <div className="row-web wpo-courses-wrap service-row">
        {coursesData.map((course, index) => (
          <div
            key={course.id}
            className={`category-items col-lg-3 col-md-6 col-6 grid-web s${course.classid}`}
          >
            <div
              className="wpo-courses-item category-itemm"
              onClick={() => handleItemClick(course)}
            >
              <div className="wpo-courses-text">
                <div className="courses-icon category-icons">{course.icon}</div>
                <h2 className="category-h2 font-weight-web-h2">
                  {course.title}
                </h2>
              </div>
              <Link to={course.send} className="all-info">
                Know More...
              </Link>
            </div>
          </div>
        ))}
        {showModal && (
          <div className="image-modal">
            <div className="modal-content overflow-auto">
              {/* <div>{modalContent}</div> */}
              {/* <ServiceTabs/> */}
              {/* <img src={modalContent} alt="Modal" className="modal-image" /> */}
              <div className="mint-container overflow-auto">
                <h1 className="mint-header">Features</h1>
                <div className="col-12 ">
                  <div className="mint-steps ">
                    {modalContent &&
                      modalContent.keyFeatures &&
                      modalContent.keyFeatures.map((step, index) => (
                        <div className="mint-card col-lg-6 col-12">
                          <div
                            key={step.idFeature}
                            className="mint-card-content"
                          >
                            {/* <div className="mint-icon">{step.featureIcon}</div> */}
                            {/* <img className="mint-icon" src={step.featureIcon} /> */}
                            <div className="mint-text-content">
                              <h3 className="mint-title text-center">
                                {step.featureTitle}
                              </h3>
                              <p className="mint-description">
                                {step.featureDescription}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="text-dark modal-close" onClick={closeModal}>
                <IoMdCloseCircle />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalSection;
