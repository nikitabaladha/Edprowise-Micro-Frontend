import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import getAPI from "../../api/getAPI.jsx";
import { toast } from "react-toastify";

const Dropdown = ({ onSelect }) => {
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [isBackHovered, setIsBackHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const schoolId = userDetails?.schoolId;

        if (!schoolId) {
          setError("School ID not found in local storage");
          return;
        }

        const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
        setAcademicYears(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch academic years.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicYears();
  }, []);

  const handleSelect = (selectedOption) => {
    if (selectedOption) {
      const value = selectedOption.value;
      setSelectedAcademicYear(value);
      localStorage.setItem("selectedAcademicYear", value);

      if (onSelect) onSelect(value);
    }
  };

  const handleSubmit = () => {
    if (selectedAcademicYear) {
      localStorage.setItem("sidebartab", "FeesModule");
      navigate("/school-dashboard/fees-module/form/registration");
    } else {
      toast.error("Please select an academic year first.");
    }
  };

  const handleBack = () => {
    navigate("/school/go-to-dashboard");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const options = academicYears.map((obj) => ({
    value: obj.academicYear,
    label: obj.academicYear,
  }));

  const styles = {
    container: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#fff",
    },
    backButton: {
      position: "absolute",
      top: "10px",
      right: "20px",
      color: "#fff",
      cursor: "pointer",
      zIndex: 1000,
      transition: "all 0.3s ease",
      backgroundColor: "#1a1729",
      padding: "12px",
      borderRadius: "10%",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      transform: isBackHovered ? "scale(1.1)" : "scale(1)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "70px",
      height: "35px",
      textAlign: "center",
      fontSize: "1.0rem",
    },
    submitButton: {
      marginTop: "20px",
      padding: "5px 20px",
      backgroundColor: "#1a1729",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <button
        onClick={handleBack}
        style={styles.backButton}
        onMouseEnter={() => setIsBackHovered(true)}
        onMouseLeave={() => setIsBackHovered(false)}
      >
        Back
      </button>
      <h2 className="mb-4 text-center text-black">
        Select an Academic Year to View Related Data
      </h2>
      <Select
        options={options}
        onChange={handleSelect}
        placeholder="Select Academic Year"
        styles={{
          control: (base) => ({
            ...base,
            width: 300,
            margin: "0 auto",
            borderColor: "#35414a",
            borderRadius: "4px",
          }),
          menu: (base) => ({
            ...base,
            width: 300,
            margin: "0 auto",
          }),
        }}
      />
      <button onClick={handleSubmit} style={styles.submitButton}>
        Submit
      </button>
    </div>
  );
};

export default Dropdown;
