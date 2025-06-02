import React, { useState, useRef, useEffect } from "react";
const edprowiseServicesData = [
  {
    id: "edprowiseServicesOne",
    headingId: "edprowiseServicesHeadingOne",
    question: "How does EdProwise help schools with PF & ESI compliance?",
    answer:
      "EdProwise provides end-to-end PF & ESI consultancy, including employee registration, contribution management, documentation, filing of returns, and compliance audits. We also assist schools in handling claims and resolving grievances efficiently.",
  },
  {
    id: "edprowiseServicesTwo",
    headingId: "edprowiseServicesHeadingTwo",
    question:
      "What digital marketing solutions does EdProwise offer for schools?",
    answer:
      "EdProwise provides SEO, social media marketing, Google Ads, content marketing, website development, and email campaigns to help schools improve their online presence, attract students, and enhance parent engagement.",
  },
  {
    id: "edprowiseServicesThree",
    headingId: "edprowiseServicesHeadingThree",
    question: "How does EdProwise support schools in event management?",
    answer:
      "We handle planning and execution for school events, including annual functions, sports days, academic conferences, and cultural programs. Our services cover logistics, stage setup, media coverage, and guest management to ensure successful events.",
  },
  {
    id: "edprowiseServicesFour",
    headingId: "edprowiseServicesHeadingFour",
    question: "What affiliation support does EdProwise provide for schools?",
    answer:
      "We assist schools in obtaining affiliations from CBSE, ICSE, IB, and state boards. Our team manages documentation, compliance with board regulations, infrastructure audits, and application processing.",
  },
  {
    id: "edprowiseServicesFive",
    headingId: "edprowiseServicesHeadingFive",
    question:
      "Does EdProwise organize international educational tours for students?",
    answer:
      "Yes, we arrange international educational tours for students, including itinerary planning, visa processing, accommodation, guided learning experiences, and industry visits to enhance global exposure.",
  },
  {
    id: "edprowiseServicesSix",
    headingId: "edprowiseServicesHeadingSix",
    question: "What student counseling services does EdProwise provide?",
    answer:
      "We offer career counseling, psychological support, academic mentoring, and guidance on higher education opportunities. Our counseling programs help students make informed decisions about their future.",
  },
  {
    id: "edprowiseServicesSeven",
    headingId: "edprowiseServicesHeadingSeven",
    question:
      "What types of training and workshops does EdProwise conduct for students?",
    answer:
      "EdProwise organizes workshops on career development, soft skills, leadership, entrepreneurship, financial literacy, and emerging technologies to equip students with essential life and professional skills.",
  },
];

const EdProwiseServicesFAQSection = () => {
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
                      {edprowiseServicesData.map((faq, index) => {
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

export default EdProwiseServicesFAQSection;
