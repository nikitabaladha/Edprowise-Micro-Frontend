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
    send: "/fees",
  },
  {
    id: 2,
    icon: <GiReceiveMoney />,
    title: "Payroll Management Software – Ease Payroll",
    classid: 2,
    send: "/payroll",
  },
  {
    id: 3,
    icon: <FcMoneyTransfer />,
    title: "Financial Management Software – Book Sync",
    classid: 3,
  },
  {
    id: 4,
    icon: <FaBusinessTime />,
    title: "School Operational Management Software",
    classid: 4,
  },
  {
    id: 5,
    icon: <MdInstallMobile />,
    title: "School Mobile Application",
    classid: 5,
  },
  { id: 6, icon: <FaLaptopCode />, title: "School Website Design", classid: 6 },
  {
    id: 7,
    icon: <TbDeviceMobileCog />,
    title: "Digital Exam Result System",
    classid: 1,
  },
  {
    id: 8,
    icon: <AiOutlineReconciliation />,
    title: "Digital Student Attendance",
    classid: 2,
  },
  {
    id: 9,
    icon: <AiOutlineReconciliation />,
    title: "Digital Staff Attendance",
    classid: 3,
  },
  {
    id: 10,
    icon: <IoLibrarySharp />,
    title: "Library Management Software",
    classid: 4,
  },
  {
    id: 11,
    icon: <RiFilePaperFill />,
    title: "Entrance Management Software",
    classid: 5,
  },
  {
    id: 12,
    icon: <TbDeviceMobileDollar />,
    title: "Online Payment Gateway",
    classid: 1,
  },
  {
    id: 13,
    icon: <TbDeviceMobileMessage />,
    title: "SMS & WhatsApp Integration Services",
    classid: 2,
  },
];

const CourseItem = ({ icon, title, classid, send }) => {
  const navigate = useNavigate();

  const handleRoutes = () => {
    if (send) {
      navigate(send); // Navigate only if `send` is defined
    }
  };

  return (
    <div
      className={`category-items col-lg-3 col-md-6 col-6 grid-web s${classid}`}
    >
      <div className="wpo-courses-item category-itemm" onClick={handleRoutes}>
        <div className="wpo-courses-text">
          <div className="courses-icon category-icons">{icon}</div>
          <h2 className="category-h2 font-weight-web-h2">
            <a>{title}</a>
          </h2>
        </div>
        <Link to={send} className="all-info">
          Know More...
        </Link>
      </div>
    </div>
  );
};

// DigitalSection
const TestingforPop = () => {
  return (
    <div className="row-web wpo-courses-wrap service-row">
      {coursesData.map((course) => (
        <CourseItem
          key={course.id}
          icon={course.icon}
          title={course.title}
          classid={course.classid}
          send={course.send}
        />
      ))}
    </div>
  );
};

export default TestingforPop;
