import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaPrint, FaDownload } from "react-icons/fa";
import html2pdf from "html2pdf.js";

const FeesReceipt = () => {
  const location = useLocation();
  const { data, feeTypeName, className } = location.state || {};

  const student = data?.form || {};

  const printReceipt = () => {
    window.print();
  };

  const downloadReceiptAsPDF = () => {
    const element = document.getElementById("receipt-content");

    const options = {
      filename: "fees_receipt.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="container my-4 text-dark" style={{ padding: 16 }}>
      <h6>
        <strong>Fees Receipts</strong>
      </h6>
      <div className="text-end mb-3">
        <button onClick={printReceipt} className="btn btn-light me-2">
          <FaPrint /> Print
        </button>
        <button onClick={downloadReceiptAsPDF} className="btn btn-light">
          <FaDownload /> Download PDF
        </button>
      </div>

      <div id="receipt-content" className="border border-dark p-3">
        <div className="text-center mb-3">
          <h6>
            <strong>[From Letter Head]</strong>
          </h6>
        </div>
        <h6 className="text-center bg-light py-1">
          <strong>Admission Fees Receipts</strong>
        </h6>
        <div className="row mb-2">
          <div className="col-4">
            <p style={{ color: "black" }}>
              <strong>Receipts No :</strong> {student.receiptNumber}
            </p>
            <p style={{ color: "black" }}>
              <strong>Student Name :</strong>
              {student.firstName}
              {student.lastName}
            </p>
            <p style={{ color: "black" }}>
              <strong>Admission No :</strong> {student.AdmissionNumber}
            </p>
          </div>
          <div className="col-4">
            <p style={{ color: "black" }}>&nbsp;</p>
            <p style={{ color: "black" }}>
              <strong>Class :</strong> {className}
            </p>
          </div>
          <div className="col-4">
            <p style={{ color: "black" }}>
              <strong>Date :</strong>{" "}
              {new Date(student.ApplicationReceivedOn).toLocaleDateString(
                "en-GB"
              )}
            </p>
            <p style={{ color: "black" }}>
              <strong>Academic Year :</strong>{" "}
              {(() => {
                const year = new Date(student.dateOfAdmission).getFullYear();
                return `${year}-${year + 1}`;
              })()}
            </p>
          </div>
        </div>

        <div
          className="row pt-3 mb-2"
          style={{ borderTop: "2px solid black" }}
        />

        <div className="mb-4">
          <table
            className="table mb-4"
            style={{ border: "1px solid black", color: "black" }}
          >
            <thead>
              <tr>
                <th
                  className="text-center p-2"
                  style={{ border: "1px solid black" }}
                >
                  Type of Fees
                </th>
                <th
                  className="text-center p-2"
                  style={{ border: "1px solid black" }}
                >
                  TC Fees
                </th>
                <th
                  className="text-center p-2"
                  style={{ border: "1px solid black" }}
                >
                  Concession
                </th>
                <th
                  className="text-center p-2"
                  style={{ border: "1px solid black" }}
                >
                  Final Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className="text-center p-2"
                  style={{ border: "1px solid black" }}
                >
                  {feeTypeName}
                </td>
                <td
                  className="text-center p-2"
                  style={{ border: "1px solid black" }}
                >
                  {student.TCfees}
                </td>
                <td
                  className="text-center p-2"
                  style={{ border: "1px solid black" }}
                >
                  {student.concessionAmount}
                </td>
                <td
                  className="text-center p-2"
                  style={{ border: "1px solid black" }}
                >
                  {student.finalAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row text-dark">
          <div className="col-6">
            <p style={{ color: "black" }}>
              <strong>Payment Mode:</strong> {student.paymentMode}
            </p>
            <p style={{ color: "black" }}>
              <strong>Date of Payment:</strong>
              {new Date(student.paymentDate).toLocaleDateString("en-GB")}
            </p>
            <p style={{ color: "black" }}>
              <strong>Transaction No./Cheque No.:</strong>{" "}
              {student?.chequeNumber
                ? student.chequeNumber
                : student?.transactionNumber || ""}
            </p>
          </div>
          <div className="col-4 text-end">
            <p>&nbsp;&nbsp;&nbsp;</p>

            <p style={{ color: "black" }}>
              <strong>Signature of Collector</strong>
            </p>
            <p style={{ color: "black" }}>
              <strong>Name:</strong> {student.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesReceipt;
