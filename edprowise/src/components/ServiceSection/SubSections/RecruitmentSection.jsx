import React, { useState } from "react";
import { GiMoneyStack } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { MdPostAdd } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { MdWorkHistory } from "react-icons/md";

const RecruitmentSection = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const items = [
    {
      id: "s1",
      icon: <MdWorkHistory />,
      title: "End to End Hiring Solutions",
      description:
        "Provide comprehensive support throughout the recruitment process, from sourcing candidates to onboarding them. These solutions streamline talent acquisition by handling job postings, candidate screenings, interview scheduling, and offer management.",
    },
    {
      id: "s2",
      icon: <GiTeacher />,
      title: "Search & Hire Teacher",
      description:
        "EdProwise streamlines teacher recruitment with its portal, offering job postings, automated screening, and interview scheduling. Schools access top talent efficiently, ensuring quick hiring and seamless onboarding, saving time and resources.",
    },
    {
      id: "s3",
      icon: <MdPostAdd />,
      title: "Post Vacant Position",
      description:
        "Enables schools to post vacant teaching positions effortlessly on its recruitment portal. With wide reach and targeted visibility, schools attract qualified candidates, ensuring a faster and more efficient hiring process.",
    },
    {
      id: "s4",
      icon: <HiClipboardDocumentList />,
      title: "Manage & Track Job",
      description:
        "EdProwise helps schools manage and track job applications efficiently through its recruitment portal. Schools can monitor application statuses, schedule interviews, and streamline communication, ensuring an organized and transparent hiring process.",
    },
    {
      id: "s5",
      icon: <FaClipboardList />,
      title: "Assessment of Candidate",
      description:
        "EdProwise facilitates candidate assessment by providing tools for skill tests, demo lesson evaluations, and structured interview processes. Schools can effectively gauge candidates' teaching abilities and fit for the role.",
    },
    {
      id: "s6",
      icon: <GiMoneyStack />,
      title: "No Yearly Subscription, Pay as per usage",
      description:
        "EdProwise provides a 'Pay as per Usage' model, allowing schools to pay only for the services they use, with no annual subscription. This flexible pricing ensures cost-efficiency and scalability based on recruitment needs.",
    },
  ];

  return (
    <div className="row-web wpo-courses-wrap service-row">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`category-items col-lg-3 col-md-6 col-12 grid-web ${item.id}`}
          // onMouseEnter={() => setHoveredItem(item.id)}
          // onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="wpo-courses-item category-itemm">
            <div className="wpo-courses-text">
              <div className="courses-icon category-icons">{item.icon}</div>
              <h2 className="category-h2 font-weight-web-h2">
                <a>{item.title}</a>
              </h2>
              <p>{item.description}</p>
            </div>

            {/* {hoveredItem === item.id && (
             <div className="description-box" >
                <p className="text-white">{item.description}</p>
              </div>
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecruitmentSection;
