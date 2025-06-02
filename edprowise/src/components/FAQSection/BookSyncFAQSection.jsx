import React, { useState, useRef, useEffect } from "react";

const bookSyncData = [
  {
    id: "bookSyncOne",
    headingId: "bookSyncHeadingOne",
    question: "What is BookSync?",
    answer:
      "BookSync is a robust financial management software designed specifically for schools to streamline budgeting, accounting, fee management, and financial reporting.",
  },
  {
    id: "bookSyncTwo",
    headingId: "bookSyncHeadingTwo",
    question:
      "What we are solving through Payroll Management Software – Book Sync?",
    answer:
      "We are solving below issues:\n" +
      "1. Fees & Payroll software not linked to accounting software: EdProwise ERP software seamlessly integrates with the finance module, automating the posting of entries for fees received, fees concessions, salary & expenses in the finance module, eliminating manual data entry errors and saving administrative time.\n" +
      "2. Non-availability of customized MIS report: Customized MIS reporting, budgeting & forecasting. Presents data in visual formats such as graphs, charts, KPI, & tables, making it easier for management to interpret and analyze financial information effectively.\n" +
      "3. Non-availability of invoice processing tool for educational institutions: Invoice Processing Software is seamlessly integrated into the Finance Module, automating the posting of entries. Enables online payments to vendors directly through our platform & online availability of invoice.\n" +
      "4. Audit Requirement: Our system is designed to fulfill all auditor requirements efficiently and effectively, like fees reconciliation, salary reconciliation, PF & ESI reconciliation, fixed assets register along with a copy of the invoice, and remote audit.\n" +
      "5. End-to-End Services for Educational Institutions (Dealing with multiple vendors): We offer a comprehensive range of services, including technology integration, administrative solutions, educational consultation, and professional development. Our tailored support enhances all aspects of educational operations, allowing school management to streamline processes and avoid the hassle of dealing with multiple vendors.",
  },
  {
    id: "bookSyncThree",
    headingId: "bookSyncHeadingThree",
    question: "How does BookSync help schools manage finances?",
    answer:
      "BookSync automates financial processes such as budgeting, expense tracking, fee collection, accounting entries, and generates comprehensive reports to provide a clear overview of the school’s financial health.",
  },
  {
    id: "bookSyncFour",
    headingId: "bookSyncHeadingFour",
    question: "Can BookSync handle multiple types of financial transactions?",
    answer:
      "Yes, BookSync supports various financial transactions including income, expenses, invoices, payments, and refunds, allowing schools to manage all aspects of their finances in one system.",
  },
  {
    id: "bookSyncFive",
    headingId: "bookSyncHeadingFive",
    question: "Does BookSync provide real-time financial reporting?",
    answer:
      "Yes, BookSync provides real-time reporting, helping schools track their financial status at any given moment and make informed financial decisions.",
  },
  {
    id: "bookSyncSix",
    headingId: "bookSyncHeadingSix",
    question: "Does BookSync support budgeting and forecasting?",
    answer:
      "Yes, BookSync allows schools to create detailed budgets, set financial goals, and forecast future financial trends based on historical data and current expenses.",
  },
  {
    id: "bookSyncSeven",
    headingId: "bookSyncHeadingSeven",
    question: "Can BookSync handle fee collection and invoicing?",
    answer:
      "Yes, BookSync automates the fee collection process, generates invoices, sends reminders for overdue payments, and tracks payment history.",
  },
  {
    id: "bookSyncEight",
    headingId: "bookSyncHeadingEight",
    question: "Is BookSync secure and compliant with financial regulations?",
    answer:
      "Yes, BookSync follows stringent security protocols to protect financial data and is fully compliant with financial regulations, including tax laws and school-specific financial standards.",
  },
  {
    id: "bookSyncNine",
    headingId: "bookSyncHeadingNine",
    question: "Does BookSync support automatic posting of accounting entries?",
    answer:
      "Yes, BookSync automatically posts accounting entries for all financial transactions, reducing manual effort, ensuring accuracy, and improving the efficiency of financial recordkeeping.",
  },
  {
    id: "bookSyncTen",
    headingId: "bookSyncHeadingTen",
    question: "How can schools get started with BookSync?",
    answer:
      "Schools can request a demo or trial through our website, and our team will assist with setup, customization, and training to ensure smooth implementation.",
  },
];
const BookSyncFAQSection = () => {
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
                      {bookSyncData.map((faq, index) => {
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

export default BookSyncFAQSection;
