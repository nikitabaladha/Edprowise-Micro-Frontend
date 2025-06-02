import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

const CareerPage = () => {
  const navigate = useNavigate();
  const jobs = [
    {
      id: 1,
      title: "Business Development",
      type: "Full Time",
      tags: ["Full Time", "BDE", "Remote"],
      salary: "\u20b920,000 / Month",
      designation: "Business Development",
      description:
        "This role involves identifying and developing new business opportunities, building client relationships, and achieving sales targets.",
      responsibilities: [
        "Identify new business opportunities and partnerships.",
        "Develop and maintain strong client relationships.",
        "Achieve and exceed sales targets.",
        "Collaborate with the marketing team to align strategies.",
      ],
    },
    {
      id: 2,
      title: "Business Development Executive",
      type: "Full Time",
      tags: ["Full Time", "BDE", "On-site"],
      salary: "\u20b920,000 / Month",
      designation: "Business Development Executive",
      description:
        "As a Business Development Executive, you'll work closely with clients to understand their needs and provide tailored solutions.",
      responsibilities: [
        "Engage with clients to understand their requirements.",
        "Provide tailored solutions to meet client needs.",
        "Work with internal teams to ensure seamless execution of projects.",
        "Identify potential market opportunities.",
      ],
    },
    {
      id: 3,
      title: "HR",
      type: "Full Time",
      tags: ["Full Time", "HR", "Hybrid"],
      salary: "\u20b920,000 / Month",
      designation: "HR",
      description:
        "This position involves managing recruitment, employee relations, and HR policies to support the company's growth.",
      responsibilities: [
        "Manage recruitment and onboarding processes.",
        "Develop and implement HR policies and procedures.",
        "Handle employee relations and conflict resolution.",
        "Ensure compliance with labor laws and regulations.",
      ],
    },
  ];

  const [search, setSearch] = useState({
    title: "",
    type: "",
    location: "",
  });

  const [expandedJob, setExpandedJob] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const toggleJobDetails = (id) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (search.title === "" ||
        job.title.toLowerCase().includes(search.title.toLowerCase())) &&
      (search.type === "" || job.type === search.type) &&
      (search.location === "" ||
        job.tags[2].toLowerCase().includes(search.location.toLowerCase()))
  );

  const handleApply = (job) => {
    navigate(`/career/${job.title}`, { state: { job } }); // Navigate to CareerForm with job info
  };

  return (
    <>
      <section className="wpo-page-title service-sub-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Career</h2>
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
      <section
        className="wpo-courses-section-s2"
        style={{ background: "white" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-section-title-s2 mb-3">
                <h2>Start Your Career</h2>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-car-bar">
            <input
              type="text"
              placeholder="Job Title"
              className="input-boxx"
              name="title"
              value={search.title}
              onChange={handleInputChange}
            />
            <select
              className="input-boxx"
              name="type"
              value={search.type}
              onChange={handleInputChange}
            >
              <option value="">Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
            </select>
            <input
              type="text"
              placeholder="Location (e.g., Remote, On-site, Hybrid)"
              className="input-boxx"
              name="location"
              value={search.location}
              onChange={handleInputChange}
            />
            <button className="search-btnn">Search</button>
          </div>

          {/* Job Cards */}
          {filteredJobs.map((job) => (
            <div
              className="job-card"
              key={job.id}
              onClick={
                window.innerWidth <= 575 ? () => toggleJobDetails(job.id) : null
              }
            >
              <div className="details">
                <h3 className="job-title-name m-0">{job.title}</h3>
                <button
                  className="apply-btnn job-apply-edpro"
                  onClick={() => handleApply(job)}
                >
                  Apply Now
                </button>
              </div>
              <div className="details">
                <div className="tagss">
                  {job.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>
                <p className="salary">{job.salary}</p>
              </div>
              <button
                className="read-moree"
                onClick={() => toggleJobDetails(job.id)}
              >
                {expandedJob === job.id ? "Read Less" : "Read More"}
              </button>
              {expandedJob === job.id && (
                <div className="job-description mt-2">
                  <h3 className="job-title-name m-0">{job.title}</h3>
                  <p className="job-apply-edpro">{job.description}</p>
                  <h3 className="job-title-name m-0">Key Responsibilities</h3>
                  <ul style={{ paddingLeft: "20px" }}>
                    {job.responsibilities.map((resp, index) => (
                      <li className="job-apply-edpro" key={index}>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CareerPage;
