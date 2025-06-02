import React, { useState, useRef, useEffect } from "react";

const schoolOpsData = [
  {
    id: "schoolOpsOne",
    headingId: "schoolOpsHeadingOne",
    question: "What is SchoolOps?",
    answer:
      "SchoolOps is a comprehensive operational management software designed for schools to streamline various administrative processes, including digital exam results, attendance tracking, admission management, library services, and more.",
  },
  {
    id: "schoolOpsTwo",
    headingId: "schoolOpsHeadingTwo",
    question: "How does SchoolOps help with digital exam results management?",
    answer:
      "SchoolOps allows schools to enter, manage, and publish exam results digitally, providing students with instant access to their scores and performance reports in a secure and easy-to-use platform.",
  },
  {
    id: "schoolOpsThree",
    headingId: "schoolOpsHeadingThree",
    question: "Does SchoolOps track staff and student attendance?",
    answer:
      "Yes, SchoolOps includes a digital attendance system that records and tracks both student and staff attendance in real-time, ensuring accurate records and reducing manual errors.",
  },
  {
    id: "schoolOpsFour",
    headingId: "schoolOpsHeadingFour",
    question: "How does SchoolOps manage admissions?",
    answer:
      "SchoolOps simplifies the entire admission process, from application submission to seat allocation, by automating forms, handling inquiries, and tracking the status of applications, making the process more efficient.",
  },
  {
    id: "schoolOpsFive",
    headingId: "schoolOpsHeadingFive",
    question: "Can SchoolOps be used for library management?",
    answer:
      "Yes, SchoolOps includes a library management feature that helps schools manage book inventory, issue and return records, track late returns, and generate library-related reports.",
  },
  {
    id: "schoolOpsSix",
    headingId: "schoolOpsHeadingSix",
    question: "How does the enquiry management system in SchoolOps work?",
    answer:
      "SchoolOps features an enquiry management module that helps schools handle and track enquiries from prospective students and parents, ensuring timely responses and follow-ups.",
  },
  {
    id: "schoolOpsSeven",
    headingId: "schoolOpsHeadingSeven",
    question: "Does SchoolOps support online payments?",
    answer:
      "Yes, SchoolOps integrates with secure online payment gateways, enabling schools to accept fee payments, donations, and other transactions online, making payment collection hassle-free for both students and administration.",
  },
  {
    id: "schoolOpsEight",
    headingId: "schoolOpsHeadingEight",
    question: "How does SchoolOps use SMS & WhatsApp services?",
    answer:
      "SchoolOps includes built-in SMS and WhatsApp integration, allowing schools to send important notifications, updates, alerts, and reminders to students, staff, and parents quickly and efficiently.",
  },
  {
    id: "schoolOpsNine",
    headingId: "schoolOpsHeadingNine",
    question: "How does SchoolOps help with exam scheduling?",
    answer:
      "SchoolOps offers an exam timetable feature that allows schools to easily create, manage, and share exam schedules with students and staff, ensuring smooth exam planning and coordination.",
  },
  {
    id: "schoolOpsTen",
    headingId: "schoolOpsHeadingTen",
    question: "Does SchoolOps include a teacher feedback system?",
    answer:
      "Yes, SchoolOps has a teacher feedback module that allows students and parents to provide valuable feedback on teaching quality, helping schools assess and improve their educational standards.",
  },
  {
    id: "schoolOpsEleven",
    headingId: "schoolOpsHeadingEleven",
    question: "Can SchoolOps be customized for specific school requirements?",
    answer:
      "Yes, SchoolOps is highly customizable and can be tailored to meet the unique needs of different schools, including custom reports, workflows, and user permissions.",
  },
  {
    id: "schoolOpsTwelve",
    headingId: "schoolOpsHeadingTwelve",
    question: "Is SchoolOps secure and compliant with regulations?",
    answer:
      "Yes, SchoolOps follows strict security protocols to ensure the privacy and protection of all school data, and it complies with educational regulations and standards.",
  },
  {
    id: "schoolOpsThirteen",
    headingId: "schoolOpsHeadingThirteen",
    question: "How can schools get started with SchoolOps?",
    answer:
      "Schools can request a demo through our website. Our team will guide you through the setup, customization, and training process to ensure smooth implementation.",
  },
];

const SchoolOpsFAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active FAQ index
  const contentRefs = useRef([]);
  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle the active index
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, i) => {
      if (!ref) return;
      if (i === activeIndex) {
        ref.style.maxHeight = ref.scrollHeight + "px";
      } else {
        ref.style.maxHeight = "0px";
      }
    });
  }, [activeIndex]);
  return (
    <section className="wpo-faq-section section-padding pt-lg-2 pb-lg-2">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 offset-lg-2">
            <div className="wpo-section-title mb-lg-3">
              <h2>Frequently Asked Questions</h2>
            </div>
          </div>

          <div className="col-lg-8 offset-lg-2">
            <div className="wpo-faq-section">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="wpo-benefits-item">
                    <div className="accordion" id="accordionExample">
                      {schoolOpsData.map((faq, index) => {
                        const isActive = index === activeIndex; // Check if this item is active
                        return (
                          <div className="accordion-item" key={faq.id}>
                            <h3 className="accordion-header" id={faq.headingId}>
                              <button
                                className={`text-black fw-bold faq-question-back accordion-button ${
                                  !isActive ? "collapsed" : ""
                                }`}
                                type="button"
                                onClick={() => handleAccordionClick(index)}
                                aria-expanded={isActive ? "true" : "false"}
                                aria-controls={faq.id}
                              >
                                {faq.question}
                              </button>
                            </h3>
                            <div
                              ref={(el) => (contentRefs.current[index] = el)}
                              id={faq.id}
                              className="accordion-body-wrapper"
                              aria-labelledby={faq.headingId}
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <p className="text-black">{faq.answer}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolOpsFAQSection;
