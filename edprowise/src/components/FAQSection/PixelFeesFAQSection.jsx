import React, { useState, useRef, useEffect } from "react";
const pixelFeesData = [
  {
    id: "pixelFeesOne",
    headingId: "pixelFeesHeadingOne",
    question: "What is Pixel Fees?",
    answer:
      "Pixel Fees is a school fee management software designed to automate and simplify the entire fee collection process, including invoicing, payments, and financial tracking.",
  },
  {
    id: "pixelFeesTwo",
    headingId: "pixelFeesHeadingTwo",
    question:
      "What we are solving through School Fees Management Software – Pixel Fees?",
    answer:
      "We are solving below issues:\n" +
      "1. Leakage of fees: Through fees reconciliation, we guarantee zero leakage. Our detailed analysis identifies the gap between fees due & fees collected, enabling us to swiftly address any discrepancies.\n" +
      "2. Fees & Payroll software not linked to accounting software: EdProwise ERP software seamlessly integrates with the finance module, automating the posting of entries for fees received , fees concessions, Salary & expenses in finance module, eliminating manual data entry errors and saving administrative time..\n" +
      "3. Manual entry upon receipt of online fees: Upon receipt of fees, our module automatically records the transactions in the fees software, eliminating the need for manual entry.\n" +
      "4.Audit Requirement: Our system is designed to fulfill all auditor requirements efficiently and effectively like fees reconciliation, salary reconciliation, PF& ESI reconciliation, fixed Assets register along with copy of Invoice, & remote audit..\n" +
      "5. End to End Services for Educational Institutions (Dealing with multiple vendors): We offer a comprehensive range of services, including technology integration, administrative solutions, educational consultation, and professional development. Our tailored support enhances all aspects of educational operations, allowing school management to streamline processes and avoid the hassle of dealing with multiple vendors.",
  },
  {
    id: "pixelFeesThree",
    headingId: "pixelFeesHeadingThree",
    question: "How does Pixel Fees help schools manage fees?",
    answer:
      "Pixel Fees streamlines fee collection by automating billing, sending payment reminders, generating reports, and offering multiple payment options for parents.",
  },
  {
    id: "pixelFeesFour",
    headingId: "pixelFeesHeadingFour",
    question: "Can parents pay fees online using Pixel Fees?",
    answer:
      "Yes, parents can make secure online payments through various methods, including debit/credit cards, UPI, net banking, and digital wallets.",
  },
  {
    id: "pixelFeesFive",
    headingId: "pixelFeesHeadingFive",
    question: "Does Pixel Fees support different fee structures?",
    answer:
      "Yes, it allows schools to set up customized fee structures based on grade levels, student categories, scholarships, and installment plans.",
  },
  {
    id: "pixelFeesSix",
    headingId: "pixelFeesHeadingSix",
    question: "Can Pixel Fees generate automated invoices and receipts?",
    answer:
      "Yes, the software automatically generates invoices, sends them to parents, and issues digital receipts upon successful payment.",
  },
  {
    id: "pixelFeesSeven",
    headingId: "pixelFeesHeadingSeven",
    question: "Does Pixel Fees integrate with accounting systems?",
    answer:
      "Yes, it integrates seamlessly with accounting software to ensure accurate financial reporting and compliance.",
  },
  {
    id: "pixelFeesEight",
    headingId: "pixelFeesHeadingEight",
    question: "Can schools track pending and overdue payments?",
    answer:
      "Yes, Pixel Fees provides real-time tracking of pending, overdue, and completed payments, along with automated follow-up reminders.",
  },
  {
    id: "pixelFeesNine",
    headingId: "pixelFeesHeadingNine",
    question: "Is Pixel Fees secure and compliant with financial regulations?",
    answer:
      "Absolutely. Pixel Fees follows industry-standard security protocols and complies with financial regulations to ensure safe transactions and data protection.",
  },
  {
    id: "pixelFeesTen",
    headingId: "pixelFeesHeadingTen",
    question: "How can schools get started with Pixel Fees?",
    answer:
      "Schools can sign up for a demo through our website, and our team will assist with setup, customization, and training.",
  },
  {
    id: "pixelFeesEleven",
    headingId: "pixelFeesHeadingEleven",
    question: "What reports does Pixel Fees software provide?",
    answer:
      "Pixel Fees Provides Daily Collection Register,  Fees Concession Report,  Defaulter Report , Report on loss of fees due to late admission,  Report on loss of fees left students,  Students ledger Fee wise collection report Admission Fees, Registration Fees, TC Fees ,Board Registration, Board Exam fees report Arrear fees received , Advance fees received report , Late Fees, Excess fees & Fees refund report Student Master & Fees Structure Other Multiple reports",
  },
];
const PixelFeesFAQSection = () => {
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
                      {pixelFeesData.map((faq, index) => {
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
                              // className={`accordion-collapse collapse ${isActive ? "show" : ""}`}
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

export default PixelFeesFAQSection;
