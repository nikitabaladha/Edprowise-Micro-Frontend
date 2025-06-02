import React, { useState, useRef, useEffect } from "react";

const easePayrollData = [
  {
    id: "easePayrollOne",
    headingId: "easePayrollHeadingOne",
    question: "What is EasePayroll?",
    answer:
      "EasePayroll is a comprehensive payroll management software designed specifically for schools to automate salary processing, tax deductions, and compliance management.",
  },
  {
    id: "easePayrollTwo",
    headingId: "easePayrollHeadingTwo",
    question:
      "What we are solving through Payroll Management Software – EasePayroll?",
    answer:
      "We are solving below issues:\n" +
      "1. Fees & Payroll software not linked to accounting software: EdProwise ERP software seamlessly integrates with the finance module, automating the posting of entries for fees received, fees concessions, salary & expenses in the finance module, eliminating manual data entry errors and saving administrative time.\n" +
      "2. Manual processing of salary payment: Automatic salary payment at the end of the month simplifies & streamlines the payroll process. This feature enhances efficiency, reduces errors, and ensures timely payments.\n" +
      "3. Gratuity & LE Report: Gratuity and Leave Encashment (LE) Report are essential components of payroll. Track & report on employee entitlements for gratuity and leave encashment, ensuring compliance with legal requirements and accurate financial planning.\n" +
      "4. Audit Requirement: Our system is designed to fulfill all auditor requirements efficiently and effectively, like fees reconciliation, salary reconciliation, PF & ESI reconciliation, fixed assets register along with a copy of the invoice, and remote audit.\n" +
      "5. End-to-End Services for Educational Institutions (Dealing with multiple vendors): We offer a comprehensive range of services, including technology integration, administrative solutions, educational consultation, and professional development. Our tailored support enhances all aspects of educational operations, allowing school management to streamline processes and avoid the hassle of dealing with multiple vendors.",
  },
  {
    id: "easePayrollThree",
    headingId: "easePayrollHeadingThree",
    question: "How does EasePayroll help schools manage payroll?",
    answer:
      "EasePayroll automates salary calculations, generates payslips, manages tax deductions (PF, ESI, TDS), tracks attendance-linked payroll, and ensures compliance with labor laws.",
  },
  {
    id: "easePayrollFour",
    headingId: "easePayrollHeadingFour",
    question: "Can EasePayroll handle multiple salary structures?",
    answer:
      "Yes, schools can create customized salary structures based on employee roles, experience, allowances, deductions, and benefits.",
  },
  {
    id: "easePayrollFive",
    headingId: "easePayrollHeadingFive",
    question:
      "Does EasePayroll support automated tax and compliance deductions?",
    answer:
      "Yes, the software automatically calculates and deducts taxes, Provident Fund (PF), Employee State Insurance (ESI), and other statutory payments as per regulations.",
  },
  {
    id: "easePayrollSix",
    headingId: "easePayrollHeadingSix",
    question: "Can employees access their salary details through EasePayroll?",
    answer:
      "Yes, employees can log in to their self-service portal to view salary slips, tax details, and leave records.",
  },
  {
    id: "easePayrollSeven",
    headingId: "easePayrollHeadingSeven",
    question: "Does EasePayroll integrate with biometric attendance systems?",
    answer:
      "Yes, it integrates with biometric and RFID attendance systems to ensure accurate payroll processing based on attendance records.",
  },
  {
    id: "easePayrollEight",
    headingId: "easePayrollHeadingEight",
    question: "Can EasePayroll generate payroll reports and analytics?",
    answer:
      "Yes, EasePayroll can generate detailed reports on salary expenses, deductions, tax filings, payroll summaries, and other analytics, helping schools with financial planning and compliance.",
  },
  {
    id: "easePayrollNine",
    headingId: "easePayrollHeadingNine",
    question: "Is EasePayroll secure and compliant with financial regulations?",
    answer:
      "Absolutely. EasePayroll follows industry-standard security measures and ensures compliance with financial and labor laws.",
  },
  {
    id: "easePayrollTen",
    headingId: "easePayrollHeadingTen",
    question: "How can schools implement EasePayroll?",
    answer:
      "Schools can request a demo through our website, and our team will assist with software setup, customization, and training.",
  },
];

const EasePayrollFAQSection = () => {
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
                      {easePayrollData.map((faq, index) => {
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

export default EasePayrollFAQSection;
