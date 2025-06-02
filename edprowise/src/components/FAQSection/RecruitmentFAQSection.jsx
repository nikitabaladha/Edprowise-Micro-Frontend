import React, { useState, useRef, useEffect } from "react";
const edprowiseRecruitmentData = [
  {
    id: "edprowiseRecruitmentOne",
    headingId: "edprowiseRecruitmentHeadingOne",
    question: "What recruitment services does EdProwise offer for schools?",
    answer:
      "EdProwise provides comprehensive recruitment solutions for schools, including hiring teachers, administrative staff, principals, sports coaches, counselors, and support staff. We manage the entire hiring process, from sourcing candidates to final onboarding.",
  },
  {
    id: "edprowiseRecruitmentTwo",
    headingId: "edprowiseRecruitmentHeadingTwo",
    question: "How does EdProwise ensure that schools hire qualified teachers?",
    answer:
      "We have a rigorous screening process that includes qualification verification, experience checks, background verification, and skill assessments to ensure only the best candidates are shortlisted.",
  },
  {
    id: "edprowiseRecruitmentThree",
    headingId: "edprowiseRecruitmentHeadingThree",
    question: "Can EdProwise help in hiring non-teaching staff for schools?",
    answer:
      "Yes, we assist in recruiting non-teaching staff, including office administrators, accountants, IT support, librarians, transport managers, and housekeeping staff.",
  },
  {
    id: "edprowiseRecruitmentFour",
    headingId: "edprowiseRecruitmentHeadingFour",
    question:
      "Does EdProwise provide temporary or contract-based staffing solutions?",
    answer:
      "Yes, we offer flexible staffing solutions, including temporary, contract-based, and full-time recruitment, depending on the school's needs.",
  },
  {
    id: "edprowiseRecruitmentFive",
    headingId: "edprowiseRecruitmentHeadingFive",
    question: "How long does the recruitment process take?",
    answer:
      "The timeline depends on the position and requirements. Typically, we provide a shortlist of qualified candidates within a few days, and the entire hiring process can be completed within 2-4 weeks.",
  },
  {
    id: "edprowiseRecruitmentSix",
    headingId: "edprowiseRecruitmentHeadingSix",
    question:
      "Can EdProwise help schools with mass hiring for new academic sessions?",
    answer:
      "Yes, we specialize in bulk hiring for schools, ensuring that all necessary teaching and administrative positions are filled before the academic year begins.",
  },
  {
    id: "edprowiseRecruitmentSeven",
    headingId: "edprowiseRecruitmentHeadingSeven",
    question:
      "Does EdProwise assist in leadership hiring, such as principals and school directors?",
    answer:
      "Absolutely! We have expertise in executive recruitment, helping schools find experienced and visionary leaders for principal, vice-principal, and director positions.",
  },
  {
    id: "edprowiseRecruitmentEight",
    headingId: "edprowiseRecruitmentHeadingEight",
    question: "How does EdProwise support schools in teacher retention?",
    answer:
      "We offer training, professional development programs, and employee engagement strategies to help schools retain top talent and reduce staff turnover.",
  },
  {
    id: "edprowiseRecruitmentNine",
    headingId: "edprowiseRecruitmentHeadingNine",
    question:
      "Can EdProwise help in recruitment for international schools or global education institutions?",
    answer:
      "Yes, we have experience in recruiting candidates for international schools, IB programs, and global education institutions, ensuring that candidates meet international teaching standards.",
  },
  {
    id: "edprowiseRecruitmentTen",
    headingId: "edprowiseRecruitmentHeadingTen",
    question: "What is the cost of EdProwise recruitment services for schools?",
    answer:
      "Our pricing is flexible and depends on the school's hiring needs. We offer affordable and customized recruitment plans, including pay-per-hire and subscription-based models.",
  },
  {
    id: "edprowiseRecruitmentEleven",
    headingId: "edprowiseRecruitmentHeadingEleven",
    question:
      "Can schools specify their hiring requirements, such as preferred experience or qualifications?",
    answer:
      "Yes, schools can provide their specific criteria, and we will tailor our candidate search accordingly to ensure the right match.",
  },
  {
    id: "edprowiseRecruitmentTwelve",
    headingId: "edprowiseRecruitmentHeadingTwelve",
    question:
      "Does EdProwise provide recruitment support for new school startups?",
    answer:
      "Yes, we offer complete staffing solutions for new schools, helping them build a team from scratch, including teachers, administrators, and support staff.",
  },
];
const RecruitmentFAQSection = () => {
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
                      {edprowiseRecruitmentData.map((faq, index) => {
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
                              id={faq.id}
                              ref={(el) => (contentRefs.current[index] = el)}
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

export default RecruitmentFAQSection;
