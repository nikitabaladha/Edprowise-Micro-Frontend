import react, { useState } from "react";
import FaqMainSection from "./FaqMainSection.jsx";
import TestimonialSection from "../HomeSection/Testimonial.jsx";
const FaqPage = () => {
  const faqData = [
    {
      id: "collapseOne",
      headingId: "headingOne",
      question: "What types of cases does your console firm handle?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum exercitationem pariatur iure nemo esse repellendus est quo recusandae. Delectus, maxime.",
    },
    {
      id: "collapseTwo",
      headingId: "headingTwo",
      question: "Before hiring a console, what kind of questions should I ask?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum exercitationem pariatur iure nemo esse repellendus est quo recusandae. Delectus, maxime.",
    },
    {
      id: "collapseThree",
      headingId: "headingThree",
      question:
        "Should I meet with multiple Consultancy and shop around before hiring one?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum exercitationem pariatur iure nemo esse repellendus est quo recusandae. Delectus, maxime.",
    },
    {
      id: "collapseFour",
      headingId: "headingFour",
      question:
        "In addition to billable hours, what other costs can console's charge for?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum exercitationem pariatur iure nemo esse repellendus est quo recusandae. Delectus, maxime.",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
  });

  const [formStatus, setFormStatus] = useState({
    success: false,
    error: false,
    loading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, loading: true });

    // Simulating form submission
    setTimeout(() => {
      setFormStatus({ success: true, error: false, loading: false });
      setFormData({ name: "", email: "", phone: "", note: "" });
    }, 2000);
  };

  return (
    <>
      <section className="wpo-page-title service-sub-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>FAQ</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-1">
          <img src="assets/website-images/shape/1.svg" alt="" />
        </div>
        <div className="shape-2">
          <img src="assets/website-images/shape/2.svg" alt="" />
        </div>
        <div className="shape-3">
          <img src="assets/website-images/shape/3.svg" alt="" />
        </div>
        <div className="shape-4">
          <img src="assets/website-images/shape/4.svg" alt="" />
        </div>
      </section>
      <FaqMainSection />
      <TestimonialSection />
    </>
  );
};

export default FaqPage;
