import React from "react";
const coursesData = [
  {
    id: 1,
    title: "Customizable Layout & Design",
    description:
      "Tailored designs to match the school's identity, including color schemes, logos, and branding.",
    classid: 1,
  },
  {
    id: 2,
    title: "Responsive Design",
    description:
      "Optimized for desktop, tablet, and mobile devices, ensuring access across all platforms.",
    classid: 2,
  },
  {
    id: 3,
    title: "Content Management System (CMS)",
    description:
      "User-friendly backend for updating content like news, events, academic information, etc.",
    classid: 3,
  },
  {
    id: 4,
    title: "Online Admission System",
    description:
      "Easy online submission of admission forms, document uploads, and real-time status tracking.",
    classid: 4,
  },
  {
    id: 5,
    title: "Student and Staff Portals",
    description:
      "Secure login areas for students, parents, and staff to access personal schedules, results, and records.",
    classid: 5,
  },
  {
    id: 6,
    title: "News & Announcements Section",
    description:
      "Dynamic area to post updates, important notices, and event announcements.",
    classid: 6,
  },
  {
    id: 7,
    title: "Event Calendar",
    description:
      "Interactive calendar for upcoming events, school holidays, and extracurricular activities.",
    classid: 1,
  },
  {
    id: 8,
    title: "Multimedia Integration",
    description:
      " Embed images, videos, and documents (newsletters, annual reports, etc.) for engaging content.",
    classid: 2,
  },
  {
    id: 9,
    title: "Online Payment Integration",
    description:
      "Secure online payment options for school fees, donations, and transactions.",
    classid: 3,
  },
  {
    id: 10,
    title: "Faculty & Staff Directory",
    description:
      " Searchable directory with contact details, office hours, and qualifications of school staff.",
    classid: 4,
  },
  {
    id: 11,
    title: "Social Media Integration",
    description:
      "Links to the school's social media for community engagement and updates.",
    classid: 5,
  },
  {
    id: 12,
    title: "Blog Section",
    description:
      "Space to share school updates, news articles, and informative posts with the community.",
    classid: 6,
  },
  {
    id: 13,
    title: "SEO Optimized",
    description:
      "Built to be search engine-friendly, improving the website’s visibility in search results.",
    classid: 1,
  },
  {
    id: 14,
    title: "Multilingual Support",
    description:
      "Offers content in multiple languages for a diverse school community.",
    classid: 2,
  },
  {
    id: 15,
    title: "Accessibility Features",
    description:
      "Ensures compliance with accessibility standards, offering features like text resizing and screen reader compatibility.",
    classid: 3,
  },
];

const CourseItem = ({ title, description, classid }) => {
  return (
    <div
      className={`category-items col-lg-3 col-md-6 col-12 grid-web s${classid}`}
    >
      <div className="wpo-courses-item category-itemm">
        <div className="wpo-courses-text">
          {/* <div className="courses-icon category-icons">{icon}</div> */}
          <h2 className="category-h2 font-weight-web-h2">
            <a>{title}</a>
          </h2>
        </div>
        <p className="all-info">{description}</p>
      </div>
    </div>
  );
};

const SchoolWebsiteKeyFeatures = () => {
  return (
    <div className="row-web wpo-courses-wrap service-row">
      {coursesData.map((course) => (
        <CourseItem
          key={course.id}
          title={course.title}
          description={course.description}
          classid={course.classid}
        />
      ))}
    </div>
  );
};

export default SchoolWebsiteKeyFeatures;
