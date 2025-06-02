import React from "react";
import { useLocation } from "react-router-dom";
import { FaPrint, FaDownload } from "react-icons/fa";
import html2pdf from "html2pdf.js";

const FeesReceipt = () => {
  const location = useLocation();
  const { formData, className, sectionName, feeTypes, receiptNumber } =
    location.state || {};

  if (!formData) {
    return (
      <div className="container my-4" style={{ maxWidth: "800px" }}>
        <h4 className="text-primary">
          <strong>Concession Form</strong>
        </h4>
        <p>No concession data found. Please submit a concession form first.</p>
      </div>
    );
  }

  const printReceipt = () => {
    window.print();
  };

  const downloadReceiptAsPDF = () => {
    const element = document.getElementById("receipt-content");
    const options = {
      filename: `concession_form_${receiptNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary">
          <strong>Concession Form</strong>
        </h4>
        <div>
          <button
            onClick={printReceipt}
            className="btn btn-outline-primary me-2"
            style={{ borderRadius: "20px" }}
          >
            <FaPrint className="me-1" /> Print
          </button>
          <button
            onClick={downloadReceiptAsPDF}
            className="btn btn-primary"
            style={{ borderRadius: "20px" }}
          >
            <FaDownload className="me-1" /> Download PDF
          </button>
        </div>
      </div>

      <div
        id="receipt-content"
        className="p-4 shadow-sm"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="text-center mb-3">
          <h2 className="text-primary mb-1">ABC International School</h2>
          <p className="mb-1">123 Education Street, Knowledge City</p>
          <p>Phone: (123) 456-7890 | Email: info@abcschool.edu</p>
          <div className="d-flex justify-content-center">
            <div
              style={{
                borderTop: "2px solid #0d6efd",
                width: "100%",
                margin: "0 10px",
              }}
            ></div>
          </div>
        </div>

        <h3
          className="text-center text-uppercase mb-3"
          style={{ color: "#0d6efd" }}
        >
          <strong>Concession Form</strong>
        </h3>

        <div className="row mb-3 text-black">
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Receipt No:
              </span>
              <span>{receiptNumber}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Student Name:
              </span>
              <span>
                {formData.firstName} {formData.middleName} {formData.lastName}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Admission No:
              </span>
              <span>{formData.AdmissionNumber}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Date:
              </span>
              <span>{new Date().toLocaleDateString("en-GB")}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Academic Year:
              </span>
              <span>{formData.academicYear}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Class/Section:
              </span>
              <span>
                {className}/{sectionName}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Concession Type:
              </span>
              <span>{formData.concessionType}</span>
            </div>
          </div>
        </div>

        <div className="table-responsive mb-3">
          <table className="table table-bordered text-nowrap">
            <thead className="table-primary">
              <tr>
                <th className="text-center">Installment</th>
                <th className="text-center">Fees Type</th>
                <th className="text-center">Total Fees (₹)</th>
                <th className="text-center">Concession %</th>
                <th className="text-center">Concession Amt. (₹)</th>
                <th className="text-center">Balance Payable (₹)</th>
              </tr>
            </thead>
            <tbody>
              {formData.concessionDetails.map((detail, index) => (
                <tr key={index}>
                  <td className="text-center">{detail.installmentName}</td>
                  <td className="text-center">
                    {detail.feesTypeName ||
                      feeTypes.find((ft) => ft._id === detail.feesType)
                        ?.feesTypeName ||
                      detail.feesType}
                  </td>
                  <td className="text-center">{detail.totalFees}</td>
                  <td className="text-center">{detail.concessionPercentage}</td>
                  <td className="text-center text-danger">
                    {detail.concessionAmount}
                  </td>
                  <td className="text-center fw-bold">
                    {detail.balancePayable}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row mb-3 text-black">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className="p-3 text-center" style={{ height: "100%" }}>
              <p className="mb-4">Authorized Signature</p>
              <div
                className="mt-4 pt-3"
                style={{ borderTop: "1px solid #dee2e6" }}
              >
                <p className="mb-0 fw-bold">School Administrator</p>
                <p className="mb-0 small text-muted">Principal</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="text-center mt-4 pt-3"
          style={{ borderTop: "2px solid #0d6efd" }}
        >
          <p className="small text-muted mb-1">
            This is a computer generated document and does not require a
            physical signature.
          </p>
          <p className="small text-muted">
            For any queries, please contact accounts@abcschool.edu or call
            +1234567890
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeesReceipt;
