import React, { useState, useRef, useEffect } from "react";
const edprowiseData = [
  {
    id: "edprowiseOne",
    headingId: "edprowiseHeadingOne",
    question: "What is EdProwise?",
    answer:
      "EdProwise is a platform designed to support schools, educators, and students by providing solutions that enhance education and administration.",
  },
  {
    id: "edprowiseTwo",
    headingId: "edprowiseHeadingTwo",
    question: "What services does EdProwise provide?",
    answer:
      "EdProwise offers a comprehensive range of services for schools, starting with software solutions for fee management, payroll processing, and financial management. Additionally, we provide recruitment services, Exam result system, Attendance Management, compliance consulting, and digital transformation to streamline school administration and enhance efficiency.",
  },
  {
    id: "edprowiseThree",
    headingId: "edprowiseHeadingThree",
    question: "Who can use EdProwise?",
    answer:
      "Schools, teachers, students, school administrators, and educational organizations can all use EdProwise.",
  },
  {
    id: "edprowiseFour",
    headingId: "edprowiseHeadingFour",
    question: "Is EdProwise available for all types of schools?",
    answer:
      "Yes, EdProwise is designed to support various types of schools, including private, public, and international institutions.",
  },
  {
    id: "edprowiseFive",
    headingId: "edprowiseHeadingFive",
    question: "Can individuals use EdProwise, or is it only for schools?",
    answer:
      "While EdProwise primarily serves schools, individuals such as teachers and students can also create accounts to access specific features.",
  },
  {
    id: "edprowiseSix",
    headingId: "edprowiseHeadingSix",
    question: "How does EdProwise ensure data security and privacy?",
    answer:
      "We follow strict data security measures to protect user information and comply with industry standards for privacy.",
  },
  {
    id: "edprowiseSeven",
    headingId: "edprowiseHeadingSeven",
    question: "How can I contact EdProwise for support?",
    answer:
      "You can reach out to our support team via email, phone, or through the contact form on our website.",
  },
];
const EdProwiseFAQSection = () => {
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
                      {edprowiseData.map((faq, index) => {
                        const isActive = index === activeIndex;
                        return (
                          <div className="accordion-item" key={faq.id}>
                            <h3 className="accordion-header" id={faq.headingId}>
                              <button
                                className={`text-black fw-bold faq-question-back accordion-button   ${
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
                              // className={`accordion-collapse collapse ${isActive ? "show" : ""}`}
                              aria-labelledby={faq.headingId}
                              data-bs-parent="#accordionExample"
                            >
                              <div className=" accordion-body">
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

export default EdProwiseFAQSection;
