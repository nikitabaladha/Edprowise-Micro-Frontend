import React from "react";
import { PiDeskBold } from "react-icons/pi";
import { TbDesk } from "react-icons/tb";
import { GiDesk } from "react-icons/gi";
import { IoConstructSharp } from "react-icons/io5";
import { BsBuildingFillUp } from "react-icons/bs";
import { RiArtboardLine } from "react-icons/ri";
import { TbPlayFootball } from "react-icons/tb";
import { FaFireExtinguisher } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { IoLibrarySharp } from "react-icons/io5";
import { TbAirConditioning } from "react-icons/tb";
import { MdScience } from "react-icons/md";
import { RiFilePaperLine } from "react-icons/ri";
import { TiNews } from "react-icons/ti";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiBuilding2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
const ProcurementSection = () => {
  const courses = [
    {
      id: "1",
      icon: <PiDeskBold />,
      title: "School Desk & Bench (Senior School)",
      classid: "1",
    },
    {
      id: "2",
      icon: <TbDesk />,
      title: "School Desk & Bench (Play School & KG)",
      classid: "2",
    },
    {
      id: "3",
      icon: <GiDesk />,
      title: "Office Furniture",
      classid: "3",
    },
    {
      id: "4",
      icon: <IoConstructSharp />,
      title: "Building Construction",
      classid: "4",
    },
    {
      id: "5",
      icon: <BsBuildingFillUp />,
      title: "Building Architecture Services",
      classid: "5",
    },
    {
      id: "6",
      icon: <RiArtboardLine />,
      title: "Classroom Board",
      classid: "1",
    },
    {
      id: "7",
      icon: <TbPlayFootball />,
      title: "Playways Equipment",
      classid: "2",
    },
    {
      id: "8",
      icon: <FaFireExtinguisher />,
      title: "Fire Extinguisher",
      classid: "3",
    },
    {
      id: "9",
      icon: <FaComputer />,
      title: "Computer & Its Accessories",
      classid: "4",
    },
    {
      id: "10",
      icon: <FaChalkboardTeacher />,
      title: "Smart Class Equipments",
      classid: "5",
    },
    {
      id: "11",
      icon: <TbAirConditioning />,
      title: "Air Cooling System",
      classid: "1",
    },
    {
      id: "12",
      icon: <RiBuilding2Line />,
      title: "Infrastructure Setup",
      classid: "2",
    },
    {
      id: "13",
      icon: <MdScience />,
      title: "Science Lab Equipments",
      classid: "3",
    },
    {
      id: "14",
      icon: <IoLibrarySharp />,
      title: "Library Books",
      classid: "4",
    },
    {
      id: 15,
      icon: <RiFilePaperLine />,
      title: "Exam Writing Paper",
      classid: 5,
    },
    {
      id: 16,
      icon: <TiNews />,
      title: "School Magazine & Prospectus",
      classid: 1,
    },
  ];

  return (
    <div className="row-web wpo-courses-wrap service-row">
      {courses.map((course) => (
        <div
          key={course.id}
          className={`category-items col-lg-3 col-md-6 col-6 grid-web s${course.classid}`}
        >
          <div className="wpo-courses-item category-itemm">
            <div className="wpo-courses-text">
              <div className="courses-icon category-icons">
                {course.icon}
                {/* <i className={course.icon}></i> */}
              </div>
              <h2 className="category-h2 font-weight-web-h2">{course.title}</h2>
              {/* <p className="category-text">{course.description}</p> */}
            </div>
            <Link to={"/login"} className="all-info">
              Buy Now...
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcurementSection;
