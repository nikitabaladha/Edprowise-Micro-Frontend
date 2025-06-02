import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { GiAirplaneDeparture } from "react-icons/gi";
import { MdSupervisorAccount } from "react-icons/md";
import { GrWorkshop } from "react-icons/gr";
import { IoMdCloseCircle } from "react-icons/io";
import { TbDeviceMobileCog } from "react-icons/tb";
import { AiOutlineReconciliation } from "react-icons/ai";

const BusinessSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const handleItemClick = (course) => {
    if (course.keyFeatures) {
      setModalContent(course);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };
  const courses = [
    {
      id: "1",
      icon: <FaUserTie />,
      title: "PF Consultancy",
      serviceid: "1",
      keyFeatures: [
        {
          idFeature: 1,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "PF Registration & Compliance",
          featureDescription:
            "Assist schools in registering with the Provident Fund (PF) authorities and ensuring compliance with all applicable PF regulations and laws.",
        },
        {
          idFeature: 2,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "PF Calculation & Contributions",
          featureDescription:
            "Help calculate accurate PF contributions for both the employee and employer, ensuring timely and correct deductions as per government guidelines.",
        },
        {
          idFeature: 3,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "PF Account Management",
          featureDescription:
            "Provide assistance in managing individual PF accounts for employees, including transfers, withdrawals, and tracking balances.",
        },
        {
          idFeature: 4,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "PF Audits & Reconciliation",
          featureDescription:
            " Conduct regular audits and reconciliations of PF accounts to ensure accurate records and compliance with statutory requirements.",
        },
        {
          idFeature: 5,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "PF Withdrawal & Pension Guidance",
          featureDescription:
            "Offer guidance on PF withdrawal processes, pension eligibility, and other employee benefits related to the provident fund.",
        },
        {
          idFeature: 6,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "Regulatory Updates & Alerts",
          featureDescription:
            "Keep schools informed about any changes in PF laws and regulations, ensuring continuous compliance with new guidelines.",
        },
        {
          idFeature: 7,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: " PF Form Filing & Documentation",
          featureDescription:
            "Assist in the filing of PF-related forms (e.g., Form 19, Form 10C) and ensure proper documentation is maintained for audits and employee claims.",
        },
      ],
    },
    {
      id: "2",
      icon: <FaUserTie />,
      title: "ESI Consultancy",
      serviceid: "2",
      keyFeatures: [
        {
          idFeature: 1,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "ESI Registration & Compliance:",
          featureDescription:
            "Assist schools in registering with the Employee State Insurance (ESI) Corporation and ensure compliance with all ESI regulations and laws.",
        },
        {
          idFeature: 2,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "ESI Contribution Calculation",
          featureDescription:
            "Help calculate accurate ESI contributions for employees and employers, ensuring timely and correct deductions as per the prescribed rates.",
        },
        {
          idFeature: 3,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: " Employee ESI Enrollment",
          featureDescription:
            "Manage the enrollment process for employees, ensuring they are correctly registered under the ESI scheme for medical benefits and social security.",
        },
        {
          idFeature: 4,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: " ESI Claims Support",
          featureDescription:
            "Provide guidance and assistance in processing claims for medical benefits, sickness, maternity, and other entitlements under the ESI scheme. ",
        },
        {
          idFeature: 5,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "ESI Audits & Reconciliation",
          featureDescription:
            "Conduct regular audits of ESI accounts to ensure accurate records, resolve discrepancies, and ensure compliance with statutory requirements.",
        },
      ],
    },

    {
      id: "3",
      icon: <MdSupportAgent />,
      title: "Affiliation Support",
      serviceid: "3",
      keyFeatures: [
        {
          idFeature: 1,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "Affiliation Process Guidance",
          featureDescription:
            "Step-by-step assistance in understanding and applying for school affiliation with educational boards (CBSE, ICSE, state boards).",
        },
        {
          idFeature: 2,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "Documentation & Submission Support",
          featureDescription:
            "Help with gathering and submitting required documents like infrastructure reports, faculty qualifications, and financial statements.",
        },
        {
          idFeature: 3,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "Compliance with Board Requirements",
          featureDescription:
            " Ensure the school meets the board’s standards for infrastructure, faculty, and curriculum.",
        },
        {
          idFeature: 4,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "Inspection Preparation",
          featureDescription:
            "Guide the school in preparing for inspections, ensuring facilities and records meet board expectations. ",
        },
        {
          idFeature: 5,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "Renewal & Upgradation Assistance",
          featureDescription:
            "Assist with renewing affiliation and upgrading to higher levels, ensuring compliance with evolving board requirements.",
        },
      ],
    },
    {
      id: "4",
      icon: <GiAirplaneDeparture />,
      title: "International Tour Management",
      serviceid: "4",
      keyFeatures: [
        {
          idFeature: 1,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "Customizable Tour Packages",
          featureDescription:
            "Tailored travel packages for educational and cultural trips, with flexible options to suit group sizes and budgets.",
        },
        {
          idFeature: 2,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "Travel Planning & Coordination",
          featureDescription:
            "Handle all trip logistics, including flights, accommodations, transportation, and local activities.",
        },
        {
          idFeature: 3,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "Visa & Documentation Support",
          featureDescription:
            "Assist with visa applications, travel insurance, and necessary travel documentation.",
        },
        {
          idFeature: 4,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "On-Site Support",
          featureDescription:
            " Provide experienced guides and coordinators for smooth tour management and support throughout the trip.",
        },
        {
          idFeature: 5,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "Safety & Emergency Assistance",
          featureDescription:
            " Ensure traveler safety with 24/7 support and emergency protocols during the tour.",
        },
        {
          idFeature: 6,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "Educational Content & Activities",
          featureDescription:
            "Design educational tours that align with school curricula, offering students learning opportunities through cultural exposure, history, and hands-on activities. ",
        },
        {
          idFeature: 7,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "Budget Management",
          featureDescription:
            "Help schools stay within budget by offering competitive pricing, negotiating deals with airlines, hotels, and local vendors, and managing expenses effectively.",
        },
      ],
    },
    {
      id: "5",
      icon: <MdSupervisorAccount />,
      title: "Student Counselling",
      serviceid: "1",
      keyFeatures: [
        {
          idFeature: 1,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: " Personalized Counseling Sessions",
          featureDescription:
            " Offer one-on-one counseling sessions to address personal, academic, and emotional issues students may face.",
        },
        {
          idFeature: 2,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "Career Guidance",
          featureDescription:
            "Provide career counseling to help students choose the right career path based on their skills, interests, and aspirations.",
        },
        {
          idFeature: 3,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: " Mental Health Support ",
          featureDescription:
            "Offer support for mental health concerns, such as anxiety, stress, depression, and self-esteem issues, ensuring students’ emotional well-being.",
        },
        {
          idFeature: 4,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "Academic Performance Assistance",
          featureDescription:
            " Help students with time management, study techniques, and motivation to improve their academic performance and manage stress.",
        },
        {
          idFeature: 5,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: " Workshops & Group Counseling",
          featureDescription:
            " Organize workshops and group sessions on topics like communication skills, conflict resolution, and coping strategies to promote positive student development.",
        },
      ],
    },
    {
      id: "6",
      icon: <GrWorkshop />,
      title: "Training & Workshop for Teacher",
      serviceid: "2",
      keyFeatures: [
        {
          idFeature: 1,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "Teaching Methodology Enhancement ",
          featureDescription:
            "Improve classroom strategies, student engagement, and innovative teaching techniques.",
        },
        {
          idFeature: 2,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "Technology Integration ",
          featureDescription:
            "Train teachers on using digital tools, smart classrooms, and online learning platforms effectively.",
        },
        {
          idFeature: 3,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "Student Behavior & Classroom Management  ",
          featureDescription:
            " Provide strategies for handling discipline, student motivation, and fostering a positive learning environment.",
        },
        {
          idFeature: 4,
          featureIcon: <AiOutlineReconciliation />,
          featureTitle: "Curriculum & Assessment Development ",
          featureDescription:
            " Guide teachers in structuring lesson plans, designing assessments, and implementing competency-based learning.",
        },
        {
          idFeature: 5,
          featureIcon: <TbDeviceMobileCog />,
          featureTitle: "Personal & Professional Growth ",
          featureDescription:
            "Conduct workshops on stress management, leadership skills, communication, and continuous self-improvement.",
        },
      ],
    },
  ];

  return (
    <div className="row-web wpo-courses-wrap service-row">
      {courses.map((course) => (
        <div
          key={course.id}
          className={`category-items col-lg-3 col-md-6 col-6 grid-web s${course.serviceid}`}
        >
          <div
            className="wpo-courses-item category-itemm"
            onClick={() => handleItemClick(course)}
          >
            <div className="wpo-courses-text">
              <div className="courses-icon category-icons">
                {course.icon}
                {/* <i className={course.icon}></i> */}
              </div>
              <h2 className="category-h2 font-weight-web-h2">
                <a>{course.title}</a>
              </h2>
            </div>
            <a className="all-info">Know More...</a>
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
              <h1 className="mint-header">Strategic Advantage</h1>
              <div className="col-12 ">
                <div className="mint-steps ">
                  {modalContent &&
                    modalContent.keyFeatures &&
                    modalContent.keyFeatures.map((step, index) => (
                      <div className="mint-card col-lg-6 col-12">
                        <div key={step.idFeature} className="mint-card-content">
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
  );
};

export default BusinessSection;
