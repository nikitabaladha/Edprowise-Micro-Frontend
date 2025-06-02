import React from "react";
import { useLocation } from "react-router-dom";

const FeesReceipt = () => {
  const location = useLocation();
  const { student, feeTypeName, className } = location.state || {};

  return (
    <div className="container my-4 text-dark" style={{ padding: 16 }}>
      <h6>
        <strong>Registartion Fees Receipts</strong>
      </h6>

      <div id="receipt-content" className="border border-dark p-3">
        <div className="text-center mb-3">
          <h6>
            <strong>[From Letter Head]</strong>
          </h6>
        </div>
        <h6 className="text-center bg-light py-1">
          <strong>Registartion Fees Receipts</strong>
        </h6>
        <div className="row mb-2">
          <div className="col-4">
            <p style={{ color: "black" }}>
              <strong>Receipts No :</strong> {student.receiptNumber}
            </p>
            <p style={{ color: "black" }}>
              <strong>Student Name :</strong> {student.firstName}{" "}
              {student.lastName}
            </p>
            <p style={{ color: "black" }}>
              <strong>Registration No :</strong> {student.registrationNumber}
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
              {new Date(student.registrationDate).toLocaleDateString("en-GB")}
            </p>
            <p style={{ color: "black" }}>
              <strong>Academic Year :</strong>{" "}
              {(() => {
                const year = new Date(student.registrationDate).getFullYear();
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
                  Registration Fees Amount
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
                  {student.registrationFee}
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
              {new Date(student.registrationDate).toLocaleDateString("en-GB")}
            </p>
            <p style={{ color: "black" }}>
              <strong>Transaction No./Cheque No.:</strong>{" "}
              {student.transactionNumber}
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
