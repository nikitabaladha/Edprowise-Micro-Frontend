import React, { useState, useRef, useEffect } from "react";

const edprowiseServicesData = [
  {
    id: "edprowiseServicesOne",
    headingId: "edprowiseServicesHeadingOne",
    question: "What procurement services does EdProwise offer for schools?",
    answer:
      "EdProwise provides end-to-end procurement solutions for schools, including sourcing classroom furniture, lab equipment, sports gear, library books, smart boards, uniforms, stationery, and IT infrastructure at competitive prices.",
  },
  {
    id: "edprowiseServicesTwo",
    headingId: "edprowiseServicesHeadingTwo",
    question: "How does EdProwise ensure quality in procurement?",
    answer:
      "We partner with trusted vendors, conduct strict quality checks, and ensure that all products meet educational standards and compliance regulations before delivery.",
  },
  {
    id: "edprowiseServicesThree",
    headingId: "edprowiseServicesHeadingThree",
    question: "Can EdProwise help schools with bulk purchasing?",
    answer:
      "Yes, we assist schools with bulk procurement, offering discounted pricing and streamlined logistics to ensure timely delivery of supplies.",
  },
  {
    id: "edprowiseServicesFour",
    headingId: "edprowiseServicesHeadingFour",
    question:
      "Does EdProwise provide procurement services for digital learning tools?",
    answer:
      "Yes, we procure and implement smart boards, projectors, e-learning software, and digital classroom solutions to enhance the teaching-learning experience.",
  },
  {
    id: "edprowiseServicesFive",
    headingId: "edprowiseServicesHeadingFive",
    question: "What types of furniture does EdProwise supply to schools?",
    answer:
      "We provide durable and ergonomic school furniture, including student desks, chairs, library shelves, laboratory workstations, and teacher podiums, customized as per school requirements.",
  },
  {
    id: "edprowiseServicesSix",
    headingId: "edprowiseServicesHeadingSix",
    question: "How does EdProwise manage vendor selection?",
    answer:
      "We evaluate vendors based on pricing, quality, reliability, and past performance to ensure schools get the best products and services.",
  },
  {
    id: "edprowiseServicesSeven",
    headingId: "edprowiseServicesHeadingSeven",
    question: "Can EdProwise help with school infrastructure setup?",
    answer:
      "Yes, we assist in setting up classrooms, labs, libraries, and administrative offices with furniture, fixtures, and IT infrastructure.",
  },
  {
    id: "edprowiseServicesEight",
    headingId: "edprowiseServicesHeadingEight",
    question:
      "Does EdProwise handle procurement for school uniforms and stationery?",
    answer:
      "Yes, we provide customized solutions for school uniforms, books, and stationery, ensuring timely availability and bulk order discounts.",
  },
  {
    id: "edprowiseServicesNine",
    headingId: "edprowiseServicesHeadingNine",
    question:
      "How does EdProwise ensure cost-effective procurement for schools?",
    answer:
      "We negotiate with suppliers, leverage bulk purchasing, and source directly from manufacturers to offer cost-efficient solutions without compromising quality.",
  },
  {
    id: "edprowiseServicesTen",
    headingId: "edprowiseServicesHeadingTen",
    question: "Can EdProwise assist in emergency or urgent procurement needs?",
    answer:
      "Yes, we offer expedited procurement services for urgent requirements such as safety equipment, sanitation supplies, or emergency infrastructure repairs.",
  },
  {
    id: "edprowiseServicesEleven",
    headingId: "edprowiseServicesHeadingEleven",
    question: "Do you provide procurement solutions for sports equipment?",
    answer:
      "Yes, we supply high-quality sports gear, including footballs, cricket kits, basketball hoops, gym equipment, and playground infrastructure to support physical education programs.",
  },
  {
    id: "edprowiseServicesTwelve",
    headingId: "edprowiseServicesHeadingTwelve",
    question:
      "How can schools ensure sustainable and eco-friendly procurement?",
    answer:
      "We offer eco-friendly procurement options such as recycled paper products, energy-efficient appliances, and sustainable school furniture to promote a green learning environment.",
  },
  {
    id: "edprowiseServicesThirteen",
    headingId: "edprowiseServicesHeadingThirteen",
    question: "Does EdProwise provide installation support for procured items?",
    answer:
      "Yes, we offer installation and setup services for furniture, smart boards, projectors, and other equipment to ensure smooth integration into school operations.",
  },
  {
    id: "edprowiseServicesFourteen",
    headingId: "edprowiseServicesHeadingFourteen",
    question: "How does EdProwise handle logistics and delivery?",
    answer:
      "We manage end-to-end logistics, ensuring timely and safe delivery of all procured items, with tracking options available for large orders.",
  },
  {
    id: "edprowiseServicesFifteen",
    headingId: "edprowiseServicesHeadingFifteen",
    question: "Can schools request customized procurement solutions?",
    answer:
      "Absolutely! We provide tailor-made procurement solutions based on the specific needs and budgets of schools, ensuring a hassle-free experience.",
  },
  {
    id: "edprowiseServicesSixteen",
    headingId: "edprowiseServicesHeadingSixteen",
    question: "Does EdProwise offer procurement financing options for schools?",
    answer:
      "Yes, we assist schools in securing financing or flexible payment plans for large procurement orders to ease budget constraints.",
  },
  {
    id: "edprowiseServicesSeventeen",
    headingId: "edprowiseServicesHeadingSeventeen",
    question:
      "What is the process for schools to avail procurement services from EdProwise?",
    answer:
      "Schools can contact us with their procurement needs, and our team will provide vendor options, pricing estimates, and a seamless procurement-to-delivery process.",
  },
];

const GoodsFAQSection = () => {
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

export default GoodsFAQSection;
