import React from "react";

const coursesData = [
  {
    id: 1,
    title: "Website Design",
    description:
      "Customizable, easy-to-manage websites for schools to present information, events, and updates in an organized way.",
    classid: 1,
  },
  {
    id: 2,
    title: "School Application",
    description:
      "A mobile application for parents, students, and staff to stay updated on school activities, grades, schedules, and payments.",
    classid: 2,
  },
  {
    id: 3,
    title: "Digital Exam Result System",
    description:
      "Real-time access to exam results, enabling students and parents to track academic progress instantly.",
    classid: 3,
  },
  {
    id: 4,
    title: "SMS & WhatsApp Services",
    description:
      "nstant communication with students and parents via SMS and WhatsApp for announcements, alerts, and updates.",
    classid: 4,
  },
  {
    id: 5,
    title: "Online Payment Facility",
    description:
      "Secure online payment options for school fees, donations, and other transactions, simplifying financial processes.",
    classid: 5,
  },
  {
    id: 6,
    title: "Admission Management",
    description:
      "Streamlined admission process from application to enrollment, allowing for easy tracking and updates.",
    classid: 6,
  },
  {
    id: 7,
    title: "Library Management",
    description:
      "Digital management of books and resources, allowing for easy checkout and return tracking, as well as catalog access.",
    classid: 1,
  },
  {
    id: 8,
    title: "Entrance Management",
    description:
      "Handling of entrance exams and application processing, helping schools manage entrance-related activities efficiently.",
    classid: 2,
  },
  {
    id: 9,
    title: "Digital Staff & Student Attendance",
    description:
      "Automated attendance tracking for students and staff, reducing manual errors and ensuring accuracy.",
    classid: 3,
  },
  {
    id: 10,
    title: "Teacher Feedback",
    description:
      "Collection of feedback on teacher performance, enabling the school to evaluate and improve educational quality.",
    classid: 4,
  },
  {
    id: 11,
    title: "Timetable Management",
    description:
      "Automated class and staff schedules for better organization and efficient management of school activities.",
    classid: 5,
  },
  {
    id: 12,
    title: "Communication Portal",
    description:
      "A platform for communication between teachers, parents, and students to ensure everyone is aligned on academic progress and events.",
    classid: 1,
  },
  {
    id: 13,
    title: "Homework & Assignment Management",
    description:
      "Teachers can assign, track, and grade homework and assignments digitally, allowing students to access them at any time.",
    classid: 2,
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

const SchoolOperationKeyFeature = () => {
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

export default SchoolOperationKeyFeature;
